import { useState } from "react";
import {
  Mail,
  Twitter,
  Linkedin,
  MessageCircle,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would connect to an API
    toast({
      title: "Thank you for subscribing!",
      description:
        "You'll be notified of updates and early access opportunities.",
    });
    setEmail("");
  };

  return (
    <footer className="bg-glucotrack-dark-gray text-white py-16 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-glucotrack-blue/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-glucotrack-blue/5 blur-3xl"></div>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Branding Section */}
          <div className="md:col-span-4">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-glucotrack-blue flex items-center justify-center mr-2">
                <div className="w-4 h-4 rounded-full bg-white"></div>
              </div>
              <span className="text-xl font-bold">
                Gluco<span className="text-glucotrack-blue">Trackr</span>
              </span>
            </div>
            <p className="text-gray-300 max-w-xs mb-6">
              Smart Diabetes Management, Simplified. Empowering health through
              innovative tracking and insights.
            </p>
            <div className="flex space-x-4 mb-6">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-glucotrack-blue transition-colors duration-200"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-glucotrack-blue transition-colors duration-200"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-glucotrack-blue transition-colors duration-200"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-gray-300 hover:text-glucotrack-blue transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-300 hover:text-glucotrack-blue transition-colors duration-200"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-glucotrack-blue transition-colors duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#waitlist"
                  className="text-gray-300 hover:text-glucotrack-blue transition-colors duration-200"
                >
                  Join Waitlist
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-glucotrack-blue transition-colors duration-200"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-glucotrack-blue transition-colors duration-200"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-glucotrack-blue transition-colors duration-200"
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-glucotrack-blue transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="md:col-span-4">
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-4">
              Subscribe for updates & early access!
            </p>
            <form onSubmit={handleSubscribe} className="mb-6">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-l-md text-gray-900 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-glucotrack-blue hover:bg-glucotrack-blue/90 transition-colors duration-200 text-white px-4 py-2 rounded-r-md flex items-center"
                >
                  <span className="hidden sm:inline">Subscribe</span>
                  <ArrowRight size={18} className="ml-1" />
                </button>
              </div>
            </form>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-start">
                <Mail size={18} className="mr-2 mt-1 text-glucotrack-blue" />
                <span>support@glucotrackr.com</span>
              </div>
              <div className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-glucotrack-blue" />
                <span>Nairobi, KE</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 GlucoTrackr. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6 text-sm text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-glucotrack-blue transition-colors"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-glucotrack-blue transition-colors"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-glucotrack-blue transition-colors"
                >
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
