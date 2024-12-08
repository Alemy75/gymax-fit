import { type GroupPage } from "./types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getGroups } from "../api";
import { getGroupsArray } from "../lib";

export const keys = {
  root: () => ["root:groups"],
  groups: () => [...keys.root(), "groups"]
};

export const useGroups = ({ quantity }: { quantity: number }) => {
  const query = useInfiniteQuery<GroupPage, any, any, any, number>({
    queryKey: keys.groups(),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.count > getGroupsArray(pages).length
        ? lastPage.start + quantity
        : null;
    },
    queryFn: async ({ pageParam: start }) => {
      const end = start + quantity - 1;
      const { data, count } = await getGroups({ start, end });

      if (!count || !data) {
        throw new Error("[groups]: no neccessary response");
      }

      return { count, start, groups: data };
    }
  });

  const list = useMemo(() => {
    return query.data
      ? getGroupsArray(query.data.pages).map((item) => ({
          id: item.id,
          name: item.name ?? ""
        }))
      : [];
  }, [query.data]);

  return {
    ...query,
    list
  };
};
