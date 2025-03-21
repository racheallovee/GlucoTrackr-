import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Bluetooth,
  Activity,
  Brain,
  Award,
  HeartPulse,
  Stethoscope,
  FlaskConical,
} from "lucide-react";

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  stepNumber: number;
  delay: number;
}

const Step = ({ icon, title, description, stepNumber, delay }: StepProps) => {
  return (
    <motion.div
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
        <div className="text-glucotrack-blue">{icon}</div>
      </div>
      <h3 className="text-xl font-bold text-glucotrack-dark-gray mb-2">
        {title}
      </h3>
      <p className="text-gray-600 text-center">{description}</p>
    </motion.div>
  );
};

const HowItWorks = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const steps = [
    {
      icon: <HeartPulse size={30} />,
      title: "Empower Your Health",
      description:
        "Monitor your glucose levels in real-time, detect trends, and take control of your diabetes with actionable insights.",
    },
    {
      icon: <Stethoscope size={30} />,
      title: "Smarter Patient Care",
      description:
        "Access real-time patient glucose trends, enhance treatment plans, and make data-driven decisions with ease.",
    },
    {
      icon: <FlaskConical size={30} />,
      title: "Accelerate Diabetes Research",
      description:
        "Gain secure access to verified, anonymized patient data to drive groundbreaking research and innovation.",
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
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-glucotrack-dark-gray mb-4">
            Effortless{" "}
            <span className="text-glucotrack-blue">Diabetes Management</span>
          </h2>
          {/* <p className="text-gray-600 max-w-2xl mx-auto">
            GlucoTrackr simplifies your diabetes care journey with an intuitive
            four-step process designed for your success.
          </p> */}
          <p className="text-gray-600 max-w-2xl mx-auto">
            GlucoTrackr streamlines diabetes management with three simple steps:
            track your health, enable smarter care, and advance research.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Step
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              stepNumber={index + 1}
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
            Start Your Journey Today
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
