import { NextResponse } from 'next/server';
import { updateList } from '../(queries)/lists';
 
export async function POST(request: Request) {
  const { productId, listId} = await request.json();
  console.log(productId, listId);
 
  try {
    if (!productId || !listId) throw new Error('Product id and List id are required');
    updateList(productId, listId);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  return NextResponse.json(null, { status: 200 });
}