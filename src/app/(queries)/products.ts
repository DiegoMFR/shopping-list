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
): Promise<Array<ShoppingItem | null>> {
  const { rows }: { rows: Array<ListedProduct> } =
    await sql`SELECT * FROM list_products WHERE list=${listId}`;

  let response: unknown[] | PromiseLike<(ShoppingItem | null)[]> = [];

  if (rows.length !== 0) {
    for(const row of rows) {
      const res = await getProductById(row.product);
      console.log('111', res);
      response = [...response, res];
    }
  }

  console.log("222", response);

  return response as (ShoppingItem | null)[];
}

export async function getProductById(
  productId: string
): Promise<ShoppingItem | null> {
  const { rows } =
    await sql`SELECT * FROM Products WHERE id=${productId} FETCH FIRST ROW ONLY;`;
  if (rows.length === 0) {
    return null;
  }
  // Map the first row to the ShoppingItem type
  const product: ShoppingItem = {
    id: rows[0].id,
    name: rows[0].name,
    icon: rows[0].icon,
  };
  return product;
}
