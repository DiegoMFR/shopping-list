import { NextResponse } from 'next/server';
import { saveProduct } from '../(queries)/products';
 
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const productName = searchParams.get('productName');
  const productIcon = searchParams.get('productIcon');
  let response;
 
  try {
    if (!productName || !productIcon) throw new Error('Pet and owner names required');
    response = await saveProduct(productName, productIcon);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  return NextResponse.json(response.rows[0], { status: 200 });
}