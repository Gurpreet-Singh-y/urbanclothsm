'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar, FiSearch } from 'react-icons/fi';
import Navbar from '@/src/components/Navbar';

export default function ProductListingPage() {
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
    frameType: '',
    search: '',
  });
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
  }, [filters]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchProducts(newPage, filters);
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
      frameType: '',
      search: '',
    });
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: 'beforeChildren',
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
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
      className="border rounded-xl overflow-hidden shadow-sm bg-white/50 backdrop-blur-sm"
    >
      <div className="relative h-64 bg-gray-200 animate-pulse rounded-t-xl"></div>
      <div className="p-5 space-y-3">
        <div className="h-5 bg-gray-200 rounded-full w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
        <div className="h-3-4 bg-gray-200 rounded-full w-1/3"></div>
        <div className="flex justify-between mt-3">
          <div className="h-6 bg-gray-200 rounded-lg w-1/4"></div>
          <div className="h-6 bg-gray-200 rounded-lg w-1/3"></div>
        </div>
      </div>
    </motion.div>
  ));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-8 text-center text-white shadow-[0_18px_50px_-18px_rgba(15,23,42,0.65)]"
        >
          <span className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium tracking-wide text-slate-100">
            Premium Men’s Essentials
          </span>
          <h1 className="mb-3 text-4xl font-semibold sm:text-5xl">Discover Our Collection</h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-300">
            Explore refined shirts, tailored pants, premium watches, and standout outerwear crafted for modern style.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-[0_12px_35px_-16px_rgba(15,23,42,0.25)] backdrop-blur"
        >
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 gap-4 lg:grid-cols-[1.1fr_1fr_1.6fr]">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Category</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
              >
                <option value="">All Categories</option>
                <option value="Pants">Pants</option>
                <option value="Jeans">Jeans</option>
                <option value="Shirts">Shirts</option>
                <option value="Watches">Watches</option>
                <option value="Jackets">Jackets</option>
                <option value="T-shirts">T-shirts</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Fit</label>
              <select
                name="frameType"
                value={filters.frameType}
                onChange={handleFilterChange}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
              >
                <option value="">All Fits</option>
                <option value="Slim Fit">Slim Fit</option>
                <option value="Regular Fit">Regular Fit</option>
                <option value="Relaxed Fit">Relaxed Fit</option>
                <option value="Tailored">Tailored</option>
              </select>
            </div>
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium text-slate-700">Search</label>
                <div className="relative">
                  <input
                    type="text"
                    name="search"
                    ref={searchInputRef}
                    value={filters.search}
                    onChange={handleFilterChange}
                    placeholder="Search by name or brand..."
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-4 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                  />
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-xl bg-blue-600 px-4 py-2.5 font-medium text-white shadow-sm transition hover:bg-blue-700"
              >
                Apply
              </motion.button>
            </div>
          </form>
          {(filters.category || filters.frameType || filters.search) && (
            <motion.button
              onClick={handleClearFilters}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 text-sm font-medium text-blue-600 underline decoration-blue-200 underline-offset-4 hover:text-blue-700"
            >
              Clear Filters
            </motion.button>
          )}
        </motion.div>

        {error ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-100 border border-red-300 text-red-700 px-4 py-4 rounded-lg text-center max-w-md mx-auto"
          >
            <p className="mb-3">{error}</p>
            <button
              onClick={() => fetchProducts(pagination.currentPage, filters)}
              className="mt-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md text-sm"
            >
              Retry
            </button>
          </motion.div>
        ) : (
          <>
            <motion.div
              variants={container}
              initial="hidden"
              animate={loading ? 'hidden' : 'visible'}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              <AnimatePresence>
                {loading ? (
                  loadingSkeleton
                ) : (
                  products.map((product) => (
                    <motion.div
                      key={product._id}
                      variants={item}
                      whileHover={{ y: -6, scale: 1.01 }}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_35px_-16px_rgba(15,23,42,0.3)] transition-all duration-300"
                    >
                      <Link href={`/pages/products/${product._id}`}>
                        <div className="relative h-48 bg-slate-100">
                          {product.images && product.images.length > 0 ? (
                            <>
                              <Image
                                src={product.images[activeImageIndex[product._id]]?.url || '/placeholder-image.jpg'}
                                alt={product.name}
                                fill
                                className="object-cover transition duration-300 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 25vw"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
                              {product.images.length > 1 && (
                                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                                  {product.images.map((_, i) => (
                                    <button
                                      key={i}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setActiveImageIndex((prev) => ({
                                          ...prev,
                                          [product._id]: i,
                                        }));
                                      }}
                                      className={`h-2 w-2 rounded-full ${activeImageIndex[product._id] === i ? 'bg-white' : 'bg-white/55'}`}
                                    />
                                  ))}
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="flex h-full items-center justify-center bg-slate-100">
                              <span className="text-sm text-slate-500">No Image</span>
                            </div>
                          )}
                          {product.images.length > 1 && (
                            <>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  handlePrevImage(product._id);
                                }}
                                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-700 shadow-sm"
                              >
                                <FiChevronLeft />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleNextImage(product._id);
                                }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-700 shadow-sm"
                              >
                                <FiChevronRight />
                              </button>
                            </>
                          )}
                        </div>
                        <div className="p-5">
                          <div className="mb-3 flex items-start justify-between gap-3">
                            <div>
                              <h2 className="text-lg font-semibold text-slate-900">{product.name}</h2>
                              {product.brand && (
                                <p className="mt-1 text-sm text-slate-500">{product.brand}</p>
                              )}
                            </div>
                            <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600">
                              ₹{product.price.toFixed(2)}
                            </span>
                          </div>
                          <div className="mb-3 flex flex-wrap gap-2">
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">{product.category}</span>
                            {product.frameType && (
                              <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">{product.frameType}</span>
                            )}
                          </div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <FiStar
                                key={i}
                                className={`h-4 w-4 ${i < Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`}
                              />
                            ))}
                            <span className="ml-2 text-sm text-slate-500">
                              ({product.numReviews || 0} {product.numReviews === 1 ? 'review' : 'reviews'})
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-between items-center mt-12 gap-4"
            >
              <div className="text-sm text-gray-600">
                Showing {(pagination.currentPage - 1) * pagination.limit + 1}-
                {Math.min(pagination.currentPage * pagination.limit, pagination.totalProducts)} of
                {pagination.totalProducts} products
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1 || loading}
                  className={`px-4 py-2 rounded-md ${pagination.currentPage === 1 || loading ? 'bg-gray-200' : 'bg-blue-100 hover:bg-blue-200'}`}
                >
                  <FiChevronLeft />
                </button>
                {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
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
                      className={`px-4 py-2 rounded-md ${pagination.currentPage === pageNum ? 'bg-blue-500 text-white' : 'bg-blue-100 hover:bg-blue-200'}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                {pagination.totalPages > 5 && pagination.currentPage < pagination.totalPages - 2 && (
                  <>
                    <span className="px-2 text-gray-600">...</span>
                    <button
                      onClick={() => handlePageChange(pagination.totalPages)}
                      className="px-4 py-2 rounded-md bg-blue-100 hover:bg-blue-200"
                    >
                      {pagination.totalPages}
                    </button>
                  </>
                )}
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages || loading}
                  className={`px-4 py-2 rounded-md ${pagination.currentPage === pagination.totalPages || loading ? 'bg-gray-200' : 'bg-blue-100 hover:bg-blue-200'}`}
                >
                  <FiChevronRight />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};
