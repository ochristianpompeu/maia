/* eslint-disable react-hooks/exhaustive-deps */
import { useSession } from "next-auth/react";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserProviderProps {
  children: ReactNode;
}

interface UserContextData {
  _id: string;
  email: string;
  name: string;
  user: string;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export function UserProvider({ children }: UserProviderProps) {
  const { data: session } = useSession();
  const [user, setUser] = useState({} as any);
  useEffect(() => {
    fetch("/api/user/"+session?.user?.email, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [session]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  return context;
}
