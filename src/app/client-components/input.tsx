'use client'

import { FormEvent, useEffect, useState } from "react"
import { ShoppingItem, ShoppingList } from "../page";

export default function Input({ handleSubmit }: { handleSubmit: (item: ShoppingItem) => void }) {

    const LS_SHOPPING_LIST = '**LsSHoppingList**'

    const storedItems: ShoppingList = JSON.parse(localStorage.getItem(LS_SHOPPING_LIST) || '[]')

    const [items, setItems] = useState(storedItems);

    const addToList = (itemName: string): ShoppingItem => {
        const foundItem = items.find(item => item.name === inputVal);
        const newItem = { name: itemName, id: itemName, icon: 'icon-lalal' };
        if (!foundItem) {
            setItems([...items, newItem]);
        }
        return newItem;
    }

    useEffect(() => {
        // this is watch in VUE
        localStorage.setItem(LS_SHOPPING_LIST, JSON.stringify(items));
    }, [items]);

    const [inputVal, setInputVal] = useState('');
    const [inputTemporary, setInputTemporary] = useState('')

    const submit = (e: FormEvent) => {
        e.preventDefault();
        handleSubmit(addToList(inputVal));
        setInputVal('');
    }

    const filterList = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setInputTemporary(e.currentTarget.value)
    }

    return (
        <div className="w-full relative">
            <form onSubmit={submit} className="flex">
                <input type="text" name="itemName" className="bg-transparent border border-indigo-500 rounded-md p-2 grow mr-2 text-white" 
                    value={inputVal} 
                    onChange={(e) => setInputVal(e.target.value)} 
                    onKeyUp={(e) => filterList(e)}/>
                <button type="submit" className="bg-indigo-500 rounded-md px-4 py-2">Add</button>
            </form>
            {
                inputTemporary && 
                <ul className="p-2 rounded-md bg-indigo-900 mt-2 h-64 overflow-y-auto absolute left-0 right-0">
                    {items
                        .filter(elem => elem.name.toLowerCase().match(inputTemporary.toLowerCase()))
                        .map(elem => (
                            <li className="mb-1" key={elem.id}>
                                <button 
                                className="w-full text-left text-white p-2 border border-indigo-600 bg-transparent hover:bg-indigo-600 active:bg-indigo-700 rounded-md" 
                                onClick={() => handleSubmit(elem)}>
                                    {elem.name}
                                </button>
                            </li>
                            )
                        )
                    }
                </ul>
            }
            
        </div>

    )
}