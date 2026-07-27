'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar, FiSearch, FiShoppingCart, FiHeart, FiFilter, FiX } from 'react-icons/fi';
import Navbar from '@/src/components/Navbar';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    limit: 12,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState({});
  const [filters, setFilters] = useState({
    category: '',
    gender: '',
    frameType: '',
    search: '',
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const controls = useAnimation();
  const searchInputRef = useRef(null);

  const fetchProducts = async (page = 1, filterParams = {}) => {
    try {
      setLoading(true);
      controls.start({
        opacity: 0,
        transition: { duration: 0.3 },
      });

      const queryParams = new URLSearchParams({
        page,
        limit: pagination.limit,
        ...filterParams,
      }).toString();

      const response = await fetch(`/api/productcard?${queryParams}`);
      const data = await response.json();

      if (data.success) {
        setProducts(data.products);
        setPagination(data.pagination);
        setError(null);

        const initialIndices = {};
        data.products.forEach((product) => {
          initialIndices[product._id] = 0;
        });
        setActiveImageIndex(initialIndices);

        controls.start({
          opacity: 1,
          transition: { duration: 0.5 },
        });
      } else {
        setError(data.error || 'Failed to fetch products');
      }
    } catch (err) {
      setError('Failed to fetch products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1, filters);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchProducts(newPage, filters);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts(1, filters);
  };

  const handleClearFilters = () => {
    setFilters({
      category: '',
      gender: '',
      frameType: '',
      search: '',
    });
    fetchProducts(1, { category: '', gender: '', frameType: '', search: '' });
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
  };

  const handleNextImage = (productId) => {
    setActiveImageIndex((prev) => {
      const product = products.find((p) => p._id === productId);
      const currentIndex = prev[productId];
      const nextIndex = (currentIndex + 1) % product.images.length;
      return { ...prev, [productId]: nextIndex };
    });
  };

  const handlePrevImage = (productId) => {
    setActiveImageIndex((prev) => {
      const product = products.find((p) => p._id === productId);
      const currentIndex = prev[productId];
      const prevIndex = (currentIndex - 1 + product.images.length) % product.images.length;
      return { ...prev, [productId]: prevIndex };
    });
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    alert(`${product.name} added to cart`);
  };

  const handleAddToWishlist = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    alert(`${product.name} added to wishlist`);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        when: 'beforeChildren',
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const loadingSkeleton = Array.from({ length: pagination.limit }).map((_, index) => (
    <motion.div
      key={index}
      variants={item}
      className="bg-[#F5F5F5] rounded-2xl overflow-hidden"
      style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
    >
      <div className="relative h-72 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"></div>
      <div className="p-5 space-y-3">
        <div className="h-3 bg-gray-300 rounded-full w-1/4 animate-pulse"></div>
        <div className="h-5 bg-gray-300 rounded-full w-3/4 animate-pulse"></div>
        <div className="h-4 bg-gray-300 rounded-full w-1/2 animate-pulse"></div>
        <div className="flex justify-between items-center mt-4">
          <div className="h-6 bg-gray-300 rounded-full w-1/4 animate-pulse"></div>
          <div className="h-10 w-10 bg-gray-300 rounded-full animate-pulse"></div>
        </div>
      </div>
    </motion.div>
  ));

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-20" style={{ fontFamily: "'Poppins', sans-serif" }}>
        <div className="container mx-auto px-4 py-12">
          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="text-center mb-12"
          >
            <span className="text-[#E71D2B] font-bold text-sm tracking-widest uppercase">
              Shop The Latest
            </span>
            <h1 className="mt-4 text-5xl md:text-6xl font-black tracking-tighter text-[#111111]">
              STREET COLLECTION
            </h1>
            <p className="mt-4 text-lg text-[#666666] max-w-2xl mx-auto">
              From bold graphics to premium essentials. Find your style, own the street.
            </p>
          </motion.div>

          {/* Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="w-full flex items-center justify-between px-6 py-4 bg-[#111111] text-white font-bold rounded-xl"
                style={{ borderRadius: '12px' }}
              >
                <span className="flex items-center gap-2">
                  <FiFilter className="w-5 h-5" />
                  FILTERS
                </span>
                {mobileFiltersOpen ? <FiX className="w-5 h-5" /> : <FiChevronRight className="w-5 h-5" />}
              </button>
            </div>

            {/* Filter Form */}
            <div className={`${mobileFiltersOpen ? 'block' : 'hidden'} lg:block`}>
              <form 
                onSubmit={handleSearchSubmit} 
                className="bg-[#F5F5F5] rounded-2xl p-6 border border-[#E5E5E5]"
                style={{ borderRadius: '12px' }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-[#111111] mb-2 uppercase tracking-wider">
                      Category
                    </label>
                    <select
                      name="category"
                      value={filters.category}
                      onChange={handleFilterChange}
                      className="w-full px-4 py-3 bg-white border-2 border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#E71D2B] transition-colors font-medium text-[#111111]"
                      style={{ borderRadius: '12px' }}
                    >
                      <option value="">All Categories</option>
                      <option value="Pants">Pants</option>
                      <option value="Jeans">Jeans</option>
                      <option value="Shirts">Shirts</option>
                      <option value="Watches">Watches</option>
                      <option value="Jackets">Jackets</option>
                      <option value="Kurtis">Kurtis</option>
                      <option value="Sarees">Sarees</option>
                      <option value="Blouses">Blouses</option>
                      <option value="Dresses">Dresses</option>
                      <option value="Skirts">Skirts</option>
                      <option value="Tops">Tops</option>
                      <option value="T-shirts">T-shirts</option>
                      <option value="Shorts">Shorts</option>
                      <option value="Sweaters">Sweaters</option>
                      <option value="Hoodies">Hoodies</option>
                      <option value="Coats">Coats</option>
                      <option value="Blazers">Blazers</option>
                      <option value="Trousers">Trousers</option>
                      <option value="Leggings">Leggings</option>
                      <option value="Activewear">Activewear</option>
                      <option value="Swimwear">Swimwear</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#111111] mb-2 uppercase tracking-wider">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={filters.gender}
                      onChange={handleFilterChange}
                      className="w-full px-4 py-3 bg-white border-2 border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#E71D2B] transition-colors font-medium text-[#111111]"
                      style={{ borderRadius: '12px' }}
                    >
                      <option value="">All Genders</option>
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Unisex">Unisex</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#111111] mb-2 uppercase tracking-wider">
                      Fit
                    </label>
                    <select
                      name="frameType"
                      value={filters.frameType}
                      onChange={handleFilterChange}
                      className="w-full px-4 py-3 bg-white border-2 border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#E71D2B] transition-colors font-medium text-[#111111]"
                      style={{ borderRadius: '12px' }}
                    >
                      <option value="">All Fits</option>
                      <option value="Oversized">Oversized</option>
                      <option value="Slim Fit">Slim Fit</option>
                      <option value="Regular Fit">Regular Fit</option>
                      <option value="Relaxed Fit">Relaxed Fit</option>
                      <option value="Tailored">Tailored</option>
                    </select>
                  </div>
                  <div className="flex items-end gap-2">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full px-6 py-3 bg-[#E71D2B] text-white font-bold rounded-xl hover:bg-[#FF4D5A] transition-all duration-300 shadow-lg"
                      style={{ 
                        boxShadow: '0 4px 15px rgba(231, 29, 43, 0.3)',
                        borderRadius: '12px'
                      }}
                    >
                      APPLY FILTERS
                    </motion.button>
                  </div>
                </div>
              </form>
            </div>

            {/* Active Filters */}
            {(filters.category || filters.gender || filters.frameType || filters.search) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 flex flex-wrap items-center gap-2"
              >
                <span className="text-sm font-bold text-[#666666] uppercase tracking-wider">Active Filters:</span>
                {filters.category && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#111111] text-white text-sm rounded-full">
                    {filters.category}
                    <button onClick={() => setFilters(prev => ({ ...prev, category: '' }))} className="ml-1">
                      <FiX className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.gender && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#111111] text-white text-sm rounded-full">
                    {filters.gender}
                    <button onClick={() => setFilters(prev => ({ ...prev, gender: '' }))} className="ml-1">
                      <FiX className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.frameType && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#111111] text-white text-sm rounded-full">
                    {filters.frameType}
                    <button onClick={() => setFilters(prev => ({ ...prev, frameType: '' }))} className="ml-1">
                      <FiX className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <motion.button
                  onClick={handleClearFilters}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-sm font-bold text-[#E71D2B] hover:text-[#FF4D5A] underline ml-2"
                >
                  Clear All
                </motion.button>
              </motion.div>
            )}
          </motion.div>

          {/* Products Grid */}
          {error ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#F5F5F5] border-2 border-[#E71D2B] text-[#111111] px-6 py-8 rounded-2xl max-w-md mx-auto text-center"
              style={{ borderRadius: '12px' }}
            >
              <div className="text-4xl mb-4">⚠️</div>
              <p className="mb-4 font-bold text-lg">{error}</p>
              <button
                onClick={() => fetchProducts(pagination.currentPage, filters)}
                className="px-6 py-3 bg-[#E71D2B] text-white font-bold rounded-xl hover:bg-[#FF4D5A] transition-all duration-300"
                style={{ 
                  boxShadow: '0 4px 15px rgba(231, 29, 43, 0.3)',
                  borderRadius: '12px'
                }}
              >
                RETRY
              </button>
            </motion.div>
          ) : (
            <>
              <motion.div
                variants={container}
                initial="hidden"
                animate={loading ? 'hidden' : 'show'}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                <AnimatePresence mode="wait">
                  {loading ? (
                    loadingSkeleton
                  ) : (
                    products.map((product) => (
                      <motion.div
                        key={product._id}
                        variants={item}
                        layout
                        whileHover={{ y: -8 }}
                        className="group relative bg-[#F5F5F5] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
                        style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                      >
                        <Link href={`products/${product._id}`} className="block">
                          {/* Product Image Section */}
                          <div className="relative h-72 overflow-hidden bg-white">
                            {/* New Badge */}
                            <div className="absolute top-4 left-4 z-20">
                              <span className="px-3 py-1 bg-[#E71D2B] text-white text-xs font-bold rounded-full">
                                NEW
                              </span>
                            </div>

                            {product.images && product.images.length > 0 ? (
                              <>
                                <Image
                                  src={product.images[activeImageIndex[product._id]]?.url || '/placeholder-product.jpg'}
                                  alt={product.name}
                                  fill
                                  className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                  priority={products.indexOf(product) < 4}
                                />

                                {/* Quick Actions Overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                                  <motion.button
                                    onClick={(e) => handleAddToCart(e, product)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="bg-white text-[#111111] p-3 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                                    aria-label="Add to cart"
                                  >
                                    <FiShoppingCart className="w-5 h-5" />
                                  </motion.button>
                                  <motion.button
                                    onClick={(e) => handleAddToWishlist(e, product)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="bg-white text-[#111111] p-3 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75"
                                    aria-label="Add to wishlist"
                                  >
                                    <FiHeart className="w-5 h-5" />
                                  </motion.button>
                                </div>

                                {/* Image Navigation Dots */}
                                {product.images.length > 1 && (
                                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                                    {product.images.map((_, idx) => (
                                      <button
                                        key={idx}
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          setActiveImageIndex((prev) => ({
                                            ...prev,
                                            [product._id]: idx,
                                          }));
                                        }}
                                        className={`transition-all duration-300 rounded-full ${
                                          activeImageIndex[product._id] === idx 
                                            ? 'w-3 h-3 bg-[#E71D2B]' 
                                            : 'w-2 h-2 bg-white/70 hover:bg-white'
                                        }`}
                                        aria-label={`View image ${idx + 1}`}
                                      />
                                    ))}
                                  </div>
                                )}
                              </>
                            ) : (
                              <div className="w-full h-full bg-[#F5F5F5] flex items-center justify-center">
                                <span className="text-[#666666] font-medium">No Image</span>
                              </div>
                            )}

                            {/* Navigation Arrows */}
                            {product.images && product.images.length > 1 && (
                              <>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handlePrevImage(product._id);
                                  }}
                                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-[#111111] p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
                                  aria-label="Previous image"
                                >
                                  <FiChevronLeft className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleNextImage(product._id);
                                  }}
                                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-[#111111] p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
                                  aria-label="Next image"
                                >
                                  <FiChevronRight className="w-4 h-4" />
                                </button>
                              </>
                            )}
                          </div>

                          {/* Product Info Section */}
                          <div className="p-5">
                            <p className="text-[#E71D2B] text-xs font-bold tracking-wider uppercase mb-2">
                              {product.brand || 'STREETWEAR'}
                            </p>
                            <h2 className="text-lg font-bold text-[#111111] mb-2 leading-tight line-clamp-2 group-hover:text-[#E71D2B] transition-colors">
                              {product.name}
                            </h2>
                            
                            {/* Category Tags */}
                            <div className="flex flex-wrap gap-2 mb-3">
                              <span className="text-xs px-2.5 py-1 bg-[#111111] text-white rounded-full font-medium">
                                {product.category}
                              </span>
                              {product.frameType && (
                                <span className="text-xs px-2.5 py-1 bg-[#E5E5E5] text-[#666666] rounded-full font-medium">
                                  {product.frameType}
                                </span>
                              )}
                            </div>

                            {/* Rating */}
                            <div className="flex items-center mb-4">
                              <div className="flex items-center mr-2">
                                {[...Array(5)].map((_, i) => (
                                  <FiStar
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < Math.round(product.rating || 0) 
                                        ? 'text-[#E71D2B] fill-[#E71D2B]' 
                                        : 'text-[#E5E5E5]'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-[#666666] font-medium">
                                ({product.numReviews || 0})
                              </span>
                            </div>

                            {/* Price and Cart Button */}
                            <div className="flex justify-between items-center">
                              <p className="text-2xl font-black text-[#111111]">
                                ₹{product.price.toFixed(2)}
                              </p>
                              <motion.button
                                onClick={(e) => handleAddToCart(e, product)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-3 bg-[#111111] text-white rounded-full hover:bg-[#E71D2B] transition-all duration-300 shadow-lg"
                                style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }}
                                aria-label="Add to cart"
                              >
                                <FiShoppingCart className="w-5 h-5" />
                              </motion.button>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Empty State */}
              {!loading && products.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="text-6xl mb-6">🔍</div>
                  <h3 className="text-2xl font-black text-[#111111] mb-2">No Products Found</h3>
                  <p className="text-[#666666] mb-6">Try adjusting your filters to find what you're looking for.</p>
                  <button
                    onClick={handleClearFilters}
                    className="px-8 py-3 bg-[#E71D2B] text-white font-bold rounded-xl hover:bg-[#FF4D5A] transition-all duration-300"
                    style={{ 
                      boxShadow: '0 4px 15px rgba(231, 29, 43, 0.3)',
                      borderRadius: '12px'
                    }}
                  >
                    CLEAR FILTERS
                  </button>
                </motion.div>
              )}

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-16"
                >
                  <div className="text-sm font-medium text-[#666666]">
                    Showing {((pagination.currentPage - 1) * pagination.limit) + 1}-
                    {Math.min(pagination.currentPage * pagination.limit, pagination.totalProducts)} of{' '}
                    {pagination.totalProducts} products
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={pagination.currentPage === 1 || loading}
                      className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all ${
                        pagination.currentPage === 1 || loading
                          ? 'bg-[#F5F5F5] text-[#B0B0B0] cursor-not-allowed'
                          : 'bg-[#111111] text-white hover:bg-[#E71D2B] shadow-lg'
                      }`}
                      style={{ borderRadius: '12px' }}
                    >
                      <FiChevronLeft className="w-5 h-5" />
                      <span className="hidden sm:inline">Previous</span>
                    </button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                        let pageNum;
                        if (pagination.totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (pagination.currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (pagination.currentPage >= pagination.totalPages - 2) {
                          pageNum = pagination.totalPages - 4 + i;
                        } else {
                          pageNum = pagination.currentPage - 2 + i;
                        }

                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            disabled={loading}
                            className={`w-12 h-12 rounded-xl font-bold transition-all flex items-center justify-center ${
                              pagination.currentPage === pageNum
                                ? 'bg-[#E71D2B] text-white shadow-lg'
                                : 'bg-[#F5F5F5] text-[#111111] hover:bg-[#E5E5E5]'
                            }`}
                            style={{ borderRadius: '12px' }}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      {pagination.totalPages > 5 && pagination.currentPage < pagination.totalPages - 2 && (
                        <>
                          <span className="text-[#666666] px-2 font-bold">...</span>
                          <button
                            onClick={() => handlePageChange(pagination.totalPages)}
                            disabled={loading}
                            className="w-12 h-12 rounded-xl font-bold bg-[#F5F5F5] text-[#111111] hover:bg-[#E5E5E5] transition-all flex items-center justify-center"
                            style={{ borderRadius: '12px' }}
                          >
                            {pagination.totalPages}
                          </button>
                        </>
                      )}
                    </div>

                    <button
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={pagination.currentPage === pagination.totalPages || loading}
                      className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all ${
                        pagination.currentPage === pagination.totalPages || loading
                          ? 'bg-[#F5F5F5] text-[#B0B0B0] cursor-not-allowed'
                          : 'bg-[#111111] text-white hover:bg-[#E71D2B] shadow-lg'
                      }`}
                      style={{ borderRadius: '12px' }}
                    >
                      <span className="hidden sm:inline">Next</span>
                      <FiChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}