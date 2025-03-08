
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ActivitySquare,
  LineChart,
  Smartphone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppMockup from "./AppMockup";
import FeatureBadge from "./FeatureBadge";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const navigateToUserType = (type: string) => {
    navigate(`/user-type?type=${type}`);
  };

  return (
    <section id="home" className="relative w-full overflow-hidden bg-gradient-to-b from-white to-blue-50 ">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-hero-pattern opacity-70"></div>
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-100/20 blur-3xl"></div>
      <div className="absolute top-1/2 -left-24 w-64 h-64 rounded-full bg-blue-100/30 blur-3xl"></div>

      <div className="container mx-auto lg:px-20 md:px-6 py-16 md:py-24 lg:py-28 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start"
          >
            <FeatureBadge
              label="Smart Diabetes Management"
              icon={<ActivitySquare size={14} />}
            />

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-glucotrack-dark-gray mt-4 mb-6"
            >
              Take control of your
              <span className="text-glucotrack-blue"> diabetes</span> with
              precision today
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-gray-600 mb-8 max-w-xl"
            >
              GlucoTrackr delivers real-time glucose monitoring, personalized
              insights, and Web3 integration for a seamless diabetes management
              experience.
            </motion.p>

            <div className="flex flex-wrap gap-4 mb-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.button 
                  whileHover={{ y: -3 }}
                  whileTap={{ y: 2 }}
                  onClick={() => navigateToUserType("patients")}
                  className="btn-primary group"
                >
                  Get Started Now
                  <ChevronRight className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <motion.button 
                  whileHover={{ y: -3 }}
                  whileTap={{ y: 2 }}
                  onClick={() => navigateToUserType("doctors")}
                  className="btn-secondary"
                >
                  For Doctors
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <motion.button 
                  whileHover={{ y: -3 }}
                  whileTap={{ y: 2 }}
                  onClick={() => navigateToUserType("researchers")}
                  className="btn-secondary"
                >
                  For Researchers
                </motion.button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center gap-6 text-sm text-gray-500"
            >
              <div className="flex items-center gap-2">
                <Smartphone size={18} className="text-glucotrack-blue" />
                <span>Mobile App</span>
              </div>
              <div className="flex items-center gap-2">
                <LineChart size={18} className="text-glucotrack-blue" />
                <span>Data Analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-green-400 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <span>24/7 Monitoring</span>
              </div>
            </motion.div>
          </motion.div>

          {/* App mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <AppMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
