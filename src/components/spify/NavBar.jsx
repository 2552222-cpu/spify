import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const LOGO_WHITE = "https://media.base44.com/images/public/69f8ef4e14a99d2803ea13b4/7efc36d65_500x400.png";
const LOGO_BLACK = "https://media.base44.com/images/public/69f8ef4e14a99d2803ea13b4/e03d191e3_500x4001.png";
// החלף את הלוגו כשהקישור החדש יסופק

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { to: "/", label: "בית" },
    { to: "/catalog", label: "קטלוג" },
    { to: "/dashboard", label: "דשבורד" },
    { to: "/analytics", label: "אנליטיקס" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-sm" : "bg-transparent"
      }`}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={scrolled ? LOGO_BLACK : LOGO_WHITE}
            alt="SPIFY"
            className="h-11 w-auto object-contain transition-all duration-300 rounded-[15px]"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                location.pathname === link.to
                  ? scrolled ? "bg-primary text-primary-foreground" : "bg-white/20 text-white"
                  : scrolled ? "text-muted-foreground hover:text-foreground hover:bg-secondary" : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/admin"
            className="mr-2 px-4 py-2 rounded-xl text-sm font-semibold gradient-primary text-white transition-all hover:opacity-90"
          >
            אדמין
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 rounded-xl transition-colors ${scrolled ? "hover:bg-secondary" : "hover:bg-white/10"}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen
            ? <X className={`w-5 h-5 ${scrolled ? "" : "text-white"}`} />
            : <Menu className={`w-5 h-5 ${scrolled ? "" : "text-white"}`} />
          }
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden glass border-t border-border"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {links.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    location.pathname === link.to
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-secondary text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/admin"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-semibold gradient-primary text-white text-center"
              >
                אדמין
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}