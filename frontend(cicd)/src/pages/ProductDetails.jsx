import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, ShoppingCart, CheckCircle, Heart, Share2, ArrowLeft, Truck, Shield, RefreshCw, Minus, Plus, ChevronRight, Award, Clock, Zap } from "lucide-react";
import { useCart } from "../context/CartContext";
import Loader from "../components/Loader";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { id } = useParams();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false); // Track if added to cart

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) throw new Error("Product fetch failed");
        const data = await response.json();

        setProduct({
          id: data.id,
          name: data.title,
          price: data.price,
          images: data.images || [],
          description: data.description,
          category: data.category,
          rating: data.rating || 0,
          stock: data.stock,
          originalPrice: (data.price * 1.2).toFixed(2),
          brand: data.brand || "Generic",
          features: [
            "Premium quality materials",
            "Designed for durability",
            "Modern aesthetic appeal"
          ]
        });
      } catch (error) {
        console.error("Error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
    
    // Reset added state when navigating between products
    return () => setAdded(false);
  }, [id]);

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(product.stock, quantity + value));
    setQuantity(newQuantity);
  };

  const handleAddToCart = (e) => {
    addToCart({...product, quantity});
    setAdded(true);
    
    // Reset after 3 seconds
    setTimeout(() => setAdded(false), 3000);

    // Ripple Effect
    const button = e.currentTarget;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    
    ripple.style.position = "absolute";
    ripple.style.borderRadius = "50%";
    ripple.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
    ripple.style.width = "100px";
    ripple.style.height = "100px";
    ripple.style.transform = "translate(-50%, -50%) scale(0)";
    ripple.style.animation = "ripple 0.6s linear";
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    
    button.appendChild(ripple);
    setTimeout(() => button.removeChild(ripple), 600);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  if (loading) return <Loader />;
  if (!product) return <div className="flex flex-col items-center justify-center min-h-screen p-4">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-neutral-900 mb-2">Product Not Found</h2>
      <p className="text-neutral-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
      <Link to="/" className="inline-flex items-center px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors shadow-lg shadow-secondary-600/20">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Home
      </Link>
    </div>
  </div>;
  
  return (
    <div className="bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-neutral-500">
            <li>
              <Link to="/" className="flex items-center hover:text-secondary-600 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Link>
            </li>
            <li><ChevronRight className="w-3 h-3" /></li>
            <li>
              <Link to={`/category/${product.category}`} className="hover:text-secondary-600 transition-colors capitalize">
                {product.category}
              </Link>
            </li>
            <li><ChevronRight className="w-3 h-3" /></li>
            <li className="text-neutral-700 truncate max-w-[200px] font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="bg-white rounded-2xl shadow-lg shadow-neutral-200/50 border border-neutral-100 p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-6">
              <div className="aspect-square relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-50 to-neutral-100">
                <img 
                  src={product.images[selectedImage] || "/fallback.jpg"} 
                  alt={product.name} 
                  className="w-full h-full object-contain p-4" 
                />
                <button 
                  onClick={toggleWishlist}
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white/80 backdrop-blur-sm text-neutral-500 hover:text-red-500'} flex items-center justify-center transition-all duration-300`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
                
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-accent-500 text-white text-xs font-bold rounded-full">
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </div>
              </div>
              
              <div className="grid grid-cols-5 gap-3">
                {product.images.slice(0, 5).map((image, index) => (
                  <button 
                    key={index} 
                    onClick={() => setSelectedImage(index)} 
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index 
                        ? 'border-secondary-500 shadow-md' 
                        : 'border-transparent hover:border-secondary-300'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} - View ${index + 1}`} 
                      className="w-full h-full object-cover" 
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <span className="px-4 py-1.5 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                    {product.brand}
                  </span>
                  <span className="flex items-center text-sm text-neutral-500">
                    <Clock className="w-4 h-4 mr-1" />
                    Fast Delivery
                  </span>
                </div>
                
                <h1 className="text-3xl font-bold text-neutral-900 mb-2">{product.name}</h1>
                
                <div className="flex items-center mb-2">
                  <div className="flex items-center mr-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-amber-500 fill-amber-500' : 'text-neutral-300'}`} 
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium text-neutral-700">{product.rating}</span>
                  </div>
                  <span className="text-sm text-neutral-500">Based on customer reviews</span>
                </div>
                
                <div className="flex items-baseline mb-6">
                  <span className="text-3xl font-bold text-neutral-900">${product.price.toFixed(2)}</span>
                  <span className="ml-3 text-lg text-neutral-400 line-through">${product.originalPrice}</span>
                  <span className="ml-2 px-2 py-1 bg-accent-100 text-accent-700 text-xs font-medium rounded">
                    Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </span>
                </div>
                
                <p className="text-neutral-600 mb-8">{product.description}</p>
                
                <div className="space-y-6 mb-8">
                  <div className="flex flex-col space-y-4">
                    <h3 className="text-lg font-medium text-neutral-900">Key Features</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-neutral-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-6">
                  <div className="flex items-center">
                    <div className="flex items-center border border-neutral-200 rounded-l-lg">
                      <button 
                        onClick={() => handleQuantityChange(-1)} 
                        className="w-10 h-10 flex items-center justify-center text-neutral-600 hover:text-primary-600 transition-colors"
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-medium text-neutral-900">{quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(1)} 
                        className="w-10 h-10 flex items-center justify-center text-neutral-600 hover:text-primary-600 transition-colors"
                        disabled={quantity >= product.stock}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="ml-4 text-sm text-neutral-500">
                      {product.stock} items available
                    </span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleAddToCart}
                      disabled={added}
                      className={`relative overflow-hidden flex-1 flex items-center justify-center px-6 py-3 rounded-lg font-medium text-white ${
                        added 
                          ? 'bg-green-500 hover:bg-green-600' 
                          : 'bg-primary-600 hover:bg-primary-700'
                      } shadow-lg shadow-primary-600/20 transition-all duration-300`}
                    >
                      {added ? (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Added to Cart
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5 mr-2" />
                          Add to Cart
                        </>
                      )}
                    </button>
                    
                    <button 
                      className="flex-1 sm:flex-none px-6 py-3 border border-neutral-200 rounded-lg font-medium text-neutral-700 hover:bg-neutral-50 hover:text-primary-600 transition-all duration-300 flex items-center justify-center"
                    >
                      <Share2 className="w-5 h-5 mr-2" />
                      Share Product
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center p-4 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                    <Truck className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-900">Free Shipping</h4>
                    <p className="text-sm text-neutral-500">On orders over $100</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl">
                  <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center mr-3">
                    <Shield className="w-5 h-5 text-accent-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-900">Secure Payment</h4>
                    <p className="text-sm text-neutral-500">100% secure checkout</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl">
                  <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center mr-3">
                    <RefreshCw className="w-5 h-5 text-secondary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-900">Easy Returns</h4>
                    <p className="text-sm text-neutral-500">30-day return policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}