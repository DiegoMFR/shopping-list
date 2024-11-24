import { ShoppingItem } from "../(queries)/products"

const ShoppingListItem: React.FC<{ listItem: ShoppingItem, theme?: 'added' | 'deleted', handleClick: (item: ShoppingItem) => void }> = ({ listItem, handleClick, theme = 'added' }) => {

    return (
        <li className="mb-2">
            <button className={`${theme === 'added' ? 'bg-indigo-500' : 'bg-indigo-900 text-indigo-500'} rounded-md px-4 py-2 block cursor-pointer w-full text-left`} onClick={() => handleClick(listItem)}>
                {listItem.name}
            </button>
        </li>
    )
}

export default ShoppingListItem