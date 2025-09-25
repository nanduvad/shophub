"use client"
import { useState, useEffect } from "react"
import { ShoppingCart, Minus, Plus } from "lucide-react"
import { toast } from "react-hot-toast"
import { Link } from "react-router-dom"
import Loader from "../components/Loader"


const Electronics = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState({})

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categories = [
          "smartphones",
          "laptops",
          "tablets",
          "gaming-consoles",
          "headphones",
          "speakers",
          "smart-watches",
          "televisions"
        ]
  
        const categoryRequests = categories.map(category =>
          fetch(`https://dummyjson.com/products/category/${category}`).then(res => res.json())
        )
  
        const categoryData = await Promise.all(categoryRequests)
  
        const combinedProducts = categoryData.flatMap(({ products }) =>
          products.map(item => ({
            id: item.id,
            name: item.title,
            price: item.price,
            image: item.thumbnail,
            description: item.description,
            features: [
              item.brand,
              `${item.rating}/5 Rating`,
              `${item.stock} in Stock`
            ],
            colors: ["black", "white", "gray"],
            rating: item.rating,
            reviews: item.stock,
            originalPrice: item.price + (item.discountPercentage * item.price / 100)
          }))
        )
  
        setProducts(combinedProducts)
      } catch (error) {
        console.error('Error fetching products:', error)
        toast.error("Failed to load products")
      } finally {
        setLoading(false)
      }
    }
  
    fetchProducts()
  }, [])



  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">Electronics</h1>
          <span className="ml-3 px-3 py-1 bg-secondary-100 text-secondary-700 text-xs font-medium rounded-full">
            {products.length} items
          </span>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-primary-200 via-secondary-200 to-accent-200 blur-2xl opacity-30"></div>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md border border-neutral-100 transition-all duration-300 group">
                <Link to={`/product/electronics/${product.id}`} className="block mb-4">
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {product.rating >= 4.5 && (
                      <span className="absolute top-2 left-2 px-2 py-1 bg-accent-500 text-white text-xs font-bold rounded">
                        TOP RATED
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold text-neutral-900 group-hover:text-secondary-700 transition-colors">{product.name}</h2>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <p className="text-neutral-900 font-bold">${product.price.toFixed(2)}</p>
                      {product.originalPrice > product.price && (
                        <p className="text-neutral-500 text-sm line-through">${product.originalPrice.toFixed(2)}</p>
                      )}
                    </div>
                    <div className="flex items-center text-amber-500">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-1 text-sm text-neutral-600">{product.rating}</span>
                    </div>
                  </div>
                </Link>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-neutral-500">{product.features[0]}</span>
                  <button className="flex items-center justify-center p-2 rounded-full bg-secondary-100 text-secondary-700 hover:bg-secondary-200 transition-colors">
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Electronics