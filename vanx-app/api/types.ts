import { User } from "./auth"

export type UserContext = {
  user: User;
  setUser: (user: User) => void;
  fetchUser: () => Promise<void>;
}