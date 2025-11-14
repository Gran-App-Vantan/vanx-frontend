"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";

export function useAuth() {
  const router = useRouter();
  const { user, fetchUser } = useUser();

  useEffect(() => {
    const checkAuth = async () => {
      // ユーザー情報がまだ取得されていない場合は取得を試みる
      if (user === null) {
        const userData = await fetchUser();
        
        // ユーザー情報が取得できなかった場合はログインページへリダイレクト
        if (!userData) {
          router.push("/auth/login");
        }
      }
    };

    checkAuth();
  }, [user, fetchUser, router]);

  return { user, isAuthenticated: user !== null, fetchUser };
}
