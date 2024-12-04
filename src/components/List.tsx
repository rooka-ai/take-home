import { FC, useState } from "react";
import { ListItem } from "../api/getListData";
import { ExpandButton, DeleteButton, ReverseButton } from "./Buttons";
import { ChevronDownIcon, ChevronUpIcon } from "./icons";
import { useStore } from "../store";

type CardProps = {
  id: ListItem["id"];
  title?: ListItem["title"];
  description?: ListItem["description"];
  isDeletable?: boolean; 
  onRestore?: () => void; 
};

export const Card: FC<CardProps> = ({ id, title, description, isDeletable = false, onRestore }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  return (
    <div className="border border-gray-300 rounded-md shadow-md p-4 hover:shadow-lg transition-shadow duration-300 w-[400px]">
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>
        <div className="flex">
          {isDeletable && (<ExpandButton onClick={toggleExpand}>
            {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </ExpandButton>)}
          {isDeletable && <DeleteButton onClick={() => useStore.getState().deleteCard(id)} />}
          {!isDeletable && onRestore && <ReverseButton onClick={onRestore} />}
        </div>
      </div>
      {isExpanded && description && <p className="text-sm">{description}</p>}
    </div>
  );
};
