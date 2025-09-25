import { Link } from "react-router-dom"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight, Send } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-neutral-900 to-neutral-950 text-white">
      {/* Newsletter Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-neutral-800">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-primary-900/30 to-primary-800/30 backdrop-blur-sm">
            <div className="text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Stay Updated</h3>
              <p className="text-neutral-300 max-w-md">Subscribe to our newsletter for exclusive offers and the latest updates</p>
            </div>
            <form className="w-full md:w-auto flex">
              <div className="relative flex-grow">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full md:w-64 py-3 px-4 pr-10 rounded-l-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button 
                  type="submit" 
                  className="absolute right-0 top-0 h-full px-3 text-primary-400 hover:text-primary-300 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
              <button 
                type="submit" 
                className="bg-primary-600 hover:bg-primary-500 text-white py-3 px-6 rounded-r-lg transition-colors flex items-center"
              >
                Subscribe
                <ArrowRight size={16} className="ml-2" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-2 rounded-lg">
                <img className="w-auto h-8" src="/logo.svg" alt="ShopNow Logo" />
              </div>
              <h3 className="text-xl font-display font-bold text-white">ShopNow</h3>
            </div>
            <p className="text-neutral-400 mb-6">Your one-stop destination for all your shopping needs. Quality products, competitive prices, and exceptional service.</p>
            <div className="flex space-x-3">
              <a href="#" className="bg-neutral-800 hover:bg-primary-700 p-2 rounded-full transition-all duration-300 hover:scale-110">
                <Facebook size={18} className="text-white" />
              </a>
              <a href="#" className="bg-neutral-800 hover:bg-primary-700 p-2 rounded-full transition-all duration-300 hover:scale-110">
                <Twitter size={18} className="text-white" />
              </a>
              <a href="#" className="bg-neutral-800 hover:bg-primary-700 p-2 rounded-full transition-all duration-300 hover:scale-110">
                <Instagram size={18} className="text-white" />
              </a>
              <a href="#" className="bg-neutral-800 hover:bg-primary-700 p-2 rounded-full transition-all duration-300 hover:scale-110">
                <Linkedin size={18} className="text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-neutral-400 hover:text-primary-400 transition-colors flex items-center group">
                  <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/electronics" className="text-neutral-400 hover:text-primary-400 transition-colors flex items-center group">
                  <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                  <span>Electronics</span>
                </Link>
              </li>
              <li>
                <Link to="/fashion" className="text-neutral-400 hover:text-primary-400 transition-colors flex items-center group">
                  <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                  <span>Fashion</span>
                </Link>
              </li>
              <li>
                <Link to="/stationery" className="text-neutral-400 hover:text-primary-400 transition-colors flex items-center group">
                  <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                  <span>Stationery</span>
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-neutral-400 hover:text-primary-400 transition-colors flex items-center group">
                  <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                  <span>Cart</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors flex items-center group">
                  <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                  <span>Help Center</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors flex items-center group">
                  <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                  <span>Returns & Refunds</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors flex items-center group">
                  <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                  <span>Shipping Info</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors flex items-center group">
                  <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                  <span>FAQ</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors flex items-center group">
                  <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                  <span>Contact Us</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-neutral-800 p-2 rounded-lg mr-3 mt-1">
                  <MapPin className="h-5 w-5 text-primary-400" />
                </div>
                <span className="text-neutral-400">123 Shopping Street, E-commerce City, 12345</span>
              </li>
              <li className="flex items-center">
                <div className="bg-neutral-800 p-2 rounded-lg mr-3">
                  <Phone className="h-5 w-5 text-primary-400" />
                </div>
                <span className="text-neutral-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <div className="bg-neutral-800 p-2 rounded-lg mr-3">
                  <Mail className="h-5 w-5 text-primary-400" />
                </div>
                <span className="text-neutral-400">2300033296@kluniversity.in</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-neutral-950 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-500 text-sm">&copy; {new Date().getFullYear()} ShopNow. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-neutral-500 hover:text-primary-400 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-neutral-500 hover:text-primary-400 text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-neutral-500 hover:text-primary-400 text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

