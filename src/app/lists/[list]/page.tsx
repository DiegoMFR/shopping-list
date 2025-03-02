import List from "../../components/list";
import { getListWithProducts } from "../../(queries)/lists";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { readonly params: Promise<{ list: string }> }): Promise<Metadata> {
  const listId = (await params).list
  const list = await getListWithProducts(listId);
  return {
    title: list?.title || listId,
  }
}

export default async function Page({ params }: { readonly params: Promise<{ list: string }> }) {

  const listId = (await params).list
  const list = await getListWithProducts(listId);

  if (!list) {
    notFound();
  }

  return (
    <div className="flex flex-col col-span-8 md:col-span-6 gap-4 md:col-start-2 items-center md:items-start w-full">
      <List listData={list} />
    </div>
  )
}