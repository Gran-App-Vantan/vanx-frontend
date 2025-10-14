import { useState, useEffect } from "react";
import { ReactionIndex, UseReactionsOptions } from "@/api/reaction";
import { Reaction } from "@/api/post/types";

export const useReactions = () => {
  const [reactions, setReactions] = useState<Reaction[]>([]);

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
        setReactions([]);
        console.error("取得に失敗しました", response.messages);
      }
    } catch (error) {
      setReactions([]);
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