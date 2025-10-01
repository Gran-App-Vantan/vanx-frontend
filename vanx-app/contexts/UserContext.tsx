"use client";

import { createContext, useContext, useState, useEffect } from "react"
import { User } from "@/api/auth";
import { UserContextType } from "@/api/types";
import { VerifiedUserIndex } from "@/api/auth/verifiedUserIndex";

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  fetchUser: async () => {}
});

export function UserProvider({ children }: { children: React.ReactNode}) {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const response = await VerifiedUserIndex();

      if (response.success) {
        setUser((response as any).user);
      }
    } catch {
      setUser(null);
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