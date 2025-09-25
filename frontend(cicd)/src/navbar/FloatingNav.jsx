import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, ShoppingBag, Laptop, Shirt, BookOpen, ShoppingCart } from "lucide-react";
import "./FloatingNav.css";

const FloatingNav = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navItems = [
    { name: "Home", path: "/", icon: <Home className="w-5 h-5" /> },
    { name: "Electronics", path: "/electronics", icon: <Laptop className="w-5 h-5" /> },
    { name: "Fashion", path: "/fashion", icon: <Shirt className="w-5 h-5" /> },
    { name: "Stationery", path: "/stationery", icon: <BookOpen className="w-5 h-5" /> },
    { name: "Cart", path: "/cart", icon: <ShoppingCart className="w-5 h-5" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Hide nav when scrolling down, show when scrolling up
      if (window.scrollY > lastScrollY && window.scrollY > 150) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`floating-nav ${isVisible ? "visible" : "hidden"}`}>
      <div className="floating-nav-container">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`floating-nav-item ${location.pathname === item.path ? "active" : ""}`}
          >
            <div className="floating-nav-icon">{item.icon}</div>
            <span className="floating-nav-label">{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default FloatingNav;
