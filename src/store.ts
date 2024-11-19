import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ListItem } from "./api/getListData";

type State = {
  expandedCards: number[];
  deletedCards: ListItem[];
  visibleCards: ListItem[];
  revealedDeleted: boolean;
};

type Actions = {
  toggleExpandCard: (id: number) => void;
  deleteCard: (card: ListItem) => void;
  revealDeletedCards: () => void;
  refreshCards: (cards: ListItem[]) => void;
  revertCard: (id: number) => void;
};

type Store = State & Actions;

export const useStore = create<Store>()(
  persist(
    (set) => ({
      expandedCards: [],
      deletedCards: [],
      visibleCards: [],
      revealedDeleted: false,

      toggleExpandCard: (id: number) => {
        set((state) => ({
          expandedCards: state.expandedCards.includes(id)
            ? state.expandedCards.filter((cardId) => cardId !== id)
            : [...state.expandedCards, id],
        }));
      },

      deleteCard: (card: ListItem) => {
        set((state) => ({
          visibleCards: state.visibleCards.filter((item) => item.id !== card.id),
          deletedCards: [...state.deletedCards, card],
        }));
      },

      revealDeletedCards: () => {
        set(() => ({
          revealedDeleted: true,
        }));
      },

      refreshCards: (cards: ListItem[]) => {
        set((state) => {
          const updatedVisibleCards = cards.filter(
            (card) => !state.deletedCards.some((deletedCard) => deletedCard.id === card.id)
          );

          const updatedExpandedCards = state.expandedCards.filter((id) =>
            updatedVisibleCards.some((card) => card.id === id)
          );

          return {
            visibleCards: updatedVisibleCards,
            expandedCards: updatedExpandedCards,
            revealedDeleted: false,
          };
        });
      },

      revertCard: (id: number) =>
        set((state) => {
          const revertedCard = state.deletedCards.find((card) => card.id === id);
          if (!revertedCard) return state;

          return {
            visibleCards: [...state.visibleCards, revertedCard],
            deletedCards: state.deletedCards.filter((card) => card.id !== id),
          };
        }),
    }),
    {
      name: "card-storage",
    }
  )
);
