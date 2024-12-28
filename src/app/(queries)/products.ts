import { sql } from "@vercel/postgres";

export async function getProductsForList(
  listId: string
): Promise<ShoppingList> {
  const { rows } = await sql`SELECT * FROM list_products WHERE list=${listId}`;

  let response: ShoppingList = new Set();

  if (rows.length !== 0) {
    const products = await getProductsById(rows.map(row => row.product ?? null));
    if (products !== null) {
      response = new Set(products);
    }
  }

  return response;
}


export async function getProductsById(
  products: Array<string | null>
): Promise<ShoppingList | null> {
  
  const results = await Promise.all(products.map(product => sql`SELECT * FROM Products WHERE id=${product} FETCH FIRST ROW ONLY;`))

  if (results.length === 0) {
    return null;
  }
  const res = results.map( result => {
    return {
      id: result.rows[0].id,
      name: result.rows[0].name,
      icon: result.rows[0].icon,
    };
  })

  return new Set(res);
}

export async function getProducts(): Promise<ShoppingList> {
  const results = await sql`SELECT * FROM Products;`;

  console.log(results);

  const res = results.rows.map( result => ({
      id: result.id,
      name: result.name,
      icon: result.icon,
    }))
  
    return new Set(res);
}

export async function saveProduct(productName: string, productIcon: string) {
  if (!productName || !productIcon) throw new Error('Pet and owner names required');
  return sql`INSERT INTO Products (Name, Icon) VALUES (${productName}, ${productIcon}) RETURNING id;`;
}
