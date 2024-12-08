import { type Group, type GroupPage } from "./types";
import { supabase } from "@/shared/api/supabase";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const keys = {
  root: () => ["root:groups"],
  groups: () => [...keys.root(), "groups"]
};

export const useGroups = ({ quantity }: { quantity: number }) => {
  const query = useInfiniteQuery<GroupPage, any, any, any, number>({
    queryKey: keys.groups(),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) =>
      getNextPageParam(lastPage, pages, quantity),
    queryFn: ({ pageParam }) =>
      queryFn({ start: pageParam, quantity })
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

export const getGroups = (options: { start: number; end: number }) =>
  supabase
    .from("muscle_group")
    .select("*", { count: "exact" })
    .range(options.start, options.end);

export const getGroupsArray = (pages: GroupPage[]) => {
  return pages.reduce<Group[]>((a, v) => {
    a.push(...v.groups);

    return a;
  }, []);
};

const getNextPageParam = (
  lastPage: GroupPage,
  pages: GroupPage[],
  quantity: number
) => {
  return lastPage.count > getGroupsArray(pages).length
    ? lastPage.start + quantity
    : null;
};

const queryFn = async ({
  start,
  quantity
}: {
  start: number;
  quantity: number;
}) => {
  const { data: groups, count } = await getGroups({
    start,
    end: start + quantity - 1
  });

  if (!count || !groups) {
    throw new Error("[groups]: no neccessary response");
  }

  return { count, start, groups };
};
