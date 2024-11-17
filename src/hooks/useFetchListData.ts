import { useEffect, useState } from "react";
import { ListItem, useGetListData } from "../api/getListData";

export const useFetchListData = () => {
  const [visibleCards, setVisibleCards] = useState<ListItem[]>([]);
  const { data: listQuery, isLoading } = useGetListData();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    setVisibleCards(listQuery?.filter((item) => item.isVisible) ?? []);
  }, [listQuery, isLoading]);

  return { visibleCards, isLoading };
};
