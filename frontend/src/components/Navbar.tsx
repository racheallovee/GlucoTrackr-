import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Menu, X } from "lucide-react";
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
    setIsMenuOpen((prev) => !prev);
  };

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const newElement = document.getElementById(sectionId);
        if (newElement) {
          newElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <motion.nav
      className={`fixed ${
        isScrolled ? "top-0" : "top-6"
      } left-0 right-0 z-50 mx-auto max-w-5xl w-[95%] rounded-xl ${
        isScrolled
          ? "bg-blue-50/95 backdrop-blur-sm shadow-sm py-3"
          : "bg-blue-50/90 backdrop-blur-sm py-4"
      } transition-all duration-300`}
    >
      <div className="px-6">
        <div className="flex justify-between items-center">
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

          <div className="hidden md:flex items-center justify-center space-x-8">
            <div
              onClick={() => scrollToSection("features")}
              className="cursor-pointer"
            >
              Features
            </div>
            <div
              onClick={() => scrollToSection("why-choose-us")}
              className="cursor-pointer"
            >
              About
            </div>
            <div
              onClick={() => scrollToSection("waitlist")}
              className="cursor-pointer"
            >
              CTA
            </div>
            <div
              onClick={() => scrollToSection("faq")}
              className="cursor-pointer"
            >
              FAQs
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/login"
              className="px-4 py-2 rounded-md bg-glucotrack-blue/10 text-glucotrack-blue"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-md bg-glucotrack-blue text-white"
            >
              Sign up
            </Link>
          </div>

          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X size={24} className="text-glucotrack-dark-gray" />
            ) : (
              <Menu size={24} className="text-glucotrack-dark-gray" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="py-4 flex flex-col">
              <div
                onClick={() => scrollToSection("features")}
                className="py-4 cursor-pointer"
              >
                Features
              </div>
              <div
                onClick={() => scrollToSection("why-choose-us")}
                className="py-4 cursor-pointer"
              >
                About
              </div>
              <div
                onClick={() => scrollToSection("waitlist")}
                className="py-4 cursor-pointer"
              >
                CTA
              </div>
              <div
                onClick={() => scrollToSection("faq")}
                className="py-4 cursor-pointer"
              >
                FAQs
              </div>
              <div className="flex flex-col space-y-2 mt-4">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md bg-glucotrack-blue/10 text-glucotrack-blue text-center"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-md bg-glucotrack-blue text-white text-center"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
