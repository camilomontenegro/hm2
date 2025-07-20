import ProductGrid from '@/components/ProductGrid'

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "H&M",
    "url": "https://hm.com",
    "description": "Discover the latest fashion trends and styles at H&M.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://hm.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="relative min-h-screen overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-white">H&M</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#" className="text-white font-medium hover:text-white/80 transition-colors duration-200 border-b-2 border-white pb-1">
                  Home
                </a>
                <a href="#" className="text-white/80 font-medium hover:text-white transition-colors duration-200">
                  Women
                </a>
                <a href="#" className="text-white/80 font-medium hover:text-white transition-colors duration-200">
                  Men
                </a>
                <a href="#" className="text-white/80 font-medium hover:text-white transition-colors duration-200">
                  Sale
                </a>
              </div>
            </div>
            
            {/* Login Button */}
            <div className="hidden md:block">
              <button className="bg-white/20 backdrop-blur-sm text-white font-medium px-4 py-2 rounded-md hover:bg-white/30 transition-all duration-200">
                Login
              </button>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-white hover:text-white/80 transition-colors">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          {/* Fallback image for browsers that don't support video */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-600"></div>
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-8 leading-tight">
            Style yourself.
            <br />
            <span className="font-normal">Own the moment.</span>
          </h1>
          
          <button className="bg-white text-black font-medium px-8 py-4 text-lg rounded-md hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg">
            Shop now
          </button>
        </div>
      </div>
      </div>

      {/* Product Sections */}
      <main>
        {/* Featured Products Section */}
        <ProductGrid 
          title="New Arrivals" 
          featured={true} 
          limit={8} 
        />
        
        {/* Category Sections */}
        <ProductGrid 
          title="Women's Collection" 
          category="women" 
          limit={4} 
        />
        
        <ProductGrid 
          title="Men's Collection" 
          category="men" 
          limit={4} 
        />
      </main>
    </>
  );
}
