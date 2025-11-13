export type Reaction = {
  id: number;
  userId: number;
  reactionType: "emoji" | "nature" | "food" | "activity" | "travel" | "symbols";
  reactionName: string;
  reactionImage: string;
};

export type ReactionData = {
  data: Reaction[];
  currentPage: number;
  lastPage: number;
  nextPageUrl: string | null;
  prevPageUrl: string | null;
  total: number;
}

export type ReactionStats = {
  count: number;
  image: string;
  name: string;
}[]

export type UseReactionsOptions = {
  category: "all" | "face" | "nature" | "food" | "activity" | "travel" | "object" | "symbol" | "original";
  page: number;
}