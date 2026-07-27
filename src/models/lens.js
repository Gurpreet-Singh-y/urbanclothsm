import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ['Pants', 'Jeans', 'Shirts', 'Watches', 'Jackets', 'Kurtis', 'Sarees', 'Blouses', 'Dresses', 'Skirts', 'Tops', 'T-shirts', 'Shorts', 'Sweaters', 'Hoodies', 'Coats', 'Blazers', 'Trousers', 'Leggings', 'Activewear', 'Swimwear'],
    required: true,
  },
  brand: {
    type: String,
  },
  images: [
    {
      url: {
        type: String, 
        required: true,
      },
      publicId: {
        type: String, 
        required: true,
      },
    },
  ], 
  stock: {
    type: Number,
    default: 0,
  },
  frameType: {
    type: String,
    enum: ['Slim Fit', 'Regular Fit', 'Relaxed Fit', 'Tailored'],
  },
  gender: {
    type: String,
    enum: ['Men'],
  },
  color: {
    type: String,
  },
  material: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      rating: {
        type: Number,
        min: 1,
        max: 4,
        required: true,
      },
    },
  ],
  numReviews: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);