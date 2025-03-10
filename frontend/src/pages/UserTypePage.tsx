import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LogIn,
  UserPlus,
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type UserType = "patients" | "doctors" | "researchers";

const UserTypePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userType, setUserType] = useState<UserType>("patients");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Extract user type from URL parameters
    const searchParams = new URLSearchParams(location.search);
    const type = searchParams.get("type") as UserType;
    if (type && ["patients", "doctors", "researchers"].includes(type)) {
      setUserType(type);
    }
  }, [location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate authentication process
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: isSignUp ? "Account Created" : "Login Successful",
        description: `Welcome to GlucoTrackr ${
          isSignUp ? "! Your account has been created" : ""
        }!`,
      });
      // Redirect to home page after successful login/signup
      navigate("/");
    }, 1500);
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
  };

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const imageVariants = {
    patients: {
      animate: {
        scale: [1, 1.05, 1],
        transition: { repeat: Infinity, duration: 8, ease: "easeInOut" },
      },
    },
    doctors: {
      animate: {
        rotate: [0, 2, 0, -2, 0],
        transition: { repeat: Infinity, duration: 5, ease: "easeInOut" },
      },
    },
    researchers: {
      animate: {
        y: [0, -10, 0],
        transition: { repeat: Infinity, duration: 6, ease: "easeInOut" },
      },
    },
  };

  // Content based on user type
  const userTypeContent = {
    patients: {
      title: "Take Control of Your Health",
      description:
        "GlucoTrackr empowers you with real-time glucose monitoring, personalized insights, and smart alerts to manage your diabetes effectively. Stay connected to your health journey like never before.",
      color: "from-blue-400 to-cyan-300",
      bgPattern:
        "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      image: "https://source.unsplash.com/qcfsv3QN-xs/600x800",
    },
    doctors: {
      title: "Transform Patient Care",
      description:
        "Elevate your practice with GlucoTrackr's comprehensive patient management system. Monitor patient data in real-time, provide timely interventions, and improve treatment outcomes with our cutting-edge platform.",
      color: "from-green-400 to-teal-300",
      bgPattern:
        "url(\"data:image/svg+xml,%3Csvg width='84' height='48' viewBox='0 0 84 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h12v6H0V0zm28 8h12v6H28V8zm14-8h12v6H42V0zm14 0h12v6H56V0zm0 8h12v6H56V8zM42 8h12v6H42V8zm0 16h12v6H42v-6zm14-8h12v6H56v-6zm14 0h12v6H70v-6zm0-16h12v6H70V0zM28 32h12v6H28v-6zM14 16h12v6H14v-6zM0 24h12v6H0v-6zm0 8h12v6H0v-6zm14 0h12v6H14v-6zm14 8h12v6H28v-6zm-14 0h12v6H14v-6zm28 0h12v6H42v-6zm14-8h12v6H56v-6zm0-8h12v6H56v-6zm14 8h12v6H70v-6zm0 8h12v6H70v-6zM14 24h12v6H14v-6zm14-8h12v6H28v-6zM14 8h12v6H14V8zM0 8h12v6H0V8z' fill='%23ffffff' fill-opacity='0.15' fill-rule='evenodd'/%3E%3C/svg%3E\")",
      image: "https://source.unsplash.com/NFvdKIhxYlU/600x800",
    },
    researchers: {
      title: "Accelerate Your Research",
      description:
        "Unlock new possibilities in diabetes research with GlucoTrackr's extensive data analytics platform. Access anonymized patient data, identify patterns, and contribute to groundbreaking discoveries in diabetes management.",
      color: "from-blue-500 to-indigo-400",
      bgPattern:
        "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.15' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
      image: "https://source.unsplash.com/uJ8LNVCBjFQ/600x800",
    },
  };

  const content = userTypeContent[userType];

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left side - Visual content (swapped from right) */}
      <motion.div
        className={`w-full md:w-1/2 bg-gradient-to-br ${content.color} relative overflow-hidden`}
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background pattern */}
        <div
          className="absolute inset-0 z-10"
          style={{ backgroundImage: content.bgPattern }}
        ></div>

        {/* Content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16">
          <motion.div
            className="max-w-md mx-auto text-white"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="mb-8 flex justify-center"
              variants={imageVariants[userType]}
              animate="animate"
            >
              <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                {userType === "patients" ? (
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L14.5 9H22L16 13.5L18 21L12 17L6 21L8 13.5L2 9H9.5L12 2Z"
                      fill="white"
                    />
                  </svg>
                ) : userType === "doctors" ? (
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 10H21M3 14H21M8 3V21M16 3V21"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22ZM12 6V18M6 12H18"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6 text-center"
              variants={itemVariants}
            >
              {content.title}
            </motion.h1>

            <motion.p
              className="text-lg text-white/90 text-center mb-8"
              variants={itemVariants}
            >
              {content.description}
            </motion.p>

            <motion.div
              className="flex justify-center gap-4"
              variants={itemVariants}
            >
              {userType !== "patients" && (
                <button
                  onClick={() => setUserType("patients")}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-md text-white transition"
                >
                  For Patients
                </button>
              )}
              {userType !== "doctors" && (
                <button
                  onClick={() => setUserType("doctors")}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-md text-white transition"
                >
                  For Doctors
                </button>
              )}
              {userType !== "researchers" && (
                <button
                  onClick={() => setUserType("researchers")}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-md text-white transition"
                >
                  For Researchers
                </button>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-white/10"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, -10, 0],
              y: [0, 10, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -left-16 top-32 w-32 h-32 rounded-full bg-white/10"
            animate={{
              scale: [1, 1.5, 1],
              x: [0, 10, 0],
              y: [0, -10, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-32 top-20 w-24 h-24 rounded-full bg-white/10"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, -5, 0],
              y: [0, -5, 0],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Right side - Form (swapped from left) */}
      <motion.div
        className="w-full md:w-1/2 bg-white p-6 md:p-12 flex items-center justify-center"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-md w-full">
          {/* Back button */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-gray-500 hover:text-glucotrack-blue mb-8 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            <span>Back to home</span>
          </button>

          <motion.h2
            className="text-3xl font-bold text-glucotrack-dark-gray mb-6"
            variants={itemVariants}
          >
            {isSignUp ? "Create your account" : "Welcome back"}
          </motion.h2>

          <motion.p className="text-gray-600 mb-8" variants={itemVariants}>
            {isSignUp
              ? `Join GlucoTrackr as a ${userTypes[userType]} and unlock powerful features tailored for you.`
              : `Sign in to access your GlucoTrackr ${userTypes[userType]} dashboard.`}
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {isSignUp && (
              <motion.div className="space-y-2" variants={itemVariants}>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-glucotrack-blue focus:border-transparent outline-none"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </motion.div>
            )}

            <motion.div className="space-y-2" variants={itemVariants}>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
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
            </motion.div>

            <motion.div className="space-y-2" variants={itemVariants}>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
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
            </motion.div>

            {isSignUp && (
              <motion.div className="flex items-center" variants={itemVariants}>
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-glucotrack-blue focus:ring-glucotrack-blue border-gray-300 rounded"
                  required
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-gray-700"
                >
                  I agree to the{" "}
                  <a
                    href="#"
                    className="font-medium text-glucotrack-blue hover:text-glucotrack-blue/80"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="font-medium text-glucotrack-blue hover:text-glucotrack-blue/80"
                  >
                    Privacy Policy
                  </a>
                </label>
              </motion.div>
            )}

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ y: 1 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-glucotrack-blue hover:bg-glucotrack-blue/90 focus:outline-none transition-colors duration-300"
              variants={itemVariants}
            >
              {isSubmitting ? (
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : isSignUp ? (
                <UserPlus size={18} className="mr-2" />
              ) : (
                <LogIn size={18} className="mr-2" />
              )}
              {isSubmitting
                ? isSignUp
                  ? "Creating account..."
                  : "Logging in..."
                : isSignUp
                ? "Sign up"
                : "Log in"}
            </motion.button>
          </motion.form>

          <motion.div className="mt-8 text-center" variants={itemVariants}>
            <p className="text-sm text-gray-600">
              {isSignUp
                ? "Already have an account? "
                : "Don't have an account? "}
              <button
                onClick={toggleAuthMode}
                className="font-medium text-glucotrack-blue hover:text-glucotrack-blue/80"
              >
                {isSignUp ? "Log in" : "Sign up"}
              </button>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const userTypes = {
  patients: "Patient",
  doctors: "Doctor",
  researchers: "Researcher",
};

export default UserTypePage;
