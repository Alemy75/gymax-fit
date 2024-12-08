import { Group, GroupPage } from "./model";

export const getGroupsArray = (pages: GroupPage[]) => {
  return pages.reduce<Group[]>((a, v) => {
    a.push(...v.groups);

    return a;
  }, []);
};
