import List from "../../(client-components)/list";
import { getListWithProducts } from "../../(queries)/lists";


export default async function Page ({ params } : { params: Promise<{list: string}>}) {

    const listId = (await params).list
    const list = await getListWithProducts(listId);

return (
    <div className="flex flex-col col-span-8 md:col-span-6 gap-4 md:col-start-2 items-center md:items-start w-full">
        <List listData={list}/>
    </div>
)
}