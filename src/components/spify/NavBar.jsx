import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const LOGO_NEW = "https://media.base44.com/images/public/69f8ef4e14a99d2803ea13b4/924b605e9_image.png";

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
    { to: "/calculator", label: "עלויות" },
    { to: "/logistics", label: "לוגיסטיקה" },
    { to: "/terms", label: "תנאים" },
    { to: "/dashboard", label: "דשבורד" },
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
        <Link to="/" className="flex items-center gap-1">
          <div className="flex flex-col leading-none">
            <div className="flex items-center gap-1">
              <span className={`text-xl font-black tracking-tight ${scrolled ? "text-foreground" : "text-white"}`}>
                SPIFY
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-0.5 flex-shrink-0" />
            </div>
            <span className={`text-[10px] font-medium tracking-widest uppercase ${scrolled ? "text-muted-foreground" : "text-white/60"}`}>
              make them want it
            </span>
          </div>
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