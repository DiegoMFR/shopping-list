import { ShoppingItem, ShoppingList } from "../(queries)/products"
import ShoppingListItem from "./ShoppingListItem";

interface ShoppingListCompProps {
    list: ShoppingList;
    handleClick: (item: ShoppingItem) => void;
    theme?: 'added' | 'deleted';
}
  
  const ShoppingListComp: React.FC<ShoppingListCompProps> = ({ list, handleClick, theme = 'added' }) => {
    return (
      <ul className="w-full p-0 m-0 place-content-center grow">
        {Array.from(list).map((item: ShoppingItem) => (
          <ShoppingListItem key={item.id} listItem={item} handleClick={handleClick} theme={theme} />
        ))}
      </ul>
    );
  };
  
  export default ShoppingListComp;