import { User } from "./auth"

export type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
};