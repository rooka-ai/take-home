import { useEffect, useState } from "react";
import { ListItem, useGetListData } from "../api/getListData";
import { Card } from "./List";
import { Spinner } from "./Spinner";

export const Entrypoint = () => {
  const [visibleCards, setVisibleCards] = useState<ListItem[]>([]);
  const listQuery = useGetListData();

  // TOOD
  // const deletedCards: DeletedListItem[] = [];

  useEffect(() => {
    if (listQuery.isLoading) {
      return;
    }

    setVisibleCards(listQuery.data?.filter((item) => item.isVisible) ?? []);
  }, [listQuery.data, listQuery.isLoading]);

  if (listQuery.isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex gap-x-16">
      <div className="w-full max-w-xl">
        <h1 className="mb-1 font-medium text-lg">My Awesome List ({visibleCards.length})</h1>
        <div className="flex flex-col gap-y-3">
          {visibleCards.map((card) => (
            <Card key={card.id} title={card.title} description={card.description} />
          ))}
        </div>
      </div>
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">Deleted Cards (0)</h1>

          <div className="flex items-center justify-between gap-2">
          <button
            // disabled
            className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-gray-700 rounded px-3 py-1"
          >
            Reveal
          </button>         
           <button
            // disabled
            className="text-white text-sm transition-colors hover:bg-green-800 disabled:bg-green-800/75 bg-green-700 rounded px-3 py-1"
          >
            Refresh
          </button>
          </div>

        </div>
        <div className="flex flex-col gap-y-3">
          {/* {deletedCards.map((card) => (
            <Card key={card.id} card={card} />
          ))} */}
        </div>
      </div>
    </div>
  );
};
