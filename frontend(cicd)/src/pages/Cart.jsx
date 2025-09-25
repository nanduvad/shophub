import React, { useEffect, useState } from 'react';
import { useCart } from "../context/CartContext";
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Truck, CreditCard, ShieldCheck, Heart, ChevronRight, Clock } from 'lucide-react';

export default function Cart() {
  const { cart, setCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Save cart to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeFromCart = (id) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart => {
      const updatedCart = prevCart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'discount20') {
      setDiscount(subtotal * 0.2);
      setPromoApplied(true);
    } else {
      setDiscount(0);
      setPromoApplied(false);
      alert('Invalid promo code');
    }
  };

  const subtotal = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping - discount;

  if (cart.length === 0) {
    return (
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg shadow-neutral-200/50 p-8 text-center border border-neutral-100">
          <div className="w-28 h-28 bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
            <ShoppingBag className="h-14 w-14 text-secondary-600" />
          </div>
          <h3 className="text-2xl font-bold text-neutral-900 mb-4">Your cart is empty</h3>
          <p className="text-neutral-600 mb-8 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Explore our products and find something you'll love!</p>
          <Link to="/" className="inline-flex items-center px-8 py-3.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-all duration-300 shadow-lg shadow-primary-600/20 transform hover:scale-105">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-2xl shadow-lg shadow-neutral-200/50 p-6 border border-neutral-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-neutral-900">Shopping Cart</h2>
              <span className="px-4 py-1.5 text-sm bg-secondary-100 text-secondary-700 rounded-full font-medium">
                {cart.length} {cart.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            <div className="space-y-5">
              {cart.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-neutral-200 rounded-xl hover:border-secondary-300 hover:shadow-md transition-all duration-300">
                  <div className="relative w-full sm:w-28 h-28 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl overflow-hidden">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                    <button 
                      className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:text-red-500 transition-all duration-300 shadow-md"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="flex-grow w-full sm:w-auto">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-neutral-900">{item.name}</h3>
                      <p className="text-lg font-bold text-neutral-900">${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                    </div>
                    <p className="text-neutral-500 text-sm line-clamp-1 mb-2">{item.description}</p>

                    <div className="flex flex-wrap items-center justify-between gap-4 mt-3">
                      <div className="flex items-center">
                        <button 
                          className="w-8 h-8 flex items-center justify-center border border-neutral-200 rounded-l-lg hover:bg-secondary-50 hover:text-secondary-600 transition-colors"
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                          disabled={(item.quantity || 1) <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-10 h-8 flex items-center justify-center border-t border-b border-neutral-200 text-neutral-900 font-medium">
                          {item.quantity || 1}
                        </span>
                        <button 
                          className="w-8 h-8 flex items-center justify-center border border-neutral-200 rounded-r-lg hover:bg-secondary-50 hover:text-secondary-600 transition-colors"
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <div className="flex items-center space-x-3">
                        <button className="flex items-center text-sm text-neutral-500 hover:text-secondary-600 transition-colors">
                          <Heart className="h-4 w-4 mr-1" />
                          Save for later
                        </button>
                        <span className="text-neutral-300">|</span>
                        <button className="flex items-center text-sm text-neutral-500 hover:text-secondary-600 transition-colors">
                          <Clock className="h-4 w-4 mr-1" />
                          Fast delivery
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex justify-between items-center">
              <Link to="/" className="text-secondary-600 hover:text-secondary-700 font-medium flex items-center group">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:transform group-hover:-translate-x-1 transition-transform" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-2xl shadow-lg shadow-neutral-200/50 p-6 sticky top-24 border border-neutral-100">
            <h3 className="text-xl font-bold text-neutral-900 mb-6">Order Summary</h3>
            
            {/* Promo Code */}
            <div className="mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-grow px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-colors"
                  disabled={promoApplied}
                />
                <button
                  onClick={applyPromoCode}
                  className={`px-4 py-2.5 rounded-lg font-medium ${
                    promoApplied 
                      ? 'bg-green-100 text-green-700 cursor-default' 
                      : 'bg-secondary-600 text-white hover:bg-secondary-700 shadow-md shadow-secondary-600/20'
                  }`}
                  disabled={promoApplied}
                >
                  {promoApplied ? 'Applied' : 'Apply'}
                </button>
              </div>
              {promoApplied && (
                <div className="mt-2 text-sm text-green-600 flex items-center">
                  <ShieldCheck className="h-4 w-4 mr-1" />
                  Promo code applied successfully!
                </div>
              )}
            </div>
            
            <div className="space-y-3 border-t border-neutral-200 pt-4">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-neutral-900 border-t border-neutral-200 pt-3 mt-3">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <button className="w-full mt-6 py-3.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-all duration-300 shadow-lg shadow-primary-600/20 flex items-center justify-center">
              Proceed to Checkout
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>

            <div className="mt-6 space-y-3">
              <div className="flex items-center text-neutral-600 text-sm">
                <Truck className="h-5 w-5 text-secondary-600 mr-3" />
                <span>Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center text-neutral-600 text-sm">
                <CreditCard className="h-5 w-5 text-secondary-600 mr-3" />
                <span>Secure payment processing</span>
              </div>
              <div className="flex items-center text-neutral-600 text-sm">
                <ShieldCheck className="h-5 w-5 text-secondary-600 mr-3" />
                <span>30-day money-back guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
