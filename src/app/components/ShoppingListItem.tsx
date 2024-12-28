interface ShoppingListItem { 
    listItem: ShoppingItem
    theme?: 'added' | 'deleted'
    handleClick: (item: ShoppingItem) => void
}

const ShoppingListItem: React.FC<ShoppingListItem> = ({ listItem, handleClick, theme = 'added' }) => {

    return (
        <li className="mb-2">
            <button className={`${theme === 'added' ? 'bg-indigo-500/25' : 'bg-indigo-800/25 text-indigo-300 border border-indigo-800'} rounded-md px-4 py-2 block cursor-pointer w-full text-left`} onClick={() => handleClick(listItem)}>
                {listItem.name}
            </button>
        </li>
    )
}

export default ShoppingListItem