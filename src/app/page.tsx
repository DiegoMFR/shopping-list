

import List from "./(client-components)/list"
import { getList } from "./(queries)/lists";

export default async function Home() {

  const listData = await getList('Diego');

  return (
    <div className="grid grid-cols-6 items-center justify-items-center min-h-screen">
      <main className="flex flex-col col-span-4 gap-8 row-start-2 col-start-2 items-center sm:items-start w-full">
          <List listData={listData}/>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
