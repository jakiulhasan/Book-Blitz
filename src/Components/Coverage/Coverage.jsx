import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

/* Helper component to control map movement */
const FlyToLocation = ({ coords }) => {
  const map = useMap();

  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 14);
    }
  }, [coords, map]);

  return null;
};

const Coverage = () => {
  const position = [23.685, 90.3563];

  const [serviceCenters, setServiceCenters] = useState([]);
  const [targetCoords, setTargetCoords] = useState(null);

  /* Fetch service centers */
  useEffect(() => {
    fetch("/serviceCenters.json")
      .then((res) => res.json())
      .then((data) => setServiceCenters(data))
      .catch((error) => console.error(error));
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
    <div className="p-8">
      <h2 className="text-5xl mb-6 text-center font-semibold">
        We are available in 64 districts
      </h2>

      {/* Search */}
      <form onSubmit={handleSearch} className="mb-6">
        <label className="input input-bordered flex items-center gap-2 max-w-sm">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            name="location"
            className="grow"
            placeholder="Search district"
          />
        </label>
      </form>

      {/* Map */}
      <div className="border w-full h-200">
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className="h-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Fly to searched district */}
          <FlyToLocation coords={targetCoords} />

          {serviceCenters.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong>{center.district}</strong>
                <br />
                Service Area: {center.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
