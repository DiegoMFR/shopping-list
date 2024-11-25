'use client'

import { addEmoji } from "../(queries)/ai-actions";

export default function CreateListForm() {


  const createList = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const listName = (event.target as HTMLFormElement).listName.value;
    const nameWitEmoji = await addEmoji(listName);
    await fetch(`/add-list?listName=${nameWitEmoji}&owner=Diego`, { method: 'POST' });
    window.location.reload(); // Refresh the page to see the new list
  }

  return (
    <form onSubmit={createList} className="grid grid-cols-4 gap-2 p-2">
      <input type="text" placeholder="Add a topic for your list" name="listName" required className="rounded bg-indigo-900/75 text-white bold p-2 col-span-3"/>
      <button type="submit" className="border rounded border-indigo-300">Create</button>
    </form>
  )
}