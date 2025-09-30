export type Post = {
  id: number;
  userId: number;
  userName: string;
  imageSrc: string;
  contents: string;
  files?: PreviewFile[];
  postReactions: Reaction[];
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

export type PostFiles = {
  id: number;
  postId: number;
  postFilePath: string;
  postFileType: string;
  createdAt: string;
  updatedAt: string;
}