
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Users, Star } from "lucide-react";
import FeatureBadge from "./FeatureBadge";
import ContactSupportModal from "./ContactSupportModal";

const CTASection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section
      id="waitlist"
      className="py-16 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-100/30 blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-blue-100/20 blur-3xl opacity-70"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto glass-card p-8 md:p-12 rounded-3xl shadow-card border border-blue-100">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <FeatureBadge label="Try GlucoTrackr" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-glucotrack-dark-gray mb-6"
            >
              <span className="text-glucotrack-blue">
                Better Diabetes Management
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-600 mb-10 max-w-2xl"
            >
              Join thousands taking charge of their health with real-time
              tracking, AI insights, and Web3 rewards for consistent diabetes
              management.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6"
            >
              <motion.p
                className="text-sm text-gray-500 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <Shield size={16} className="mr-2" />
                Your data is 100% secure.
              </motion.p>
              
              <button
                onClick={() => setShowContactModal(true)}
                className="text-sm text-glucotrack-blue hover:underline flex items-center"
              >
                <Users size={16} className="mr-2" />
                Contact Support
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-x-8 gap-y-4 mt-10 text-sm text-gray-600"
            >
              <div className="flex items-center">
                <Users size={16} className="text-glucotrack-blue mr-2" />
                <span>10,000+ Users</span>
              </div>
              <div className="flex items-center">
                <Star size={16} className="text-glucotrack-blue mr-2" />
                <span>4.9/5 App Rating</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-green-400 flex items-center justify-center mr-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                </div>
                <span>99.9% Uptime</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Contact Support Modal */}
      <ContactSupportModal 
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />
    </section>
  );
};

export default CTASection;
