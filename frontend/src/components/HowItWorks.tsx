<<<<<<< HEAD
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bluetooth, Activity, Brain, Award } from "lucide-react";
=======

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bluetooth, Activity, Brain, Award } from 'lucide-react';
>>>>>>> 8016dd572a5f78c2d0c1146d4a87a215a012e071

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  stepNumber: number;
  delay: number;
}

const Step = ({ icon, title, description, stepNumber, delay }: StepProps) => {
  return (
<<<<<<< HEAD
    <motion.div
=======
    <motion.div 
>>>>>>> 8016dd572a5f78c2d0c1146d4a87a215a012e071
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative flex flex-col items-center p-6 rounded-xl bg-white shadow-soft border border-blue-50"
    >
      <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-glucotrack-blue flex items-center justify-center text-white font-bold text-sm">
        {stepNumber}
      </div>
      <div className="w-16 h-16 rounded-full bg-glucotrack-blue/10 flex items-center justify-center mb-4">
<<<<<<< HEAD
        <div className="text-glucotrack-blue">{icon}</div>
      </div>
      <h3 className="text-xl font-bold text-glucotrack-dark-gray mb-2">
        {title}
      </h3>
=======
        <div className="text-glucotrack-blue">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold text-glucotrack-dark-gray mb-2">{title}</h3>
>>>>>>> 8016dd572a5f78c2d0c1146d4a87a215a012e071
      <p className="text-gray-600 text-center">{description}</p>
    </motion.div>
  );
};

const HowItWorks = () => {
  const [isLoaded, setIsLoaded] = useState(false);
<<<<<<< HEAD

=======
  
>>>>>>> 8016dd572a5f78c2d0c1146d4a87a215a012e071
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const steps = [
    {
      icon: <Bluetooth size={30} />,
      title: "Connect Your Device",
<<<<<<< HEAD
      description:
        "Seamlessly sync with your glucose monitors, insulin pumps, and other wearable devices for automatic data collection.",
=======
      description: "Seamlessly sync with your glucose monitors, insulin pumps, and other wearable devices for automatic data collection."
>>>>>>> 8016dd572a5f78c2d0c1146d4a87a215a012e071
    },
    {
      icon: <Activity size={30} />,
      title: "Track in Real-Time",
<<<<<<< HEAD
      description:
        "Monitor your glucose levels, identify patterns, and visualize trends with our intuitive dashboard.",
=======
      description: "Monitor your glucose levels, identify patterns, and visualize trends with our intuitive dashboard."
>>>>>>> 8016dd572a5f78c2d0c1146d4a87a215a012e071
    },
    {
      icon: <Brain size={30} />,
      title: "Get Personalized Insights",
<<<<<<< HEAD
      description:
        "Receive AI-powered recommendations tailored to your unique health profile and diabetes management needs.",
=======
      description: "Receive AI-powered recommendations tailored to your unique health profile and diabetes management needs."
>>>>>>> 8016dd572a5f78c2d0c1146d4a87a215a012e071
    },
    {
      icon: <Award size={30} />,
      title: "Earn Rewards",
<<<<<<< HEAD
      description:
        "Stay motivated with our Web3 integration that rewards you for consistently managing your health goals.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-20 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-blue-100/20 blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-64 h-64 rounded-full bg-blue-100/30 blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
=======
      description: "Stay motivated with our Web3 integration that rewards you for consistently managing your health goals."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-blue-100/20 blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-64 h-64 rounded-full bg-blue-100/30 blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
>>>>>>> 8016dd572a5f78c2d0c1146d4a87a215a012e071
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-glucotrack-dark-gray mb-4">
<<<<<<< HEAD
            Effortless{" "}
            <span className="text-glucotrack-blue">Diabetes Management</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            GlucoTrackr simplifies your diabetes care journey with an intuitive
            four-step process designed for your success.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Step
=======
            Effortless <span className="text-glucotrack-blue">Diabetes Management</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            GlucoTrackr simplifies your diabetes care journey with an intuitive four-step process designed for your success.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Step 
>>>>>>> 8016dd572a5f78c2d0c1146d4a87a215a012e071
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              stepNumber={index + 1}
              delay={0.2 + index * 0.1}
            />
          ))}
        </div>
<<<<<<< HEAD

        <motion.div
=======
        
        <motion.div 
>>>>>>> 8016dd572a5f78c2d0c1146d4a87a215a012e071
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <a href="#waitlist" className="btn-primary">
            Start Your Journey Today
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
