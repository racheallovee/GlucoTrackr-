import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Menu, X, LogIn, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const controls = useAnimation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    controls.start(
      isMenuOpen ? { height: 0, opacity: 0 } : { height: "auto", opacity: 1 }
    );
  };

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      // If we're not on the home page, navigate there first
      navigate("/");
      // Need to wait for the page to load before scrolling
      setTimeout(() => {
        const newElement = document.getElementById(sectionId);
        if (newElement) {
          newElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const navLinkClass =
    "text-gray-700 hover:text-glucotrack-blue transition-colors duration-300 relative group cursor-pointer";
  const mobileNavLinkClass =
    "text-lg text-gray-700 hover:text-glucotrack-blue py-4 block cursor-pointer";

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      transition={{ duration: 0.5 }}
      className={`fixed top-6 left-0 right-0 z-50 mx-auto max-w-5xl w-[95%] rounded-xl ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm py-3"
          : "bg-white/90 backdrop-blur-sm py-4"
      } transition-all duration-300`}
      style={{ transform: "none" }}
    >
      <div className="px-6">
        <div className="flex justify-between items-center">
          {/* Logo - Left Side */}
          <Link to="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-8 h-8 rounded-full bg-glucotrack-blue flex items-center justify-center mr-2"
            >
              <div className="w-4 h-4 rounded-full bg-white"></div>
            </motion.div>
            <span className="text-xl font-bold text-glucotrack-dark-gray">
              Gluco<span className="text-glucotrack-blue">Trackr</span>
            </span>
          </Link>

          {/* Desktop Navigation Links - Center */}
          <div className="hidden md:flex items-center justify-center space-x-8">
            <div
              onClick={() => scrollToSection("features")}
              className={navLinkClass}
            >
              <span>Features</span>
              <motion.div className="absolute bottom-0 left-0 w-full h-0.5 bg-glucotrack-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
            <div
              onClick={() => scrollToSection("why-choose-us")}
              className={navLinkClass}
            >
              <span>About</span>
              <motion.div className="absolute bottom-0 left-0 w-full h-0.5 bg-glucotrack-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
            <div
              onClick={() => scrollToSection("waitlist")}
              className={navLinkClass}
            >
              <span>CTA</span>
              <motion.div className="absolute bottom-0 left-0 w-full h-0.5 bg-glucotrack-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
            <div
              onClick={() => scrollToSection("faq")}
              className={navLinkClass}
            >
              <span>FAQs</span>
              <motion.div className="absolute bottom-0 left-0 w-full h-0.5 bg-glucotrack-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
          </div>

          {/* Auth Buttons - Right Side */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/login"
              className="px-4 py-2 rounded-md bg-glucotrack-blue/10 hover:bg-glucotrack-blue/20 text-glucotrack-blue transition-colors duration-300 text-sm font-medium"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-md bg-glucotrack-blue text-white hover:bg-glucotrack-blue/90 transition-colors duration-300 text-sm font-medium"
            >
              Sign up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X size={24} className="text-glucotrack-dark-gray" />
            ) : (
              <Menu size={24} className="text-glucotrack-dark-gray" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          animate={controls}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 flex flex-col">
            <div
              onClick={() => scrollToSection("features")}
              className={mobileNavLinkClass}
            >
              Features
            </div>
            <div
              onClick={() => scrollToSection("why-choose-us")}
              className={mobileNavLinkClass}
            >
              About
            </div>
            <div
              onClick={() => scrollToSection("waitlist")}
              className={mobileNavLinkClass}
            >
              CTA
            </div>
            <div
              onClick={() => scrollToSection("faq")}
              className={mobileNavLinkClass}
            >
              FAQs
            </div>
            <div className="flex flex-col space-y-2 mt-4">
              <Link
                to="/login"
                className="px-4 py-2 rounded-md bg-glucotrack-blue/10 text-glucotrack-blue text-center font-medium"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-md bg-glucotrack-blue text-white text-center font-medium"
              >
                Sign up
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
