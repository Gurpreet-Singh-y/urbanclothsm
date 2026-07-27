import mongoose from 'mongoose';
import Product from "../../../models/lens"
import connectDB from "../../../lib/dbcollection"

export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '8');
    const skip = (page - 1) * limit;
    const category = searchParams.get('category');
    const gender = searchParams.get('gender');
    const frameType = searchParams.get('frameType');
    const search = searchParams.get('search');

    const query = {};
    if (category) query.category = category;
    if (gender) query.gender = gender;
    if (frameType) query.frameType = frameType;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const products = await Product.find(query)
      .skip(skip)
      .limit(limit)
      .select('name price images category brand rating')
      .lean();

    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);

    return new Response(JSON.stringify({
      success: true,
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        limit,
      },
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}