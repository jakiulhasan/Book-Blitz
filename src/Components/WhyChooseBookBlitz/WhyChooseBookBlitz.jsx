import React from "react";
import {
  Truck,
  ShieldCheck,
  BookOpen,
  Clock,
  Wallet,
  Headphones,
} from "lucide-react";

const features = [
  {
    icon: <Truck className="w-10 h-10 text-primary" />,
    title: "Fast & Reliable Delivery",
    description:
      "We ensure quick and secure delivery so your books reach you on time, every time.",
  },
  {
    icon: <BookOpen className="w-10 h-10 text-primary" />,
    title: "Wide Collection of Books",
    description:
      "From academic to fiction, discover a vast collection curated for every reader.",
  },
  {
    icon: <Wallet className="w-10 h-10 text-primary" />,
    title: "Affordable Pricing",
    description:
      "Competitive prices with regular discounts, making quality reading accessible.",
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-primary" />,
    title: "Safe & Secure Packaging",
    description:
      "Your books are packed carefully to prevent damage during transit.",
  },
  {
    icon: <Clock className="w-10 h-10 text-primary" />,
    title: "On-Time Dispatch",
    description:
      "Orders are processed quickly so you never have to wait longer than necessary.",
  },
  {
    icon: <Headphones className="w-10 h-10 text-primary" />,
    title: "Dedicated Customer Support",
    description:
      "Our support team is always ready to help you with orders and inquiries.",
  },
];

const WhyChooseBookBlitz = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose BookCourier
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            We go beyond just delivering books. BookCourier ensures quality,
            reliability, and a seamless experience for every reader.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl border bg-white hover:shadow-lg transition"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseBookBlitz;
