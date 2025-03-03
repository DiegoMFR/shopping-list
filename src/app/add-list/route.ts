import { NextResponse } from 'next/server';
import addList from '../_queries/lists';
 
export async function POST(request: Request) {
    const { searchParams } = new URL(request.url);
    const listName = searchParams.get('listName');
    const owner = searchParams.get('owner');
    let id;

  try {
    if (!listName || !owner)
      throw new Error("List name and owner are required");
    id = await addList(listName, owner);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  return NextResponse.json(id, { status: 200 });
}