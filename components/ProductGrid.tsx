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
      
      // Mock data for development - replace with actual Supabase call
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Oversized Cotton T-shirt',
          description: 'Relaxed fit cotton t-shirt in soft organic cotton',
          price: 19.99,
          image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=600&fit=crop',
          category: 'women',
          stock_quantity: 15,
          is_featured: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Slim Fit Denim Jeans',
          description: 'Classic blue denim jeans with modern slim fit',
          price: 49.99,
          image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=600&fit=crop',
          category: 'men',
          stock_quantity: 8,
          is_featured: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Floral Summer Dress',
          description: 'Light and airy dress perfect for summer days',
          price: 39.99,
          image_url: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop',
          category: 'women',
          stock_quantity: 12,
          is_featured: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '4',
          name: 'Classic White Sneakers',
          description: 'Versatile white sneakers for everyday wear',
          price: 79.99,
          image_url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=600&fit=crop',
          category: 'footwear',
          stock_quantity: 20,
          is_featured: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '5',
          name: 'Wool Blend Sweater',
          description: 'Cozy wool blend sweater for cooler days',
          price: 59.99,
          image_url: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=600&fit=crop',
          category: 'women',
          stock_quantity: 6,
          is_featured: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '6',
          name: 'Casual Button-up Shirt',
          description: 'Versatile button-up shirt for work and weekend',
          price: 34.99,
          image_url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=600&fit=crop',
          category: 'men',
          stock_quantity: 18,
          is_featured: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '7',
          name: 'High-waisted Trousers',
          description: 'Elegant high-waisted trousers for professional wear',
          price: 69.99,
          image_url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop',
          category: 'women',
          stock_quantity: 10,
          is_featured: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '8',
          name: 'Leather Jacket',
          description: 'Classic black leather jacket with modern cut',
          price: 199.99,
          image_url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop',
          category: 'outerwear',
          stock_quantity: 4,
          is_featured: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]

      // Filter mock data based on props
      let filteredProducts = mockProducts

      if (category) {
        filteredProducts = filteredProducts.filter(p => p.category === category)
      }

      if (featured) {
        filteredProducts = filteredProducts.filter(p => p.is_featured)
      }

      if (limit) {
        filteredProducts = filteredProducts.slice(0, limit)
      }

      setProducts(filteredProducts)

      // Uncomment below when Supabase is configured
      
      let query = supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (category) {
        query = query.eq('category', category)
      }

      if (featured) {
        query = query.eq('is_featured', true)
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