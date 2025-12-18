import React from "react";
import {
  Truck,
  ShieldCheck,
  BookOpen,
  Clock,
  Wallet,
  Headphones,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: <Truck className="w-8 h-8" />,
    title: "Fast & Reliable Delivery",
    description: "Secure delivery so your books reach you on time, every time.",
    bgColor: "bg-blue-50 text-blue-600",
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "Wide Collection",
    description:
      "From academic to fiction, discover a vast collection curated for you.",
    bgColor: "bg-purple-50 text-purple-600",
  },
  {
    icon: <Wallet className="w-8 h-8" />,
    title: "Affordable Pricing",
    description:
      "Competitive prices with regular discounts for quality reading.",
    bgColor: "bg-green-50 text-green-600",
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Safe Packaging",
    description:
      "Your books are packed carefully to prevent damage during transit.",
    bgColor: "bg-orange-50 text-orange-600",
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "On-Time Dispatch",
    description: "Orders are processed quickly to minimize your waiting time.",
    bgColor: "bg-red-50 text-red-600",
  },
  {
    icon: <Headphones className="w-8 h-8" />,
    title: "Dedicated Support",
    description:
      "Our team is always ready to help you with orders and inquiries.",
    bgColor: "bg-teal-50 text-teal-600",
  },
];

const WhyChooseBookBlitz = () => {
  return (
    <section className="py-20 bg-base-200/50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="badge badge-outline badge-primary mb-4 px-4 py-3 gap-2">
            <CheckCircle2 size={16} /> Superior Service
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Why Readers Love <span className="text-primary">BookBlitz</span>
          </h2>
          <p className="text-base-content/70 max-w-2xl text-lg leading-relaxed">
            We don’t just move boxes; we deliver stories. Experience the premium
            standard of book logistics designed specifically for bibliophiles.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-3xl border border-base-300 bg-base-100 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Icon Container */}
              <div
                className={`mb-6 inline-flex p-4 rounded-2xl ${feature.bgColor} group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors italic md:not-italic">
                {feature.title}
              </h3>
              <p className="text-base-content/60 leading-relaxed text-sm md:text-base">
                {feature.description}
              </p>

              {/* Corner Accent (Hover only) */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-10 shadow-sm transition-opacity">
                {feature.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseBookBlitz;
