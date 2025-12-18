import React from "react";
import { Quote, Star } from "lucide-react";

const ReaderTestimonials = () => {
  const reviews = [
    {
      name: "Sarah Jenkins",
      role: "Avid Reader",
      text: "BookBlitz has completely changed how I discover new authors. The delivery is lightning fast!",
      img: "https://i.pravatar.cc/150?u=sarah",
    },
    {
      name: "Marcus Thorne",
      role: "Student",
      text: "The selection of academic and fiction books is unbeatable. Highly recommended for students!",
      img: "https://i.pravatar.cc/150?u=marcus",
    },
  ];

  return (
    <section className="py-16 bg-base-200 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left Side: Header */}
          <div className="md:w-1/3 text-center md:text-left">
            <Quote
              size={48}
              className="text-primary mb-4 mx-auto md:mx-0 opacity-50"
            />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Readers Say
            </h2>
            <div className="flex justify-center md:justify-start gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="fill-warning text-warning" />
              ))}
            </div>
            <p className="text-gray-600">
              Join over 10,000+ book lovers who trust BookBlitz.
            </p>
          </div>

          {/* Right Side: Chat Bubbles */}
          <div className="md:w-2/3 w-full space-y-6">
            {reviews.map((rev, index) => (
              <div
                key={index}
                className={`chat ${
                  index % 2 === 0 ? "chat-start" : "chat-end"
                }`}
              >
                <div className="chat-image avatar">
                  <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={rev.img} alt={rev.name} />
                  </div>
                </div>
                <div className="chat-header mb-1">
                  {rev.name}{" "}
                  <time className="text-xs opacity-50">{rev.role}</time>
                </div>
                <div className="chat-bubble bg-base-100 text-base-content shadow-md">
                  {rev.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReaderTestimonials;
