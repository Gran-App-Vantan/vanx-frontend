export type RankingItem = {
  id: number;
  name: string;
  userIcon: string;
  point: number;
};

export type RankingsData = {
  myAccount: RankingItem;
  users: RankingItem[];
}

export type RankingsPagenate = {
  currentPage: number;
  nextPageUrl: string | null;
  prevPageUrl: string | null;
  lastPage: number;
  perPage: number;
  total: number;
  from: number;
  to: number;
}