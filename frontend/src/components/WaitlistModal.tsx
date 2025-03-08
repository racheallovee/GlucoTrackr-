
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Mail, User, List, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitlistModal = ({ isOpen, onClose }: WaitlistModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userType, setUserType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, this would be an API call
      // For now, we'll simulate sending an email
      console.log("Waitlist submission:", { name, email, phone, userType });
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "You're on the list!",
        description: "Thanks for joining our waitlist. We'll notify you when GlucoTrackr launches!",
      });
      
      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setUserType("");
      
      // Close modal
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error joining the waitlist. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex justify-between items-center p-5 border-b">
              <h3 className="text-xl font-semibold text-glucotrack-dark-gray flex items-center">
                <List size={20} className="mr-2 text-glucotrack-blue" />
                Join Our Waitlist
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal body */}
            <div className="p-5">
              <p className="text-gray-600 mb-5">
                Be among the first to experience GlucoTrackr when we launch. Fill out the form below to secure your spot on our waitlist.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="waitlist-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="waitlist-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-glucotrack-blue focus:border-transparent outline-none"
                      placeholder="Your name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="waitlist-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="waitlist-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-glucotrack-blue focus:border-transparent outline-none"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="waitlist-phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone (optional)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="waitlist-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-glucotrack-blue focus:border-transparent outline-none"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="waitlist-user-type" className="block text-sm font-medium text-gray-700 mb-1">
                    I am a
                  </label>
                  <select
                    id="waitlist-user-type"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    className="block w-full px-3 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-glucotrack-blue focus:border-transparent outline-none"
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                    <option value="researcher">Researcher</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 1 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center px-5 py-2 bg-glucotrack-blue text-white rounded-lg hover:bg-glucotrack-blue/90 transition-colors"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send size={18} className="mr-2" />
                        Join Waitlist
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>

            {/* Hidden email receiver information */}
            <input type="hidden" value="rachealloveo6@gmail.com" id="waitlist-email-receiver" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WaitlistModal;
