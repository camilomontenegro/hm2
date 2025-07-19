'use client'
import { useEffect, useState } from 'react'
import { supabase, Product } from '@/lib/supabase'
import ProductCard from './ProductCard'

interface ProductGridProps {
  title?: string
  category?: string
  featured?: boolean
  limit?: number
}

export default function ProductGrid({ 
  title = "Featured Products", 
  category, 
  featured, 
  limit 
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [category, featured, limit])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      
      let query = supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (category) {
        query = query.eq('gender', category)
      }

      if (featured) {
        // Since we don't have is_featured anymore, just get the latest products for featured
        // You can modify this logic based on your needs
      }

      if (limit) {
        query = query.limit(limit)
      }

      const { data, error } = await query

      if (error) throw error

      setProducts(data || [])
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-light text-center mb-12">{title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-light mb-8">{title}</h2>
          <p className="text-red-600">Error loading products: {error}</p>
          <button 
            onClick={fetchProducts}
            className="mt-4 bg-black text-white px-6 py-2 hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-light text-center mb-12 text-gray-900">{title}</h2>
        
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {products.length >= (limit || 8) && (
          <div className="text-center mt-12">
            <button className="border border-black px-8 py-3 hover:bg-black hover:text-white transition-colors duration-200">
              Load More Products
            </button>
          </div>
        )}
      </div>
    </section>
  )
}