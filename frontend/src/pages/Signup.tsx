
import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("patient"); // Default user type
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp, user } = useAuth();

  // Redirect if already logged in
  if (user) {
    navigate("/");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const userData = {
      full_name: fullName,
      user_type: userType // Use the selected user type
    };
    
    const { error } = await signUp(email, password, userData);
    
    if (!error) {
      navigate("/login");
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-glucotrack-light-gray flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full bg-white shadow-card rounded-2xl p-8 relative"
      >
        {/* Back Button */}
        <Link to="/" className="absolute top-8 left-8">
          <motion.div 
            whileHover={{ x: -3 }}
            className="flex items-center text-gray-500 hover:text-glucotrack-blue transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            <span>Back</span>
          </motion.div>
        </Link>

        <div className="text-center mb-8 mt-6">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center justify-center mb-6">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-10 h-10 rounded-full bg-glucotrack-blue flex items-center justify-center mr-2"
            >
              <div className="w-5 h-5 rounded-full bg-white"></div>
            </motion.div>
            <span className="text-2xl font-bold text-glucotrack-dark-gray">
              Gluco<span className="text-glucotrack-blue">Trackr</span>
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-glucotrack-dark-gray">Create Account</h1>
          <p className="text-gray-500 mt-2">Join GlucoTrackr and take control of your diabetes</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fullName">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-glucotrack-blue focus:border-transparent outline-none"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-glucotrack-blue focus:border-transparent outline-none"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-glucotrack-blue focus:border-transparent outline-none"
                  placeholder="•••••••••"
                  minLength={8}
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500">Password must be at least 8 characters</p>
            </div>

            {/* User Type Selection */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                I am a:
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setUserType("patient")}
                  className={`py-2 px-4 rounded-lg border ${
                    userType === "patient"
                      ? "bg-glucotrack-blue text-white border-glucotrack-blue"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  Patient
                </button>
                <button
                  type="button"
                  onClick={() => setUserType("doctor")}
                  className={`py-2 px-4 rounded-lg border ${
                    userType === "doctor"
                      ? "bg-glucotrack-blue text-white border-glucotrack-blue"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  Doctor
                </button>
                <button
                  type="button"
                  onClick={() => setUserType("researcher")}
                  className={`py-2 px-4 rounded-lg border ${
                    userType === "researcher"
                      ? "bg-glucotrack-blue text-white border-glucotrack-blue"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  Researcher
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 text-glucotrack-blue focus:ring-glucotrack-blue border-gray-300 rounded"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the{" "}
              <a href="#" className="font-medium text-glucotrack-blue hover:text-glucotrack-blue/80">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="font-medium text-glucotrack-blue hover:text-glucotrack-blue/80">
                Privacy Policy
              </a>
            </label>
          </div>

          <div>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ y: 1 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-glucotrack-blue hover:bg-glucotrack-blue/90 focus:outline-none transition-colors duration-300"
            >
              {isSubmitting ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <UserPlus size={18} className="mr-2" />
              )}
              {isSubmitting ? "Creating account..." : "Sign up"}
            </motion.button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-glucotrack-blue hover:text-glucotrack-blue/80">
              Log in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
