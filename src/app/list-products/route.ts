import { NextResponse } from 'next/server';
import { getProducts } from '../(queries)/products';
 
export async function GET() {
  const products = await getProducts();
  return NextResponse.json({ products }, { status: 200 });
}