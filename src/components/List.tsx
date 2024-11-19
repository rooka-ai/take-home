import { FC } from "react";
import { ListItem } from "../api/getListData";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ChevronUpIcon, ChevronDownIcon } from "./icons";
import { useStore } from "../store";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type CardProps = {
  card: ListItem;
};

export const Card: FC<CardProps> = ({ card }) => {
  const { expandedCards, toggleExpandCard, deleteCard } = useStore();
  const isExpanded = expandedCards.includes(card.id);
  const isDeleted = card.description === "";

  const [listParent] = useAutoAnimate();

  return (
    <div className="border border-black px-2 py-1.5" ref={listParent}>
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{card.title}</h1>
        {!isDeleted && (
          <div className="flex">
            <ExpandButton onClick={() => toggleExpandCard(card.id)}>
              {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </ExpandButton>
            <DeleteButton onClick={() => deleteCard(card)} />
          </div>
        )}
      </div>
      {isExpanded && card.description && <p className="text-sm">{card.description}</p>}
    </div>
  );
};
