'use client'

import { Dispatch, SetStateAction, useState } from "react";
import Input from "./(client-components)/input";

export type ShoppingItem = {
  name: string,
  id: string,
  icon: string,
}

export type ShoppingList = Array<ShoppingItem>


export default function Home() {

  const [shoppingList, addToShoppingList]: [ShoppingList, Dispatch<SetStateAction<ShoppingList>>] = useState<ShoppingList>([]);

  const addToList = (item : ShoppingItem) => {
    addToShoppingList([...shoppingList, item]);
  };
  
  
  return (
    <div className="grid grid-cols-6 items-center justify-items-center min-h-screen">
      <main className="flex flex-col col-span-4 gap-8 row-start-2 col-start-2 items-center sm:items-start w-full">

        <ul className="w-full p-0 m-0 place-content-center grow">
          {shoppingList.map((item) => {
            return (<li className="mb-2" key={item.id}>
              <label className="bg-indigo-500 rounded-md px-4 py-2 block cursor-pointer">
                <input className="mr-2" type="radio" name="item-radio"></input> 
                {item.name}
              </label>
            </li>)
          })}
        </ul>

        <Input handleSubmit={addToList} />

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
