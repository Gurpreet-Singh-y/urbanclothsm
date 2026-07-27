import Product from '../../../../models/lens';
import dbConnect from '../../../../lib/dbcollection';

export async function GET(request, context) {
  const url = new URL(request.url);
  const fallbackId = url.pathname.split('/').filter(Boolean).pop();
  const rawId = context?.params?.id ?? fallbackId;
  const id = typeof rawId === 'string' ? rawId.trim() : '';

  if (!id || id === 'undefined' || id === 'null') {
    return new Response(JSON.stringify({
      success: false,
      error: 'Invalid product id',
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  await dbConnect();

  try {
    const product = await Product.findById(id);
    
    if (!product) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Product not found' 
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      product 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}