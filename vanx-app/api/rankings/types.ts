export type RankingItem = {
  id: number;
  name: string;
  userIcon: string;
  point: number;
};

export type PaginatedResponse<T> = {
  currentPage: number;
  data: T[];
  firstPageUrl: string;
  from: number | null;
  lastPage: number;
  lastPageUrl: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  nextPageUrl: string | null;
  path: string;
  perPage: number;
  prevPageUrl: string | null;
  to: number | null;
  total: number;
};

export type RankingsData = {
  myAccount: RankingItem;
  users: PaginatedResponse<RankingItem>;
};