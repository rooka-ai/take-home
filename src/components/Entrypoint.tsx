import { useEffect, useState } from "react";
import { useStore } from "../store";
import { useGetListData } from "../api/getListData";
import { Card } from "./List";
import { Spinner } from "./Spinner";
import { ToggleButton } from "./Buttons";

export const Entrypoint = () => {
  const {
    visibleCards,
    deletedCards,
    setVisibleCards,
    restoreCard,
  } = useStore();

  const listQuery = useGetListData();
  const [showDeleted, setShowDeleted] = useState(false);

  useEffect(() => {
    if (listQuery.isSuccess) {
      setVisibleCards(listQuery.data?.filter((item) => item.isVisible) ?? []);
    }
  }, [listQuery.isSuccess, listQuery.data, setVisibleCards]);

  if (listQuery.isLoading) {
    return <Spinner />;
  }

  if (listQuery.isError) {
    return <div>Error: {listQuery.error.message}</div>;
  }

  return (
    <div className="flex gap-x-16 h-screen">
      <div className="flex-1 max-w-md min-w-[400px]">
      <h1 className="mb-5 font-medium text-lg">
          My Awesome List ({visibleCards.length})
        </h1>
        <div className="flex flex-col gap-y-3 animate-fade-in">
          {visibleCards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
              isDeletable 
            />
          ))}
        </div>
      </div>

      <div className="flex-1 max-w-md min-w-[400px]">
      <div className="flex items-center justify-between">
        <h1 className="mb-5 font-medium text-lg">
          Deleted Cards ({deletedCards.length})
        </h1>
        <div className="mb-5 flex gap-x-2">
        <ToggleButton
            className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
            isToggled={showDeleted}
            onToggle={() => setShowDeleted((prev) => !prev)}/>
            
          <button className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
            disabled={listQuery.isFetching}
            onClick={() => {
            listQuery.refetch();
          }}
          > 
          Refresh
          </button>
        </div>
       </div>
        {showDeleted && (
          <div className="flex flex-col gap-y-3">
          {deletedCards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              onRestore={() => restoreCard(card.id)} 
            />
          ))}
        </div>
      )}
      </div>
    </div>
  );
};
