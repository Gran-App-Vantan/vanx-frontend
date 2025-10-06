export type Post = {
  id: number;
  userId: number;
  userName: string;
  imageSrc: string;
  postContent: string;
  files?: PostFile[];
  postReactions: PostReaction[];
};

export type PostReaction = {
  id: number;
  userId: number;
  postId: number;
  reactionId: number;
  reaction: Reaction;
};

export type Reaction = {
  id: number;
  category: "emoji" | "nature" | "food" | "activity" | "travel" | "symbols";
  reactionName: string;
  reactionImageSrc: string;
};

export type PreviewFile = {
  id: string;
  url: string;
  type: string;
  name?: string;
};

export type PostFile = {
  id: number;
  postId: number;
  postFilePath: string;
  postFileType: string;
  createdAt: string;
  updatedAt: string;
}