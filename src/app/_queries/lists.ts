import { sql } from "@vercel/postgres";
import { getProductsForList } from "./products";


export default async function addList(name: string, owner: string) {
  const { rows } = await sql`
    INSERT INTO Lists (title, owner)
    VALUES (${name}, ${owner})
    RETURNING id
  `;

  if (rows.length === 0) {
    throw new Error('Failed to create list');
  }

  return rows[0].id;
}


export async function getLists(): Promise<Array<ListData | null>> {
    const { rows } = await sql`SELECT * FROM Lists`;
    if (rows.length === 0) {
      return [];
    }

    console.log(rows);
    return rows.map(row => {
      const {title, owner, id} = row;

      const listData: ListData = {
        id,
        title,
        owner,
      };
      return listData;
    })
  }

  export async function getListWithProducts(id: string): Promise<ListDataWithProducts | null> {
    const { rows } = await sql`SELECT id, title, owner FROM Lists WHERE id=${id}`;
    if (rows.length === 0) {
      return null;
    }
  
    const {title, owner} = rows[0];
  
    // Map the first row to the ListData type
    const listData: ListDataWithProducts = {
      id,
      title,
      owner,
      products: (await getProductsForList(id)),
    };
    return listData;
  }

  export async function updateList(productId : string, listId: string) {
    await sql`INSERT INTO list_products (product, list) VALUES (${productId}, ${listId});`;
  }