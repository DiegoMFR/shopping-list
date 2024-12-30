type ListData = {
  title: string;
  id: string;
  owner: string;
};

type ListDataWithProducts = ListData & {
  products: Set<ShoppingItem | null>;
};

type ShoppingItem = {
  name: string;
  id?: string;
  icon: string;
};

type ListedProduct = {
  list: string;
  product: string;
};

type ShoppingList = Set<ShoppingItem>

interface User {
  id: string;
  email: string;
  // Add other properties as needed
}
