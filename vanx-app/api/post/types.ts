export type Post = {
  post: {
    id: number;
    userId: string;
    userName: string;
    imageSrc: string;
    contents: string;
    postReactions: Reaction[];
  }
}

export type Reaction = {
  id: number;
  category: "emoji" | "nature" | "food" | "activity" | "travel" | "symbols";
  reactionName: string;
  reactionImageSrc: string;
}

export type PreviewFile = {
  id: string;
  url: string;
  type: string;
}
