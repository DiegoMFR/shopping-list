'use client'

import addList from "../(queries)/lists";

export default function CreateListForm () {


  const createList = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = (event.target as HTMLFormElement).title;
    await addList(title, 'Diego');
    window.location.reload(); // Refresh the page to see the new list
  }

    return (

       <form onSubmit={createList}>
       <input type="text" placeholder="New list title" name="title" required />
       <button type="submit">Create</button>
     </form>
    )
}