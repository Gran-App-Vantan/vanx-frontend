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