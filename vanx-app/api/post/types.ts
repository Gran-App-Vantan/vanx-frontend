import { User } from "../auth";
import { Reaction, ReactionStats } from "@/api/reaction";

export type Post = {
  id: number;
  userId: number;
  user: User;
  imageSrc: string;
  postContent: string;
  postfile?: PostFile[];
  postReactions: PostReaction[];
  reactionStats: ReactionStats;
};

export type PostData = {
  data: Post[];
  currentPage: number;
  lastPage: number;
  nextPageUrl: number | null;
  prevPageUrl: number | null;
  total: number;
  firstPageUrl: number | null;
  from: number;
  lastPageUrl: number | null;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  path: string;
  perPage: number;
  to: number;
}

export type PostReaction = {
  id: number;
  userId: number;
  postId: number;
  reactionId: number;
  reaction: Reaction & {
    reactionCount?: number;
  };
};

export type PreviewFile = {
  id: string;
  url: string;
  type: string;
  name?: string;
  base64Data?: string;
  file?: File;
};

export type UseFilePreviewOptions = {
  maxFiles?: number;
  maxFileSize?: number;
  acceptedTypes?: string[];
};

export type PostFile = {
  id: number;
  postId: number;
  postFilePath: string;
  postFileType: string;
  postFileUrl: string;
}