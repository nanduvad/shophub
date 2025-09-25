"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, ShoppingCart, Search, User, Home, Zap, Shirt, PenTool, Heart } from 'lucide-react'
import UserDetails from "./UserDetails"

const Header = () => {
  const [expanded, setExpanded] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchFocused, setSearchFocused] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setExpanded(false)
  }, [location])

  const handleSearch = (e) => {
    e.preventDefault()
    // Search functionality would go here
    console.log("Searching for:", searchQuery)
  }

  const navLinks = [
    { name: "Home", path: "/", icon: <Home className="w-5 h-5" /> },
    { name: "Electronics", path: "/electronics", icon: <Zap className="w-5 h-5" /> },
    { name: "Fashion", path: "/fashion", icon: <Shirt className="w-5 h-5" /> },
    { name: "Stationery", path: "/stationery", icon: <PenTool className="w-5 h-5" /> },
  ]

  return (
    <header className={`sticky top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? "backdrop-blur-xl bg-neutral-50/90 shadow-lg" 
        : "bg-gradient-to-r from-neutral-50 to-neutral-100"
    }`}>
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="group flex items-center space-x-2 rounded outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
              <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 p-2 transition-all duration-300 group-hover:scale-105">
                <img className="w-auto h-8" src="/logo.svg" alt="ShopNow Logo" />
              </div>
              <span className="hidden md:block text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800">ShopNow</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-1 px-4 py-2 rounded-full font-medium transition-all duration-200 hover:bg-primary-50 hover:text-primary-700 ${
                  location.pathname === link.path 
                    ? "bg-primary-100 text-primary-700" 
                    : "text-neutral-700"
                }`}
              >
                <span className="transition-transform duration-300 transform group-hover:scale-110">
                  {link.icon}
                </span>
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>

          {/* Search, Cart, User */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className={`w-64 py-2 pl-10 pr-4 rounded-full border transition-all duration-300 ${
                  searchFocused 
                    ? "bg-white border-primary-300 shadow-md shadow-primary-100" 
                    : "bg-neutral-100 border-neutral-200"
                } focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400`}
              />
              <Search className={`absolute left-3 top-2.5 h-5 w-5 transition-colors duration-300 ${
                searchFocused ? "text-primary-500" : "text-neutral-400"
              }`} />
            </form>
            
            <Link to="/cart" className="relative p-2 rounded-full hover:bg-neutral-100 transition-all duration-200 hover:scale-105">
              <ShoppingCart className="h-6 w-6 text-neutral-700" />
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-accent-500 text-white text-xs font-bold rounded-full shadow-sm">0</span>
            </Link>
            
            <Link to="/wishlist" className="relative p-2 rounded-full hover:bg-neutral-100 transition-all duration-200 hover:scale-105">
              <Heart className="h-6 w-6 text-neutral-700" />
            </Link>
            
            <UserDetails />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="h-6 w-6 text-neutral-700" />
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-accent-500 text-white text-xs font-bold rounded-full shadow-sm">0</span>
            </Link>
            
            <button
              type="button"
              className="p-2 rounded-md text-dark-700 hover:bg-dark-100"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
            >
              <span className="sr-only">Toggle menu</span>
              {!expanded ? <Menu className="w-6 h-6" /> : <X className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {expanded && (
          <div className="md:hidden py-4 border-t border-dark-100">
            <div className="space-y-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 rounded-full bg-dark-50 border border-dark-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-dark-400" />
              </form>
              
              <nav className="space-y-2">
                {navLinks.map((link) => (
                  <Link 
                    key={link.path}
                    to={link.path}
                    className={`block py-2 px-3 rounded-md font-medium ${
                      location.pathname === link.path 
                        ? "bg-primary-50 text-primary-700" 
                        : "text-dark-700 hover:bg-dark-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              
              <div className="pt-4 border-t border-dark-100">
                <UserDetails />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
