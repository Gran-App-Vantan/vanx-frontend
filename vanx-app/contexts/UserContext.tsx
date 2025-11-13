"use client";

import { createContext, useContext, useState, useEffect } from "react"
import { User } from "@/api/auth";
import { UserContextType } from "@/api/types";
import { VerifiedUserIndex } from "@/api/auth/verifiedUserIndex";

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  fetchUser: async () => null
});

export function UserProvider({ children }: { children: React.ReactNode}) {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      console.log("🔄 UserContext: ユーザー情報を取得中...");
      const response = await VerifiedUserIndex();

      if (response.success) {
        const userData = (response as any).data.user;
        console.log("✅ UserContext: ユーザー情報取得成功", {
          userId: userData.id,
          userName: userData.name,
          point: userData.point
        });
        setUser(userData);
        return userData; // ユーザー情報を返す
      } else {
        console.log("⚠️ UserContext: ユーザー情報取得失敗", response);
        setUser(null);
        return null;
      }
    } catch (error) {
      console.error("❌ UserContext: ユーザー情報取得エラー", error);
      setUser(null);
      return null;
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext);
}