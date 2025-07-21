// For client-side React components ('use client')
import { createClient } from '@supabase/supabase-js'

// Using Next.js client-side environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_KEY')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// TypeScript types for our product data
export interface Product {
  id: number
  created_at: string
  title: string
  price: number
  image_irl: string
  gender: string
}