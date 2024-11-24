import List from "../../(client-components)/list";
import { getListWithProducts } from "../../(queries)/lists";


export default async function Page ({ params } : { params: Promise<{list: string}>}) {

    const listId = (await params).list
    const list = await getListWithProducts(listId);

return (
    <div className="flex flex-col col-span-4 gap-8 col-start-2 col-start-2 items-center sm:items-start w-full">
        <List listData={list}/>
    </div>
)
}