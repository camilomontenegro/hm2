// For client-side React components ('use client')
import { createClient } from '@supabase/supabase-js'

// Using Next.js client-side environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// TypeScript types for our product data
export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  image_url: string
  category: string | null
  stock_quantity: number
  is_featured: boolean
  created_at: string
  updated_at: string
}