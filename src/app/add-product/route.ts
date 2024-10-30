import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const productName = searchParams.get('productName');
  const productIcon = searchParams.get('productIcon');
 
  try {
    if (!productName || !productIcon) throw new Error('Pet and owner names required');
    await sql`INSERT INTO Products (Name, Icon) VALUES (${productName}, ${productIcon});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const products = await sql`SELECT * FROM Products;`;
  return NextResponse.json({ products }, { status: 200 });
}