"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { CldUploadWidget } from 'next-cloudinary';
import React from 'react';

export default function AddProduct() {
  const router = useRouter();
  const motionDivRef = React.useRef(null);
  const formRef = React.useRef(null);
  const isInView = useInView(motionDivRef, { once: false, amount: 0.1 });
  const [isDragging, setIsDragging] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: 'Shirts',
    brand: '',
    images: [],
    stock: 0,
    frameType: 'Regular Fit',
    gender: 'Men',
    color: '',
    material: '',
    reviews: [],
    numReviews: 0,
    rating: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeField, setActiveField] = useState(null);
  const [newReviewRating, setNewReviewRating] = useState(1);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const fieldFocus = {
    focus: {
      scale: 1.01,
      transition: { duration: 0.1 },
    },
  };

  const dropZone = {
    idle: { borderColor: '#E5E5E5', backgroundColor: '#F5F5F5' },
    dragging: { borderColor: '#E71D2B', backgroundColor: '#FFF5F5' },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleImageUpload = (result) => {
    if (result.event === 'success') {
      const { secure_url, public_id } = result.info;
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, { url: secure_url, publicId: public_id }],
      }));
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleAddReview = () => {
    if (newReviewRating >= 1 && newReviewRating <= 4) {
      setFormData((prev) => ({
        ...prev,
        reviews: [...prev.reviews, { rating: newReviewRating }],
        numReviews: prev.reviews.length + 1,
        rating: prev.reviews.length
          ? (
              (prev.rating * prev.reviews.length + newReviewRating) /
              (prev.reviews.length + 1)
            ).toFixed(1)
          : newReviewRating,
      }));
      setNewReviewRating(1);
    } else {
      setError('Review rating must be between 1 and 4');
    }
  };

  const handleRemoveReview = (index) => {
    setFormData((prev) => {
      const newReviews = prev.reviews.filter((_, i) => i !== index);
      const newNumReviews = newReviews.length;
      const newRating =
        newReviews.length > 0
          ? (
              newReviews.reduce((sum, review) => sum + review.rating, 0) /
              newReviews.length
            ).toFixed(1)
          : 0;
      return {
        ...prev,
        reviews: newReviews,
        numReviews: newNumReviews,
        rating: newRating,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'images' || key === 'reviews') {
          data.append(key, JSON.stringify(value));
        } else {
          data.append(key, value);
        }
      });

      const response = await fetch('/api/admin/addproduct', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add product');
      }

      setSuccess('Product added successfully!');
      setTimeout(() => router.push('/admin'), 2000);
    } catch (err) {
      setError(err.message || 'Failed to add product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8 pt-28" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #E71D2B 0px, #E71D2B 1px, transparent 1px, transparent 20px)'
        }} />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-10"
        >
          <span className="text-[#E71D2B] font-bold text-sm tracking-widest uppercase">
            Admin Panel
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-black tracking-tighter text-[#111111]">
            ADD NEW <span className="text-[#E71D2B]">PRODUCT</span>
          </h1>
          <p className="mt-4 text-[#666666] max-w-2xl mx-auto font-medium">
            Drop fresh gear into the collection. Fill out the details below.
          </p>
        </motion.div>

        {/* Status messages */}
        <AnimatePresence>
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 p-4 bg-[#FFF5F5] border-l-4 border-[#E71D2B] text-[#111111] rounded-xl font-medium"
              style={{ borderRadius: '12px' }}
            >
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-[#E71D2B] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            </motion.div>
          )}
          {success && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 p-4 bg-[#111111] border-l-4 border-[#E71D2B] text-white rounded-xl font-medium"
              style={{ borderRadius: '12px' }}
            >
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-[#E71D2B] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {success}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main form */}
        <motion.div
          ref={motionDivRef}
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="bg-[#F5F5F5] rounded-2xl overflow-hidden border border-[#E5E5E5]"
          style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
        >
          <form ref={formRef} onSubmit={handleSubmit} className="p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-6">
              {/* Product Name */}
              <motion.div
                variants={item}
                className="sm:col-span-6"
                onFocus={() => setActiveField('name')}
                onBlur={() => setActiveField(null)}
              >
                <label className="block text-sm font-bold text-[#111111] mb-2 uppercase tracking-wider">
                  Product Name *
                </label>
                <motion.input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  variants={fieldFocus}
                  animate={activeField === 'name' ? 'focus' : ''}
                  className="w-full px-4 py-3 bg-white border-2 border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#E71D2B] transition-all font-medium text-[#111111] placeholder-[#B0B0B0]"
                  style={{ borderRadius: '12px' }}
                  placeholder="Enter product name"
                  required
                />
              </motion.div>

              {/* Description */}
              <motion.div
                variants={item}
                className="sm:col-span-6"
                onFocus={() => setActiveField('description')}
                onBlur={() => setActiveField(null)}
              >
                <label className="block text-sm font-bold text-[#111111] mb-2 uppercase tracking-wider">
                  Description
                </label>
                <motion.textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  variants={fieldFocus}
                  animate={activeField === 'description' ? 'focus' : ''}
                  className="w-full px-4 py-3 bg-white border-2 border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#E71D2B] transition-all font-medium text-[#111111] placeholder-[#B0B0B0] resize-none"
                  style={{ borderRadius: '12px' }}
                  placeholder="Describe the product..."
                />
              </motion.div>

              {/* Price */}
              <motion.div
                variants={item}
                className="sm:col-span-2"
                onFocus={() => setActiveField('price')}
                onBlur={() => setActiveField(null)}
              >
                <label className="block text-sm font-bold text-[#111111] mb-2 uppercase tracking-wider">
                  Price (₹) *
                </label>
                <motion.div
                  variants={fieldFocus}
                  animate={activeField === 'price' ? 'focus' : ''}
                  className="relative"
                >
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-[#111111] font-bold">₹</span>
                  </div>
                  <input
                    type="number"
                    name="price"
                    min="0"
                    step="1"
                    value={formData.price}
                    onChange={handleNumberChange}
                    className="w-full pl-10 pr-4 py-3 bg-white border-2 border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#E71D2B] transition-all font-medium text-[#111111]"
                    style={{ borderRadius: '12px' }}
                    required
                  />
                </motion.div>
              </motion.div>

              {/* Stock */}
              <motion.div
                variants={item}
                className="sm:col-span-2"
                onFocus={() => setActiveField('stock')}
                onBlur={() => setActiveField(null)}
              >
                <label className="block text-sm font-bold text-[#111111] mb-2 uppercase tracking-wider">
                  Stock Qty
                </label>
                <motion.input
                  type="number"
                  name="stock"
                  min="0"
                  value={formData.stock}
                  onChange={handleNumberChange}
                  variants={fieldFocus}
                  animate={activeField === 'stock' ? 'focus' : ''}
                  className="w-full px-4 py-3 bg-white border-2 border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#E71D2B] transition-all font-medium text-[#111111]"
                  style={{ borderRadius: '12px' }}
                />
              </motion.div>

              {/* Category */}
              <motion.div
                variants={item}
                className="sm:col-span-2"
                onFocus={() => setActiveField('category')}
                onBlur={() => setActiveField(null)}
              >
                <label className="block text-sm font-bold text-[#111111] mb-2 uppercase tracking-wider">
                  Category *
                </label>
                <motion.select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  variants={fieldFocus}
                  animate={activeField === 'category' ? 'focus' : ''}
                  className="w-full px-4 py-3 bg-white border-2 border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#E71D2B] transition-all font-medium text-[#111111] appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMxMTExMTEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJtNiA5IDYgNiA2LTYiLz48L3N2Zz4=')] bg-no-repeat bg-[center_right_0.75rem]"
                  style={{ borderRadius: '12px' }}
                  required
                >
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
                </motion.select>
              </motion.div>

              {/* Brand */}
              <motion.div
                variants={item}
                className="sm:col-span-3"
                onFocus={() => setActiveField('brand')}
                onBlur={() => setActiveField(null)}
              >
                <label className="block text-sm font-bold text-[#111111] mb-2 uppercase tracking-wider">
                  Brand
                </label>
                <motion.input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  variants={fieldFocus}
                  animate={activeField === 'brand' ? 'focus' : ''}
                  className="w-full px-4 py-3 bg-white border-2 border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#E71D2B] transition-all font-medium text-[#111111] placeholder-[#B0B0B0]"
                  style={{ borderRadius: '12px' }}
                  placeholder="e.g., STREET CODE"
                />
              </motion.div>

              {/* Fit */}
              <motion.div
                variants={item}
                className="sm:col-span-3"
                onFocus={() => setActiveField('frameType')}
                onBlur={() => setActiveField(null)}
              >
                <label className="block text-sm font-bold text-[#111111] mb-2 uppercase tracking-wider">
                  Fit
                </label>
                <motion.select
                  name="frameType"
                  value={formData.frameType}
                  onChange={handleChange}
                  variants={fieldFocus}
                  animate={activeField === 'frameType' ? 'focus' : ''}
                  className="w-full px-4 py-3 bg-white border-2 border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#E71D2B] transition-all font-medium text-[#111111] appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMxMTExMTEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJtNiA5IDYgNiA2LTYiLz48L3N2Zz4=')] bg-no-repeat bg-[center_right_0.75rem]"
                  style={{ borderRadius: '12px' }}
                >
                  <option value="Oversized">Oversized</option>
                  <option value="Slim Fit">Slim Fit</option>
                  <option value="Regular Fit">Regular Fit</option>
                  <option value="Relaxed Fit">Relaxed Fit</option>
                  <option value="Tailored">Tailored</option>
                </motion.select>
              </motion.div>

              {/* Gender */}
              <motion.div
                variants={item}
                className="sm:col-span-2"
                onFocus={() => setActiveField('gender')}
                onBlur={() => setActiveField(null)}
              >
                <label className="block text-sm font-bold text-[#111111] mb-2 uppercase tracking-wider">
                  Gender
                </label>
                <motion.select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  variants={fieldFocus}
                  animate={activeField === 'gender' ? 'focus' : ''}
                  className="w-full px-4 py-3 bg-white border-2 border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#E71D2B] transition-all font-medium text-[#111111] appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMxMTExMTEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJtNiA5IDYgNiA2LTYiLz48L3N2Zz4=')] bg-no-repeat bg-[center_right_0.75rem]"
                  style={{ borderRadius: '12px' }}
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Unisex">Unisex</option>
                </motion.select>
              </motion.div>

              {/* Color */}
              <motion.div
                variants={item}
                className="sm:col-span-2"
                onFocus={() => setActiveField('color')}
                onBlur={() => setActiveField(null)}
              >
                <label className="block text-sm font-bold text-[#111111] mb-2 uppercase tracking-wider">
                  Color
                </label>
                <motion.input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  variants={fieldFocus}
                  animate={activeField === 'color' ? 'focus' : ''}
                  className="w-full px-4 py-3 bg-white border-2 border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#E71D2B] transition-all font-medium text-[#111111] placeholder-[#B0B0B0]"
                  style={{ borderRadius: '12px' }}
                  placeholder="e.g., Black/Red"
                />
              </motion.div>

              {/* Material */}
              <motion.div
                variants={item}
                className="sm:col-span-2"
                onFocus={() => setActiveField('material')}
                onBlur={() => setActiveField(null)}
              >
                <label className="block text-sm font-bold text-[#111111] mb-2 uppercase tracking-wider">
                  Material
                </label>
                <motion.input
                  type="text"
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  variants={fieldFocus}
                  animate={activeField === 'material' ? 'focus' : ''}
                  className="w-full px-4 py-3 bg-white border-2 border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#E71D2B] transition-all font-medium text-[#111111] placeholder-[#B0B0B0]"
                  style={{ borderRadius: '12px' }}
                  placeholder="e.g., 450GSM Cotton"
                />
              </motion.div>

              {/* Reviews */}
              <motion.div variants={item} className="sm:col-span-6">
                <label className="block text-sm font-bold text-[#111111] mb-2 uppercase tracking-wider">
                  Reviews
                </label>
                <div className="flex gap-3 mb-4">
                  <motion.select
                    value={newReviewRating}
                    onChange={(e) => setNewReviewRating(Number(e.target.value))}
                    variants={fieldFocus}
                    animate={activeField === 'reviewRating' ? 'focus' : ''}
                    className="w-32 px-4 py-3 bg-white border-2 border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#E71D2B] transition-all font-medium text-[#111111]"
                    style={{ borderRadius: '12px' }}
                    onFocus={() => setActiveField('reviewRating')}
                    onBlur={() => setActiveField(null)}
                  >
                    {[1, 2, 3, 4].map((rating) => (
                      <option key={rating} value={rating}>
                        {rating} Star{rating > 1 ? 's' : ''}
                      </option>
                    ))}
                  </motion.select>
                  <motion.button
                    type="button"
                    onClick={handleAddReview}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-5 py-3 rounded-xl text-sm font-bold text-white bg-[#111111] hover:bg-[#E71D2B] transition-all duration-300"
                    style={{ borderRadius: '12px' }}
                  >
                    ADD REVIEW
                  </motion.button>
                </div>
                {formData.reviews.length > 0 && (
                  <motion.div variants={item} className="mt-4">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-bold text-[#111111]">
                        Avg Rating: {formData.rating}
                      </span>
                      <span className="text-sm text-[#666666] font-medium">
                        ({formData.numReviews} {formData.numReviews === 1 ? 'Review' : 'Reviews'})
                      </span>
                    </div>
                    <div className="space-y-2">
                      {formData.reviews.map((review, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center justify-between bg-white p-3 rounded-xl border border-[#E5E5E5]"
                          style={{ borderRadius: '12px' }}
                        >
                          <span className="text-[#111111] font-medium">
                            {review.rating} Star{review.rating > 1 ? 's' : ''}
                          </span>
                          <motion.button
                            type="button"
                            onClick={() => handleRemoveReview(index)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-[#E71D2B] text-white rounded-full p-1.5 hover:bg-[#FF4D5A] transition-colors"
                          >
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </motion.button>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Image Upload */}
              <motion.div variants={item} className="sm:col-span-6">
                <label className="block text-sm font-bold text-[#111111] mb-2 uppercase tracking-wider">
                  Product Images
                </label>
                <CldUploadWidget
                  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                  options={{
                    multiple: true,
                    folder: 'products',
                    maxFiles: 5,
                    resourceType: 'image',
                    clientAllowedFormats: ['png', 'jpg', 'jpeg', 'gif', 'svg'],
                    maxFileSize: 10000000,
                  }}
                  onSuccess={handleImageUpload}
                  onDragEnter={() => setIsDragging(true)}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={() => setIsDragging(false)}
                >
                  {({ open }) => (
                    <motion.div
                      variants={dropZone}
                      animate={isDragging ? 'dragging' : 'idle'}
                      className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all"
                      style={{ borderRadius: '12px' }}
                      onClick={() => open()}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                        open();
                      }}
                    >
                      <div className="flex flex-col items-center justify-center gap-3">
                        <svg className="mx-auto h-12 w-12 text-[#666666]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <p className="text-sm text-[#111111] font-medium">
                            <span className="font-bold text-[#E71D2B] hover:text-[#FF4D5A]">
                              Click to upload
                            </span>{' '}
                            or drag and drop
                          </p>
                          <p className="text-xs text-[#666666] mt-1">
                            SVG, PNG, JPG, or GIF (max. 10MB, up to 5 images)
                          </p>
                          {isDragging && (
                            <p className="text-xs text-[#E71D2B] font-bold mt-1">
                              DROP IMAGES HERE
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </CldUploadWidget>
                {formData.images.length > 0 && (
                  <motion.div
                    variants={item}
                    className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3"
                  >
                    {formData.images.map((image, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="relative group"
                      >
                        <img
                          src={image.url}
                          alt={`Uploaded ${index + 1}`}
                          className="w-full h-28 object-cover rounded-xl border-2 border-[#E5E5E5]"
                          style={{ borderRadius: '12px' }}
                        />
                        <motion.button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="absolute top-2 right-2 bg-[#E71D2B] text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </motion.button>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Form actions */}
            <motion.div
              variants={item}
              className="mt-10 flex justify-end gap-3"
            >
              <motion.button
                type="button"
                onClick={() => router.push('/admin/products')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 rounded-xl text-sm font-bold text-[#111111] border-2 border-[#E5E5E5] bg-white hover:bg-[#F5F5F5] transition-all"
                style={{ borderRadius: '12px' }}
              >
                CANCEL
              </motion.button>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className={`px-6 py-3 rounded-xl text-sm font-bold text-white transition-all duration-300 ${
                  isSubmitting
                    ? 'bg-[#666666] cursor-not-allowed'
                    : 'bg-[#E71D2B] hover:bg-[#FF4D5A] shadow-xl'
                }`}
                style={{ 
                  boxShadow: isSubmitting ? 'none' : '0 4px 20px rgba(231, 29, 43, 0.3)',
                  borderRadius: '12px'
                }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    PROCESSING...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    ADD PRODUCT
                  </span>
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}