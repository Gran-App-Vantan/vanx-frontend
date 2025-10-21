export type RankingItem = {
  id: number;
  name: string;
  userIcon: string;
  points: number;
};

export type RankingsData = {
  myAccount: RankingItem;
  users: RankingItem[];
}