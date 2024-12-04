import { create } from "zustand";
import { ListItem } from "./api/getListData";

type State = {
    visibleCards: ListItem[],
    deletedCards: ListItem[],
};

type Actions = {
    setVisibleCards: (cards: ListItem[]) => void;
    deleteCard: (id: number) => void;
    restoreCard: (id: number) =>void;
};

export const useStore = create<State & Actions>((set) => ({
    visibleCards: [],
    deletedCards: [],
    setVisibleCards: (cards) => set(() => ({visibleCards: cards,})),

    deleteCard: (id) => set((state) => {const cardToDelete = state.visibleCards.find((card) => card.id === id);
    if (!cardToDelete) return {};
    return {
      visibleCards: state.visibleCards.filter((card) => card.id !== id),
      deletedCards: [...state.deletedCards, cardToDelete],
    };
  }),
  restoreCard: (id) =>
    set((state) => {
      const cardToRestore = state.deletedCards.find((card) => card.id === id);
      if (!cardToRestore) return {};
      return {
        deletedCards: state.deletedCards.filter((card) => card.id !== id),
        visibleCards: [...state.visibleCards, cardToRestore],
      };
    }),
}));
