'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { ShoppingItem, ShoppingList } from "../(queries)/products";
import { addEmoji, getSuggestions } from "../(queries)/ai-actions";
import { readStreamableValue } from 'ai/rsc';

export default function Input({ handleSubmit }: { handleSubmit: (item: ShoppingItem) => void }) {


    const [items, setItems] = useState<ShoppingList>(new Set());
    const [aiSuggestions, setAiSuggestions] = useState<Array<string>>([]);
    const [inputVal, setInputVal] = useState('');
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        try {
            const response = await fetch('/list-products');
            const {products} = await response.json();
            setItems(products);  
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const addToList = async (itemName: string): Promise<ShoppingItem> => {
        const foundItem = Array.from(items)?.find(item => item.name === itemName);
        let itemId = foundItem?.id ?? '';
        if (!foundItem) {
            const response = await fetch(`/add-product?productName=${itemName}&productIcon=noIcon`, { method: 'POST' });
            const { id } = await response.json();
            itemId = id;
        }

        const newItem: ShoppingItem = {
            name: foundItem?.name ?? itemName,
            icon: foundItem?.icon ?? '',
            id: itemId,
        };

        setItems(prevItems => new Set([...Array.from(prevItems), newItem]));

        return newItem;
    }

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        const withEmoji = await addEmoji(inputVal);
        handleSubmit(await addToList(withEmoji));
        setInputVal('');
        setAiSuggestions([]);
    }

    const filterList = async (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setInputVal(value);
        if(value.length > 3 && !isLoadingSuggestions) {
            setIsLoadingSuggestions(true);
            const { object } = await getSuggestions(e.target.value);

            for await (const partialObject of readStreamableValue(object)) {
                if (partialObject) {
                    setAiSuggestions(partialObject);
                    setIsLoadingSuggestions(false);
                }
              }

        }
    }

    const handleSuggestion = async (suggestion: string) => {
        handleSubmit(await addToList(suggestion));
        setInputVal('');
        setAiSuggestions([]);
    }

    return (
        <div className="w-full relative">
            <form onSubmit={submit} autoComplete="off" className="flex">
                <input type="text" name="itemName" className="bg-transparent border border-indigo-500 rounded-md p-2 grow mr-2 text-white"
                    value={inputVal}
                    onChange={filterList}
                    placeholder='Type an item here...'
                />
                <button type="submit" disabled={!inputVal} className="bg-indigo-500 disabled:bg-transparent disabled:border disabled:text-indigo-900 disabled:border-indigo-500 rounded-md px-4 py-2">Add</button>
            </form>
            {
                (aiSuggestions.length || isLoadingSuggestions) &&
                <ul className="p-2 rounded-md bg-indigo-900 mt-2 h-64 overflow-y-auto absolute left-0 right-0">
                    {aiSuggestions
                        .map((suggestion, index) => (<li key={index} className="mb-1">
                            <button
                                className="w-full text-left text-white p-2 border border-indigo-600 bg-transparent hover:bg-indigo-600 active:bg-indigo-700 rounded-md"
                                onClick={() => handleSuggestion(suggestion)}>
                                {suggestion}
                            </button>
                        </li>)
                        )
                    }
                    {isLoadingSuggestions && <li key="loadingMore">Loading...</li>}
                </ul>
            }
        </div>

    )
}