import { Reaction } from "@/api/post/";

export type ReactionData = {
  data: Reaction[];
  currentPage: number;
  lastPage: number;
  nextPageUrl: string | null;
  prevPageUrl: string | null;
  total: number;
}

export type UseReactionsOptions = {
  category: "all" | "face" | "nature" | "food" | "activity" | "travel" | "object" | "symbol" | "original";
  page: number;
}