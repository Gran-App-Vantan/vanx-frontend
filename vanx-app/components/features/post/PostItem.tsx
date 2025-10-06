import Image from "next/image";
import Link from "next/link";

import { ReactionAddButton } from "./ReactionAddButton";
import { Post } from "@/api/post/types";
import { DeleteIcon } from "@/components/shared/icons";

type PostItemProps = {
  post: Post;
  onDelete: () => void;
  onClick: () => void;
};

export function PostItem({ 
  post, 
  onDelete, 
  onClick 
}: PostItemProps) {
  return (
    <div className="flex flex-col gap-2 w-full min-w-screen border-b-[0.5px] border-b-text-gray py-4 px-6">
      <div className="flex gap-6">
        <Link href={`/profile/${post.userId}`}>
          {post.imageSrc ? (
            <Image 
              src={post.imageSrc} 
              alt="user-icon" 
              width={50} 
              height={50} 
            />
          ) : (
            <Image 
              src="/icons/default-user-icon.svg" 
              alt="user-icon" 
              width={50} 
              height={50} 
            />
          )}
        </Link>

        <div className="flex items-center gap-2">
          <h2 className="text-bold">{post.user.name}</h2>
        </div>

        <div className="justify-self-end ml-auto">
          <button className="cursor-pointer" onClick={onDelete}>
            <DeleteIcon />
          </button>
        </div>
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
                  className={`
                    ${file.postFileUrl.slice(-3) === "png" // png画像の時にborderをつけてみてるけど正直微妙
                      && "border-[0.5px] border-text-gray"
                    }
                    object-cover rounded-md
                  `}
                  unoptimized
                />
              </div>
            ) : null
          ))
        ) : null}
      </div>

      <div className="flex justify-end">
        <ReactionAddButton
          postReactions={post.postReactions || []}
          onClick={onClick}
        />
      </div>
    </div>
  );
}
