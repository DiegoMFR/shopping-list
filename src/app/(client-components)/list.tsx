'use client'

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Input from './input';
import { ShoppingItem, ShoppingList } from '../(queries)/products';
import { ListDataWithProducts } from '../(queries)/lists';
import ShoppingListComp from './ShoppingList';

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
    await fetch(`/add-product-to-list`, { method: 'POST', body: JSON.stringify({ productId: item.id, listId: listData.id }) })
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
      <section>
        <h2 className='pt-4 p-2 text-indigo-100 text-l'>To buy:</h2>
        {shoppingList.size ?
          <ShoppingListComp list={shoppingList} handleClick={handleListClick} /> :
          <div className='text-center text-indigo-300 border-indigo-300 bg-indigo-300/25 border border-dashed rounded p-2 mb-2'>
            {removedList.size ? <> You've got everything!</> : <>Add some items below...</>}
          </div>
        }
        <Input handleSubmit={addToList} />
      </section>
      <section>
        <h2 className='pt-4 p-2 text-indigo-100 text-l'>In my basket:</h2>
        {removedList.size ?
          <ShoppingListComp list={removedList} handleClick={handleRemovedClick} theme='deleted' /> :
          <div className='text-center text-indigo-500 border-indigo-500 bg-indigo-500/25 border border-dashed rounded p-2 mt-2'>Nothing yet...</div>
        }
      </section>

    </div>
  );
};

export default List;
