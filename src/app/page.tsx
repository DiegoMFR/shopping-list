import Link from "next/link";
import { getLists } from "./(queries)/lists";
import CreateListForm from "./(client-components)/createListForm";


export default async function Home() {

  const lists = await getLists();

  const gridClasses = ['bg-indigo-500', 'rounded-md']

  return (
    <div className="col-start-2 col-span-4">
      <h1>
        Your grocery lists:

      </h1>

      <ul className="w-full grid grid-cols-6 auto-rows-max gap-4 items-stretch content-center">
        {lists.map(list =>
          <li key={list.id} className={gridClasses.join(' ')}>
           <Link href={`/lists/${list.id}`} className="p-4 centered block">
                <h2 className="text-lg">{list.title}</h2>
              </Link>
          </li>)}
        <li className={`${gridClasses.join(' ')} col-span-3`}>
          <CreateListForm></CreateListForm>
        </li>
      </ul>
    </div>
  );
}
