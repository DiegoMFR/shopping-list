'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { addEmoji, getSuggestions } from "../(queries)/ai-actions";
import { readStreamableValue } from 'ai/rsc';

interface InputProps {
    handleSubmit: (item: ShoppingItem) => void;
    topics: string[];
}

const Input: React.FC<InputProps> = ({ handleSubmit, topics = ['general'] }) => {


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
        if(value.length > 2 && !isLoadingSuggestions) {
            setIsLoadingSuggestions(true);
            const { object } = await getSuggestions(e.target.value, topics);

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
                <input type="text" name="itemName" className="bg-transparent border border-indigo-500 rounded-md p-2 grow mr-2 text-indigo-100"
                    value={inputVal}
                    onChange={filterList}
                    placeholder='Type an item here...'
                />
                <button type="submit" disabled={!inputVal} className="bg-indigo-500 text-indigo-100 disabled:bg-transparent disabled:border disabled:border-dashed disabled:text-indigo-500 disabled:border-indigo-500 disabled:bg-indigo-500/25 rounded-md px-4 py-2">Add</button>
            </form>
            {
                (aiSuggestions.length || isLoadingSuggestions) &&
                <ul className="p-2 rounded-md bg-purple-900 mt-2 h-64 overflow-y-auto absolute left-0 right-0">
                    {aiSuggestions
                        .map((suggestion, index) => (<li key={index} className="mb-1">
                            <button
                                className="w-full text-left text-indigo-100 p-2 bg-purple-800 hover:bg-purple-700 active:bg-indigo-700 rounded-md"
                                onClick={() => handleSuggestion(suggestion)}>
                                {suggestion}
                            </button>
                        </li>)
                        )
                    }
                    {isLoadingSuggestions && <li className="p-2" key="loadingMore">Loading...</li>}
                </ul>
            }
        </div>

    )
};

export default Input;