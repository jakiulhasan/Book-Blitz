import React from "react";
import {
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content border-t border-base-300">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Branding */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tighter flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-content font-black">
                B
              </div>
              BookBlitz
            </h2>
            <p className="text-sm text-base-content/70 leading-relaxed">
              Your premier destination for literature delivery. We connect
              readers with their next great adventure through seamless logistics
              and a vast collection.
            </p>
            <div className="flex gap-4">
              <a className="hover:text-primary transition-colors cursor-pointer">
                <Facebook size={20} />
              </a>
              <a className="hover:text-primary transition-colors cursor-pointer">
                <Twitter size={20} />
              </a>
              <a className="hover:text-primary transition-colors cursor-pointer">
                <Instagram size={20} />
              </a>
              <a className="hover:text-primary transition-colors cursor-pointer">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="footer-title opacity-100 font-bold text-base mb-4">
              Company
            </h3>
            <div className="flex flex-col gap-2">
              <a className="link link-hover text-base-content/70 hover:text-primary">
                About us
              </a>
              <a className="link link-hover text-base-content/70 hover:text-primary">
                Our Services
              </a>
              <a className="link link-hover text-base-content/70 hover:text-primary">
                Jobs
              </a>
              <a className="link link-hover text-base-content/70 hover:text-primary">
                Press kit
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="footer-title opacity-100 font-bold text-base mb-4">
              Support
            </h3>
            <div className="space-y-3 text-sm text-base-content/70">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-primary" />
                <span>64 Districts, Bangladesh</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-primary" />
                <span>+880 123 456 789</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-primary" />
                <span>support@bookblitz.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="footer-title opacity-100 font-bold text-base mb-4">
              Newsletter
            </h3>
            <p className="text-sm text-base-content/70 mb-4">
              Subscribe to get updates on new arrivals and offers.
            </p>
            <div className="form-control">
              <div className="join w-full">
                <input
                  type="text"
                  placeholder="email@example.com"
                  className="input input-bordered join-item w-full focus:outline-none"
                />
                <button className="btn btn-primary join-item">Join</button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-base-300 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-base-content/50">
          <p>
            © {new Date().getFullYear()} - BookBlitz Industries Ltd. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <a className="link link-hover">Privacy Policy</a>
            <a className="link link-hover">Terms of Service</a>
            <a className="link link-hover">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
