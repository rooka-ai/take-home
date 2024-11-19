import { useEffect, useState } from "react";
import { useGetListData } from "../api/getListData";
import { Card } from "./List";
import { Spinner } from "./Spinner";
import { useStore } from "../store";
import { ToggleButton } from "./Buttons";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const Entrypoint = () => {
  const listQuery = useGetListData();
  const { visibleCards, deletedCards, refreshCards, revealDeletedCards, revealedDeleted } = useStore();
  const [loading, setLoading] = useState(true);

  const [listParent] = useAutoAnimate();

  useEffect(() => {
    if (listQuery.isLoading) return;

    refreshCards(listQuery.data?.filter((item) => item.isVisible) ?? []);
    setLoading(false);
  }, [listQuery.data, listQuery.isLoading, refreshCards]);

  if (loading) return <Spinner />;

  return (
    <div className="flex gap-x-16">
      <div className="w-full max-w-xl">
        <div className="flex justify-between items-center">
          <h1 className="mb-1 font-medium text-lg">My Awesome List ({visibleCards.length})</h1>
          <ToggleButton onClick={() => listQuery.refetch()}>Refresh</ToggleButton>
        </div>
        <div className="flex flex-col gap-y-3" ref={listParent}>
          {visibleCards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </div>

      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">Deleted Cards ({deletedCards.length})</h1>
          <ToggleButton onClick={revealDeletedCards}>Reveal</ToggleButton>
        </div>
        {revealedDeleted && (
          <div className="flex flex-col gap-y-3" ref={listParent}>
            {deletedCards.map((card) => (
              <Card key={card.id} card={{ ...card, description: "" }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
