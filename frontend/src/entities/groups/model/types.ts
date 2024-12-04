export interface Group {
  id: number;
  name: string | null;
}

export interface GroupPage {
  start: number;
  count: number;
  groups: Group[];
}
