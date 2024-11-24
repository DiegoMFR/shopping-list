'use client'

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Input from './input';
import { ShoppingItem, ShoppingList } from '../(queries)/products';
import { ListDataWithProducts } from '../(queries)/lists';
import ShoppingListItem from './ShoppingListItem';

const List: React.FC<{ listData: ListDataWithProducts }> = ({ listData }) => {

  const [shoppingList, setShoppingList]: [ShoppingList, Dispatch<SetStateAction<ShoppingList>>] = useState<ShoppingList>(new Set());
  const [removedList, setRemovedList]: [ShoppingList, Dispatch<SetStateAction<ShoppingList>>] = useState<ShoppingList>(new Set());

  useEffect(() => {
    if (listData.products?.size) {
      // Filter out null and duplicated values from the products array
      const validProducts = Array.from(listData.products).filter((product): product is ShoppingItem => product !== null);
      setShoppingList(new Set(validProducts));
    }
  }, [listData.products]);


  const addToList = async (item: ShoppingItem) => {
    await fetch(`/add-product-to-list`, { method: 'POST', body: JSON.stringify({productId: item.id, listId: listData.id}) })
    setShoppingList(new Set([...Array.from(shoppingList), item]));
  };

  const handleListClick = async (item: ShoppingItem) => {
    const response = await fetch(`/remove-product-from-list?productId=${item.id}&listId=${listData.id}`, { method: 'DELETE' });
    const res: ShoppingItem[] = await response.json();
    setShoppingList(new Set(res));
    setRemovedList(new Set(removedList.add(item)));
  }
  
  const handleRemovedClick = async (item: ShoppingItem) => {
    await addToList(item);
    setRemovedList(prev => {
      prev.delete(item);
      return new Set(prev);
    });
  }

  return (
    <div className="w-full">
      <h1 className='p-2 text-indigo-300 text-xl'>{listData.title}</h1>
      {shoppingList.size === 0 && removedList.size > 0 && <h2 className='p-2'> All done! </h2>}
      <ul className="w-full p-0 m-0 place-content-center grow">
        {Array.from(shoppingList).map((item: ShoppingItem) => (<ShoppingListItem key={item.id} listItem={item} handleClick={handleListClick} />))}
        <li>
          <Input handleSubmit={addToList} />
        </li>
      </ul>
      <ul className="w-full p-0 m-0 place-content-center grow pt-2">
        {Array.from(removedList).map((item: ShoppingItem) => (<ShoppingListItem key={item.id} listItem={item} handleClick={handleRemovedClick} theme='deleted' />))}
      </ul>
    </div>
  );
};

export default List;
