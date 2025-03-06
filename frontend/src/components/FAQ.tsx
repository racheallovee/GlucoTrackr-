import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  HelpCircle,
  Shield,
  Link,
  Award,
  Smartphone,
  BadgeDollarSign,
  Activity,
} from "lucide-react";
import FeatureBadge from "./FeatureBadge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const faqItems = [
    {
      icon: <Activity size={16} />,
      question: "How does GlucoTrackr monitor my glucose levels?",
      answer:
        "GlucoTrackr connects with your continuous glucose monitor or other compatible devices via Bluetooth. It collects real-time data and presents it in an easy-to-understand format, with trends, patterns, and personalized insights to help you manage your diabetes effectively.",
    },
    {
      icon: <Shield size={16} />,
      question: "Is my health data secure and private?",
      answer:
        "Absolutely. We use blockchain technology and advanced encryption to ensure your health data remains completely private and secure. You have full control over who can access your information, and we never share your data with third parties without your explicit consent.",
    },
    {
      icon: <Link size={16} />,
      question: "Does GlucoTrackr work with my glucose monitor?",
      answer:
        "GlucoTrackr is compatible with most popular CGMs (Continuous Glucose Monitors) and glucose meters, including Dexcom, FreeStyle Libre, Medtronic, and many others. We're constantly adding support for new devices to ensure broad compatibility.",
    },
    {
      icon: <Award size={16} />,
      question: "How does the Web3 rewards system work?",
      answer:
        "Our innovative Web3 rewards system incentivizes healthy habits. You earn tokens for consistently monitoring your glucose levels, maintaining target ranges, and completing health challenges. These tokens can be redeemed for discounts on diabetes supplies, premium features, or converted to other cryptocurrencies.",
    },
    {
      icon: <Smartphone size={16} />,
      question: "Can I use GlucoTrackr without a wearable device?",
      answer:
        "Yes! While GlucoTrackr works best with continuous monitoring devices, you can manually input glucose readings from traditional meters. You'll still benefit from our trend analysis, personalized insights, and health recommendations.",
    },
    {
      icon: <BadgeDollarSign size={16} />,
      question: "Is the app free, or are there paid features?",
      answer:
        "GlucoTrackr offers a comprehensive free version that includes glucose tracking, basic insights, and health reporting. Our premium subscription unlocks advanced features like AI-powered predictions, deeper data analysis, personalized meal recommendations, and enhanced Web3 rewards.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-blue-100/20 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-blue-100/30 blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <FeatureBadge label="FAQ" />
          <h2 className="text-3xl md:text-4xl font-bold text-glucotrack-dark-gray mt-4 mb-4">
            Got Questions?{" "}
            <span className="text-glucotrack-blue">We've Got Answers!</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to commonly asked questions about GlucoTrackr and how
            it can help you manage diabetes effectively.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border border-blue-100 rounded-lg overflow-hidden shadow-soft"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-blue-50 transition-colors">
                    <div className="flex items-center text-left">
                      <span className="text-glucotrack-blue mr-3">
                        {item.icon}
                      </span>
                      <span className="font-medium text-glucotrack-dark-gray">
                        {item.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 bg-white text-gray-600">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-6">
            Still have questions? We're here to help!
          </p>
          <a href="#contact" className="btn-primary">
            Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
