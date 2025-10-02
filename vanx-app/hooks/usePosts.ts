import { useState, useEffect } from 'react';
import { Post, PostIndex } from '@/api/post/';

export const mapApiPostToPost = (apiPost: any): Post => {
  const userIcon = apiPost.user?.user_icon && apiPost.user.user_icon !== "default_icon.png"
    ? `/uploads/user_icons/${apiPost.user.user_icon}`
    : "/icons/default-user-icon.svg";
  
  const fileData = apiPost.postFiles || apiPost.postfile || apiPost.files || apiPost.post_files || apiPost.attachments || [];
  
  const files = fileData.map((file: any) => {
    // バックエンドから post_file_url が返される場合はそのまま使用
    // 返されない場合は post_file_path からフォールバック生成
    const fileUrl = file.post_file_url || 
      `${process.env.NEXT_PUBLIC_API_URL}/api/storage/${file.post_file_path || file.postFilePath || file.path}`;
    
    const filePath = file.post_file_path || file.postFilePath || file.path;
    
    return {
      id: file.id.toString(),
      url: fileUrl,
      type: file.post_file_type || file.postFileType || file.type || "image",
      name: filePath?.split('/').pop() || `file_${file.id}`
    };
  });

  const mappedPost = {
    id: apiPost.id,
    userId: apiPost.user_id,
    userName: apiPost.user?.name || "不明なユーザー",
    imageSrc: userIcon,
    contents: apiPost.post_content || "",
    files: files,
    postReactions: apiPost.post_reactions || []
  };
  
  return mappedPost;
};

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await PostIndex();

      if (response.success && "data" in response) {
        const apiData = response.data as any;
        let postsArray: any[] = [];
        
        if (Array.isArray(apiData.posts)) {
          postsArray = apiData.posts;
        } else if (apiData.posts && apiData.posts.data && Array.isArray(apiData.posts.data)) {
          postsArray = apiData.posts.data;
        } else {
          setPosts([]);
          return;
        }
        
        if (postsArray.length === 0) {
          //
          // TODO: 投稿が0件の場合の表示（どうしよう🤔）
          //
          setPosts([]);
          return;
        }
        
        const mappedPosts: Post[] = postsArray.map((post: any) => {
          return mapApiPostToPost(post);
        });
        setPosts(mappedPosts);
      } else {
        setError(response.message || "APIエラー");
        console.error("APIエラー:", response.message);
      }
    } catch (error) {
      setError("例外エラーが発生しました");
      console.error("例外エラー:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    setPosts,
    fetchPosts,
    loading,
    error,
    mapApiPostToPost
  };
};