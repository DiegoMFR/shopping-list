import Link from "next/link";
import CreateListForm from "./createListForm";
import { getLists } from "../(queries)/lists";

const Dashboard: React.FC = async () => {

    await new Promise(resolve => setTimeout(resolve, 1000));
    const lists = await getLists();
    const gridClasses = ['bg-indigo-500/75', 'rounded-md']

    return (
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
    )
}

export default Dashboard;