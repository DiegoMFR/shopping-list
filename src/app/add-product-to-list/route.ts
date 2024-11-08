import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');
  const listId = searchParams.get('listId');
 
  try {
    if (!productId || !listId) throw new Error('Pet and owner names required');
    await sql`INSERT INTO list_products (product, list) VALUES (${productId}, ${listId});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  return NextResponse.json(null, { status: 200 });
}