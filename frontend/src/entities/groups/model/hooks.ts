import { type Group, type GroupPage } from "./types";
import { supabase } from "@/shared/api/supabase";
import { useInfiniteQuery } from "@tanstack/react-query";

export const keys = {
  root: () => ["root:groups"],
  groups: () => [...keys.root(), "groups"]
};

export const useGroups = ({ quantity }: { quantity: number }) =>
  useInfiniteQuery<GroupPage, any, any, any, number>({
    queryKey: keys.groups(),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) =>
      getNextPageParam(lastPage, pages, quantity),
    queryFn: ({ pageParam }) =>
      queryFn({ start: pageParam, quantity })
  });

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
