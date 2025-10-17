import { User } from "../auth";
import { Reaction } from "../reaction";

export type Post = {
  id: number;
  userId: number;
  user: User;
  imageSrc: string;
  postContent: string;
  postfile?: PostFile[];
  postReactions: PostReaction[];
};

export type PostReaction = {
  id: number;
  userId: number;
  postId: number;
  reactionId: number;
  reaction: Reaction;
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