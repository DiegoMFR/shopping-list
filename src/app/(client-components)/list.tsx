'use client'

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Input from './input';
import { ListData, ShoppingItem, ShoppingList } from '../(queries)/products';

const List: React.FC<{listData: ListData}> = ({listData}) => {

  const [shoppingList, setShoppingList]: [ShoppingList, Dispatch<SetStateAction<ShoppingList>>] = useState<ShoppingList>([]);

useEffect(() => {
  if (listData.products?.length) {
    // Filter out null and duplicated values from the products array
    const validProducts = listData.products.filter((product): product is ShoppingItem => product !== null);
    setShoppingList(() => [...validProducts]);
  }
}, [listData.products]);


  const addToList = async (item: ShoppingItem) => {
    console.log('item', item);
    await fetch(`/add-product-to-list?productId=${item.id}&listId=${listData.id}`, {method: 'POST'})
    setShoppingList([...shoppingList, item]);
    
  };

  const handleCheckbox = async (event: React.ChangeEvent<HTMLInputElement>, item: ShoppingItem) => {
    const response = await fetch(`/remove-product-from-list?productId=${item.id}&listId=${listData.id}`, {method: 'DELETE'});
    const res = await response.json();
    setShoppingList([...res]);
    console.log(res);
  }

  return (
    <div className="w-full">
    <h1>{listData.title}</h1>
     <ul className="w-full p-0 m-0 place-content-center grow">
      {shoppingList.map((item: ShoppingItem) => (<li className="mb-2" key={item.id}>
        <label className="bg-indigo-500 rounded-md px-4 py-2 block cursor-pointer">
          <input className="mr-2" type="radio" name="item-radio" onChange={e => handleCheckbox(e, item)}></input>
          {item.name}
        </label>
      </li>))}
      <li>
        <Input handleSubmit={addToList} />
      </li>
    </ul>
    </div>
  );
};

export default List;
