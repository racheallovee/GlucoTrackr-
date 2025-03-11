import { useState } from "react";
import {
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import ContactSupportModal from "./ContactSupportModal";

const Footer = () => {
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <footer className="bg-glucotrack-dark-gray text-white py-8 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-0 right-0 w-96 h-9 rounded-full bg-glucotrack-blue/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96  rounded-full bg-glucotrack-blue/5 blur-3xl"></div>
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          {/* Branding Section */}
          <div className="mb-4">
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 rounded-full bg-glucotrack-blue flex items-center justify-center mr-2">
                <div className="w-4 h-4 rounded-full bg-white"></div>
              </div>
              <span className="text-xl font-bold">
                Gluco<span className="text-glucotrack-blue">Trackr</span>
              </span>
            </div>
            <p className="text-gray-300 max-w-md mb-4">
              Smart Diabetes Management, Simplified.
            </p>
          </div>

          <div className="space-y-2 text-gray-300 mb-4">
            <div className="flex items-center justify-center">
              <Mail size={16} className="mr-2 text-glucotrack-blue" />
              <span>support@glucotrackr.com</span>
            </div>
            <div className="flex items-center justify-center">
              <MapPin size={16} className="mr-2 text-glucotrack-blue" />
              <span>Nairobi, KE</span>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4 mb-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Facebook
                size={20}
                className="text-white hover:text-glucotrack-blue transition-colors"
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <Twitter
                size={20}
                className="text-white hover:text-glucotrack-blue transition-colors"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram
                size={20}
                className="text-white hover:text-glucotrack-blue transition-colors"
              />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin
                size={20}
                className="text-white hover:text-glucotrack-blue transition-colors"
              />
            </a>
          </div>

          <hr className="border-gray-700 w-full my-4" />
          <p className="text-gray-400 text-sm">
            © 2025 GlucoTrackr. All rights reserved.
          </p>
        </div>
      </div>

      {/* Contact Support Modal */}
      <ContactSupportModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />
    </footer>
  );
};

export default Footer;
