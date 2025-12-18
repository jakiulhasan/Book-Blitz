import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Search, MapPin, Navigation } from "lucide-react";
import "leaflet/dist/leaflet.css";

/* Helper component to control map movement */
const FlyToLocation = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 12, { animate: true, duration: 1.5 });
    }
  }, [coords, map]);
  return null;
};

const Coverage = () => {
  const defaultPosition = [23.685, 90.3563];
  const [serviceCenters, setServiceCenters] = useState([]);
  const [targetCoords, setTargetCoords] = useState(null);

  useEffect(() => {
    fetch("/serviceCenters.json")
      .then((res) => res.json())
      .then((data) => setServiceCenters(data))
      .catch((error) => console.error("Error loading centers:", error));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value.trim();
    if (!location) return;

    const district = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );

    if (district) {
      setTargetCoords([district.latitude, district.longitude]);
    }
  };

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div className="max-w-xl text-center md:text-left">
          <div className="badge badge-primary badge-outline mb-2 gap-2">
            <MapPin size={14} /> Global Coverage
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-base-content">
            Available in <span className="text-primary">64 Districts</span>
          </h2>
          <p className="mt-3 text-base-content/70">
            Find the nearest BookBlitz service point or drop-off location near
            you.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="w-full max-w-md">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-base-content/40 group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="search"
              name="location"
              className="input input-bordered w-full pl-10 focus:input-primary bg-base-100 shadow-sm"
              placeholder="Type your district (e.g. Dhaka)"
            />
            <button className="btn btn-primary btn-sm absolute right-2 top-[50%] -translate-y-1/2">
              Find
            </button>
          </div>
        </form>
      </div>

      {/* Map Container */}
      <div className="relative rounded-3xl overflow-hidden border-4 border-base-100 shadow-2xl z-0">
        {/* Quick Stats Overlay (Optional) */}
        <div className="absolute top-4 right-4 z-[1000] hidden sm:flex">
          <div className="stats shadow bg-base-100/90 backdrop-blur">
            <div className="stat py-2 px-4">
              <div className="stat-title text-xs">Active Hubs</div>
              <div className="stat-value text-sm text-primary">
                {serviceCenters.length}
              </div>
            </div>
          </div>
        </div>

        <div className="h-[450px] md:h-[600px] w-full">
          <MapContainer
            center={defaultPosition}
            zoom={7}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <FlyToLocation coords={targetCoords} />

            {serviceCenters.map((center, index) => (
              <Marker
                key={index}
                position={[center.latitude, center.longitude]}
              >
                <Popup>
                  <div className="p-1">
                    <h3 className="font-bold text-lg border-b mb-2 pb-1 flex items-center gap-2">
                      <Navigation size={16} className="text-primary" />{" "}
                      {center.district}
                    </h3>
                    <p className="text-xs font-semibold text-gray-500 uppercase">
                      Covered Areas:
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {center.covered_area.map((area, idx) => (
                        <span key={idx} className="badge badge-sm badge-ghost">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default Coverage;
