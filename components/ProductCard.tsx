'use client'
import Image from 'next/image'
import { useState } from 'react'
import { Product } from '@/lib/supabase'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="group relative overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        
        {/* Price Tag - Appears on Hover */}
        <div 
          className={`absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
          }`}
        >
          <span className="text-sm font-semibold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Quick Shop Overlay */}
        <div 
          className={`absolute inset-0 bg-black/20 flex items-end justify-center pb-6 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button className="bg-white text-black px-6 py-2 font-medium hover:bg-gray-100 transition-colors duration-200">
            Quick Shop
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="pt-4 space-y-1">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-xs text-gray-500 line-clamp-1">
            {product.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 capitalize">
            {product.category}
          </span>
          {product.stock_quantity < 10 && product.stock_quantity > 0 && (
            <span className="text-xs text-orange-600 font-medium">
              Only {product.stock_quantity} left
            </span>
          )}
        </div>
      </div>
    </div>
  )
}