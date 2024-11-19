import { useStore } from "../store";

export const DeletedCards = () => {
  const { deletedCards, revertCard } = useStore((state) => ({
    deletedCards: state.deletedCards,
    revertCard: state.revertCard,
  }));

  return (
    <div>
      <h1 className="font-medium">Deleted Cards ({deletedCards.length})</h1>
      {deletedCards.map((card) => (
        <div key={card.id} className="border border-gray-500 p-2">
          <h1>{card.title}</h1>
          <button onClick={() => revertCard(card.id)} className="text-sm text-blue-500 underline">
            Revert
          </button>
        </div>
      ))}
    </div>
  );
};
