import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { getProductsForList } from '../(queries)/products';
 
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');
  const listId = searchParams.get('listId');
 
  try {
    if (!productId || !listId) throw new Error('Pet and owner names required');
    await sql`DELETE FROM list_products WHERE product=${productId} AND list=${listId};`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 const products = await getProductsForList(listId);
  return NextResponse.json(Array.from(products), { status: 200 });
}