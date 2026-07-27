"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';

const HomePage = () => {
  const router = useRouter();

  // Featured urban streetwear collection
  const products = [
    {
      _id: '6a606d3bf77c0ba56f40f1fd',
      name: 'Oversized Graphic Hoodie',
      brand: 'URBAN REBELS',
      price: 2999.00,
      images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOgzUbszZIkeR80SUUr9mV27cDXBf6VUx9S6-S6eFwq1McVZJKtWUpRk8v&s=10'],
      description: 'Bold street-style hoodie with statement graphics and premium heavyweight cotton.'
    },
    {
      _id: '6a606e2ff77c0ba56f40f200',
      name: 'Distressed Denim Jacket',
      brand: 'STREET CODE',
      price: 4499.00,
      images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3HbDxm0s2KsygfjpIdizhpHjmaGX6hfZJIcWWw_epdQ&s=10'],
      description: 'Vintage-washed denim with raw edge details and urban attitude.'
    },
    {
      _id: '6a606f2af77c0ba56f40f203',
      name: 'Cargo Joggers',
      brand: 'CITY LIMITS',
      price: 2499.00,
      images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ6kb6mxMyozdVRv_idWIEFwLRJXQTRchzfJkZkZVoD1Kw0GecwhQ_HSSn&s=10'],
      description: 'Utility meets comfort with multi-pocket design and tapered fit.'
    },
    {
      _id: '4',
      name: 'waffle',
      brand: 'KICK CULTURE',
      price: 5999.00,
      images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMr-AqINce39V0W5rWqQrZnFWeqojicLLEBfGcWyigmA&s=10'],
      description: 'Chunky silhouette sneakers with color-block design for street cred.'
    },
    {
      _id: '6a60703df77c0ba56f40f206',
      name: 'Tech Wear Cargo Pants',
      brand: 'FUTURE STREET',
      price: 3499.00,
      images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBuyqc3qXzOcIwVgtdwGKvRA1gY_r5H1QaJ78JPO0Scg&s=10'],
      description: 'Technical fabric cargos with adjustable straps and futuristic details.'
    },
    {
      _id: '6',
      name: 'Oversized Boxy Tee',
      brand: 'REBEL WEAR',
      price: 1499.00,
      images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYKZndtRMdaubwlZPAB2EwWDHFkhy3oZ60MRdPWYmIlg&s=10'],
      description: 'Heavy cotton oversized t-shirt with drop shoulders and raw hem.'
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-24" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Hero Section - Urban Street Style */}
      <div className="relative bg-[#111111] w-full overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #E71D2B 0px, #E71D2B 1px, transparent 1px, transparent 20px)'
          }} />
        </div>
        
        {/* Text content */}
        <div className="relative z-10 w-full bg-gradient-to-r from-[#111111] via-[#111111]/95 to-transparent py-20 sm:py-28 lg:py-36">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="inline-block px-4 py-2 bg-[#E71D2B] text-white text-sm font-bold rounded-full mb-6">
                  NEW DROP 2026
                </span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl tracking-tighter font-black text-white sm:text-6xl md:text-7xl leading-none"
              >
                <span className="block">STREET</span>
                <span className="block text-[#E71D2B]">CULTURE</span>
                <span className="block">REDEFINED</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-6 max-w-lg text-lg text-gray-400 leading-relaxed"
              >
                Unleash your urban edge with bold graphics, oversized fits, and street-ready essentials. From the block to the spotlight.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-10 flex gap-4"
              >
                <button 
                  onClick={() => router.push('/pages/products-page')}
                  className="px-8 py-4 bg-[#E71D2B] text-white font-bold rounded-full hover:bg-[#FF4D5A] transition-all duration-300 transform hover:scale-105 shadow-lg"
                  style={{ boxShadow: '0 4px 20px rgba(231, 29, 43, 0.4)' }}
                >
                  SHOP LATEST
                </button>
                <button 
                  onClick={() => router.push('/pages/products-page')}
                  className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-[#111111] transition-all duration-300"
                >
                  EXPLORE
                </button>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Hero image */}
        <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRrjfOPJu0W6o5p90UMEVBwGI4jLoSHjYmJxBOMK-ZkC4Cc1xNUc91NxT_&s=10"
            alt="Urban streetwear collection"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#111111]" />
        </div>
      </div>

      {/* Featured Products - Urban Style Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-center mb-16">
            <span className="text-[#E71D2B] font-bold text-sm tracking-widest uppercase">Latest Collection</span>
            <h2 className="mt-4 text-5xl font-black tracking-tighter text-[#111111]">
              STREET ESSENTIALS
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-[#666666] mx-auto">
              Curated drops for the bold and fearless. Wear your attitude.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -10 }}
                className="group relative bg-[#F5F5F5] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
                style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
              >
                {/* Product Tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-[#E71D2B] text-white text-xs font-bold rounded-full">
                    NEW
                  </span>
                </div>
                
                {/* Product Image */}
                <div className="aspect-square w-full relative bg-white cursor-pointer"
                  onClick={() => router.push(`pages/products/${product._id}`)}
                >
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  
                  {/* Quick Actions Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button className="px-6 py-3 bg-[#E71D2B] text-white font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                      style={{ boxShadow: '0 2px 10px rgba(231, 29, 43, 0.3)' }}
                    >
                      QUICK VIEW
                    </button>
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="p-5">
                  <p className="text-[#E71D2B] text-xs font-bold tracking-wider uppercase mb-2">
                    {product.brand}
                  </p>
                  <h3 className="text-lg font-bold text-[#111111] mb-2 leading-tight">
                    <button 
                      onClick={() => router.push(`/product?id=${product._id}`)}
                      className="hover:text-[#E71D2B] transition-colors focus:outline-none text-left"
                    >
                      {product.name}
                    </button>
                  </h3>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-2xl font-black text-[#111111]">₹{product.price.toLocaleString()}</p>
                    <button className="p-3 bg-[#111111] text-white rounded-full hover:bg-[#E71D2B] transition-all duration-300 transform hover:scale-110"
                      style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/pages/products-page')}
              className="inline-flex items-center px-10 py-4 bg-[#E71D2B] text-white font-bold rounded-full hover:bg-[#FF4D5A] transition-all duration-300 shadow-xl"
              style={{ 
                boxShadow: '0 4px 20px rgba(231, 29, 43, 0.3)',
                borderRadius: '12px'
              }}
            >
              VIEW FULL COLLECTION
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-3 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Features Section - Urban Style */}
      <div className="bg-[#111111] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#E71D2B] font-bold text-sm tracking-widest uppercase">Why Choose Us</span>
            <h2 className="mt-4 text-5xl font-black tracking-tighter text-white">
              THE STREET EDGE
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-gray-400 mx-auto">
              We don't follow trends. We set them. Premium quality meets urban attitude.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'Premium Heavyweight Fabrics',
                description: 'Oversized fits crafted from 450GSM cotton, fleece, and tech materials built to last.',
                icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
              },
              {
                name: 'Exclusive Drops',
                description: 'Limited edition collections that keep your style fresh and your wardrobe unique.',
                icon: 'M13 10V3L4 14h7v7l9-11h-7z'
              },
              {
                name: 'Free Express Shipping',
                description: 'Free shipping on all orders. Because waiting isnt part of the street culture.',
                icon: 'M3 3a1 1 0 000 2h18a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3z'
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
                className="group"
              >
                <div className="bg-[#151515] rounded-2xl p-8 h-full border border-[#2A2A2A] hover:border-[#E71D2B] transition-all duration-300"
                  style={{ borderRadius: '12px' }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#E71D2B] to-[#FF4D5A] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{feature.name}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-[#E71D2B] font-bold text-sm tracking-widest uppercase">Join The Movement</span>
            <h2 className="mt-4 text-5xl font-black tracking-tighter text-[#111111]">
              GET EARLY ACCESS
            </h2>
            <p className="mt-4 text-lg text-[#666666] max-w-2xl mx-auto">
              Be the first to know about exclusive drops, sales, and street culture news.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-6 py-4 bg-[#F5F5F5] border-2 border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#E71D2B] transition-colors font-medium"
                style={{ borderRadius: '12px' }}
              />
              <button className="px-8 py-4 bg-[#E71D2B] text-white font-bold rounded-xl hover:bg-[#FF4D5A] transition-all duration-300"
                style={{ 
                  boxShadow: '0 4px 15px rgba(231, 29, 43, 0.3)',
                  borderRadius: '12px'
                }}
              >
                SUBSCRIBE
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;