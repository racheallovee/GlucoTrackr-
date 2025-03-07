import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const controls = useAnimation();

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

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const navLinkClass =
    "text-gray-700 hover:text-glucotrack-blue transition-colors duration-300 relative group";
  const mobileNavLinkClass =
    "text-lg text-gray-700 hover:text-glucotrack-blue py-4 block";

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      } transition-all duration-300`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
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

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className={navLinkClass}>
              <span>Home</span>
              <motion.div className="absolute bottom-0 left-0 w-full h-0.5 bg-glucotrack-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </a>
            <a href="#features" className={navLinkClass}>
              <span>Features</span>
              <motion.div className="absolute bottom-0 left-0 w-full h-0.5 bg-glucotrack-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </a>
            <a href="#about" className={navLinkClass}>
              <span>About</span>
              <motion.div className="absolute bottom-0 left-0 w-full h-0.5 bg-glucotrack-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </a>
            <a href="#contact" className={navLinkClass}>
              <span>Contact</span>
              <motion.div className="absolute bottom-0 left-0 w-full h-0.5 bg-glucotrack-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </a>
            <a
              href="#waitlist"
              className="btn-primary text-sm px-5 py-2 relative overflow-hidden"
            >
              <span className="relative z-10">Join Waitlist</span>
              <motion.div
                className="absolute inset-0 bg-glucotrack-blue transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"
                style={{ zIndex: 0 }}
              />
            </a>
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
            <a href="#home" className={mobileNavLinkClass}>
              Home
            </a>
            <a href="#features" className={mobileNavLinkClass}>
              Features
            </a>
            <a href="#about" className={mobileNavLinkClass}>
              About
            </a>
            <a href="#contact" className={mobileNavLinkClass}>
              Contact
            </a>
            <a href="#waitlist" className="btn-primary text-center mt-4">
              Join Waitlist
            </a>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
