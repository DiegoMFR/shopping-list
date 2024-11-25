import Link from "next/link";
import { getLists } from "./(queries)/lists";
import CreateListForm from "./(client-components)/createListForm";


export default async function Home() {

  const lists = await getLists();

  const gridClasses = ['bg-indigo-500/75', 'rounded-md']

  return (
    <div className="col-span-8 md:col-start-2 md:col-span-6">
      <h1 className="text-2xl p-2 pb-4 text-indigo-300">
        Your lists:

      </h1>

      <ul className="w-full grid grid-cols-8 auto-rows-max gap-4 items-stretch content-center">
        {lists.map(list =>
           list !== null && <li key={list.id} className={`${gridClasses.join(' ')} col-span-2`}>
            <Link href={`/lists/${list.id}`} className="p-4 centered block">
              <h2 className="text-lg">{list.title}</h2>
            </Link>
          </li>)}
        <li className={`${gridClasses.join(' ')} col-span-6`}>
          <CreateListForm/>
        </li>
      </ul>
    </div>
  );
}
