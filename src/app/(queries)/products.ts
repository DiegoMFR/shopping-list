import { sql } from "@vercel/postgres";

export type ShoppingItem = {
  name: string;
  id: string;
  icon: string;
};

export type ListData = {
  title: string;
  id: string;
  owner: string;
  products: Array<ShoppingItem | null>;
};

export type ListedProduct = {
  list: string;
  product: string;
};

export type ShoppingList = Array<ShoppingItem>;

export async function getProductsForList(
  listId: string
): Promise<(ShoppingItem | null)[]> {
  const { rows } = await sql`SELECT * FROM list_products WHERE list=${listId}`;

  let response: (ShoppingItem | null)[] = [];

  if (rows.length !== 0) {
    const products = await getProductsById(rows.map(row => row.product ?? null));
    if (products !== null) {
      response = products;
    }
  }

  return response;
}


export async function getProductsById(
  products: Array<string | null>
): Promise<ShoppingList | null> {
  
  const results = await Promise.all(products.map(product => sql`SELECT * FROM Products WHERE id=${product} FETCH FIRST ROW ONLY;`))
  
  console.log('333', results);

  if (results.length === 0) {
    return null;
  }
  return results.map( result => {
    return {
      id: result.rows[0].id,
      name: result.rows[0].name,
      icon: result.rows[0].icon,
    };
  })
}
