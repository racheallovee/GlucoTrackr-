
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Brain, Shield, Link, Award, Smartphone } from 'lucide-react';
import FeatureBadge from './FeatureBadge';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
      className="flex flex-col items-center p-6 rounded-xl bg-white shadow-soft border border-blue-50 hover:shadow-card transition-all duration-300 h-full"
    >
      <div className="w-16 h-16 rounded-full bg-glucotrack-blue/10 flex items-center justify-center mb-4">
        <div className="text-glucotrack-blue">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold text-glucotrack-dark-gray mb-2">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </motion.div>
  );
};

const WhyChooseUs = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const features = [
    {
      icon: <Activity size={30} />,
      title: "Real-Time Glucose Monitoring",
      description: "Stay updated with instant readings and alerts to help you maintain optimal health levels throughout the day."
    },
    {
      icon: <Brain size={30} />,
      title: "Personalized Health Insights",
      description: "Receive AI-driven recommendations tailored to your unique health profile for better diabetes management."
    },
    {
      icon: <Shield size={30} />,
      title: "Secure & Private",
      description: "Your health data is protected with blockchain technology, ensuring complete privacy and security."
    },
    {
      icon: <Link size={30} />,
      title: "Seamless Device Integration",
      description: "Connect with various wearables and glucose monitors effortlessly for automatic data synchronization."
    },
    {
      icon: <Award size={30} />,
      title: "Earn Rewards with Web3",
      description: "Get incentives through our Web3 integration for maintaining healthy habits and achieving your goals."
    },
    {
      icon: <Smartphone size={30} />,
      title: "Easy-to-Use Interface",
      description: "Navigate through our intuitive design with minimal effort, perfect for users of all technical abilities."
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-blue-100/20 blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-blue-100/30 blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <FeatureBadge label="Why Choose Us" />
          <h2 className="text-3xl md:text-4xl font-bold text-glucotrack-dark-gray mt-4 mb-4">
            Designed for Your <span className="text-glucotrack-blue">Health & Convenience</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            GlucoTrackr combines cutting-edge technology with user-friendly design to deliver the best diabetes management experience.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={0.2 + index * 0.1}
            />
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <a href="#waitlist" className="btn-primary">
            Get Started Now
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
