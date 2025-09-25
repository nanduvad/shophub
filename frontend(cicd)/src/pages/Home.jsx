import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight, Star, TrendingUp, ChevronRight, Heart, ShoppingCart, Award, Truck, RefreshCw, Sparkles, Clock, Shield } from "lucide-react";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    {
      name: "Electronics",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      description: "Cutting-edge technology for modern life",
      items: "2000+ products",
      path: "/electronics"
    },
    {
      name: "Fashion",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      description: "Trending styles for every occasion",
      items: "1500+ items",
      path: "/fashion"
    },
    {
      name: "Stationery",
      image: "https://img.freepik.com/free-photo/parallel-fineliners-white-background_23-2148224274.jpg",
      description: "Premium supplies for productivity",
      items: "800+ products",
      path: "/stationery"
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Wireless Noise-Cancelling Headphones",
      price: 249.99,
      rating: 4.8,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      category: "electronics"
    },
    {
      id: 2,
      name: "Premium Cotton T-Shirt",
      price: 29.99,
      rating: 4.5,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      category: "fashion"
    },
    {
      id: 3,
      name: "Professional Notebook Set",
      price: 19.99,
      rating: 4.7,
      reviews: 56,
      image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      category: "stationery"
    },
    {
      id: 4,
      name: "Smart Watch Series 5",
      price: 199.99,
      rating: 4.9,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      category: "electronics"
    }
  ];

  return (
    <div className="overflow-x-hidden bg-neutral-50">
      {/* Progress bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 opacity-70 z-0"></div>
        <div className="container px-4 mx-auto relative z-10 sm:px-6 lg:px-8">
          <div className={`max-w-3xl mx-auto text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-primary-500 mr-2 animate-pulse"></span>
              Welcome to ShopNow
            </div>
            
            <h1 className="text-4xl font-bold text-neutral-900 md:text-5xl lg:text-6xl font-pj mb-6">
              Discover amazing products for{" "}
              <span className="relative inline-block">
                <span className="absolute inset-x-0 bottom-0 h-3 bg-secondary-200"></span>
                <span className="relative text-neutral-900">every need</span>
              </span>
            </h1>

            <p className="text-xl text-neutral-600 mb-10 max-w-2xl mx-auto">
              Shop the latest trends in fashion, cutting-edge electronics, and premium stationery with free shipping on orders over $100.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/electronics"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white bg-primary-600 rounded-lg shadow-md hover:bg-primary-700 transition-all duration-300 w-full sm:w-auto"
              >
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>

              <a
                href="#featured"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-all duration-300 w-full sm:w-auto"
              >
                View Featured Products
                <ChevronRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-neutral-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Free Shipping</h3>
              <p className="text-neutral-600">On orders over $100</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-neutral-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                <RefreshCw className="w-6 h-6 text-secondary-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Easy Returns</h3>
              <p className="text-neutral-600">30-day return policy</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-neutral-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-accent-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Quality Guarantee</h3>
              <p className="text-neutral-600">100% authentic products</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-16 bg-neutral-50">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 mb-3 text-sm font-medium rounded-full bg-secondary-100 text-secondary-700">Categories</span>
            <h2 className="text-3xl font-bold text-neutral-900 font-pj mb-4">Shop by Category</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">Explore our wide range of products across different categories.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                to={category.path}
                className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-neutral-100"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                    <p className="text-white/80 text-sm mb-3">{category.description}</p>
                    <span className="inline-flex items-center text-sm font-medium text-blue-200">
                      {category.items}
                      <ChevronRight className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-16 bg-white">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 mb-3 text-sm font-medium rounded-full bg-primary-100 text-primary-700">Featured</span>
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Featured Products</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">Check out our most popular products handpicked for you.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Link 
                to={`/product/${product.category}/${product.id}`} 
                key={product.id}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-neutral-100 transition-all duration-300"
              >
                <div className="aspect-w-1 aspect-h-1 bg-neutral-50 relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.isNew && (
                    <span className="absolute top-2 right-2 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-md">NEW</span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-neutral-900">${product.price.toFixed(2)}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-amber-400 mr-1 fill-current" />
                      <span className="text-sm text-neutral-500">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              to="/products" 
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-all duration-300 shadow-lg shadow-primary-600/20"
            >
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold font-pj mb-4">Subscribe to our newsletter</h2>
            <p className="text-blue-100 mb-8">Get the latest updates on new products and upcoming sales</p>
            
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button 
                type="submit" 
                className="bg-white text-blue-700 font-medium px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;