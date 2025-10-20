import Image from "next/image";
import Link from "next/link";

import { ReactionButton, ReactionAddButton } from "@/components/features/reaction";
import { Post } from "@/api/post/types";
import { User } from "@/api/auth";
import { DeleteIcon } from "@/components/shared/icons";

type PostItemProps = {
  post: Post;
  user?: User | null;
  isOwnPost: boolean;
  isOwnReaction: boolean;
  onDelete: () => void;
  onOpen: () => void;
  toggleReaction: (reactionId: number) => void;
};

export function PostItem({ 
  post, 
  user,
  isOwnPost,
  isOwnReaction,
  onDelete, 
  onOpen,
  toggleReaction
}: PostItemProps) {
  const userName = post.user?.name || user?.name || "名無しのユーザー";
  const userIcon = post.user?.userIcon || user?.userIcon;

  console.log(post);
  console.log(post.reactionStats);

  return (
    <div className="flex flex-col gap-2 w-full min-w-screen border-b-[0.5px] border-b-text-gray py-4 px-6">
      <div className="flex gap-6">
        <Link href={`/profile/${post.userId}`} className="w-[50px] h-[50px] relative flex-shrink-0">
          {userIcon ? (
            <Image 
              src={userIcon} 
              alt="user-icon" 
              fill
              className="border-[0.5px] border-text-gray rounded-full object-cover"
            />
          ) : (
            <Image 
              src="/icons/default-user-icon.svg" 
              alt="user-icon" 
              fill
              className="object-cover rounded-full"
            />
          )}
        </Link>

        <div className="flex items-center gap-2">
          <h2 className="text-bold">{userName}</h2>
        </div>

        {isOwnPost && (
          <div className="justify-self-end ml-auto">
            <button className="cursor-pointer" onClick={onDelete}>
              <DeleteIcon />
            </button>
          </div>
        )}
      </div>

      <div>{post.postContent}</div>

      <div>
        {post.postfile && post.postfile.length > 0 ? (
          post.postfile.map((file) => (
            file.postFileUrl ? (
              <div key={file.id} className="my-2">
                <Image 
                  src={file.postFileUrl} 
                  alt={`post-image-${file.id}`} 
                  width={300} 
                  height={200} 
                  className="border-[0.5px] border-text-gray object-cover rounded-md"
                  unoptimized
                />
              </div>
            ) : null
          ))
        ) : null}
      </div>

      <div className="flex justify-start">
        <ul className="flex gap-2">
          {post.reactionStats.map((reaction, index) => {
            const matchedReaction = post.postReactions.find(
              pr => pr.reaction.reactionName === reaction.name
            );
            const reactionId = matchedReaction?.reactionId;
            
            return (
              <li key={`${post.id}-${reaction.name}-${index}`}>
                <ReactionButton
                  reaction={reaction}
                  isOwnReaction={isOwnReaction}
                  onAdd={() => reactionId && toggleReaction(reactionId)}
                />
              </li>
            );
          })}
          <li key={`${post.id}-add-reaction`}>
            <ReactionAddButton onOpen={() => onOpen()} />
          </li>
        </ul>
      </div>
    </div>
  );
}
