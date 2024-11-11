import { sql } from "@vercel/postgres";
import { getProductsForList, ListData } from "./products";

export async function getList(id: string): Promise<ListData> {
    const { rows } = await sql`SELECT id, title, owner FROM Lists WHERE id=${id}`;
    if (rows.length === 0) {
      throw new Error('No list found');
    }
  
    const {title, owner} = rows[0];
  
    // Map the first row to the ListData type
    const listData: ListData = {
      id,
      title,
      owner,
      products: (await getProductsForList(id)),
    };
    return listData;
  }