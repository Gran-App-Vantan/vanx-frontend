import { useState, useEffect } from "react";
import { ReactionIndex, UseReactionsOptions } from "@/api/reaction";
import { ReactionData } from "@/api/reaction";

export const useReactions = () => {
  const [reactions, setReactions] = useState<ReactionData | null>(null);

  const fetchReactions = async (options: UseReactionsOptions) => {
    try {
      const response = await ReactionIndex({
        category: options.category,
        page: options.page
      });

      if (response.success && "reactions" in response) {
        setReactions(response.reactions);
        return response.reactions;
      } else {
        setReactions(null);
        console.error("取得に失敗しました", response.messages);
      }
    } catch (error) {
      setReactions(null);
      console.error("ERROR", error);
    }
  };

  useEffect(() => {
    fetchReactions({ category: "all", page: 1 });
  }, []);

  return {
    reactions,
    setReactions,
    fetchReactions,
  };
}