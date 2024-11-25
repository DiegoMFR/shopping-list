import List from "../../(client-components)/list";
import { getListWithProducts } from "../../(queries)/lists";


export default async function Page({ params }: { params: Promise<{ list: string }> }) {

    const listId = (await params).list
    const list = await getListWithProducts(listId);

    return (
        <div className="flex flex-col col-span-8 md:col-span-6 gap-4 md:col-start-2 items-center md:items-start w-full">
            {
                list ? 
                <List listData={list} /> :
                <div className='w-full text-center text-indigo-500 border-indigo-500 bg-indigo-500/25 border border-dashed rounded p-2 mt-2'>
                    List not found
                </div>
            }
        </div>
    )
}