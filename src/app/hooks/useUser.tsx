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

export interface UserContextProps {
  _id: string;
  email: string;
  name: string;
  user: string;
}
interface UserContextData {
  user: UserContextProps;
  getUser: () => void;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export function UserProvider({ children }: UserProviderProps) {
  const { data: session } = useSession();
  const [user, setUser] = useState<UserContextProps>({} as UserContextProps);

  useEffect(() => {
    async function fetchApi() {
      const res = await fetch("/api/user/" + session?.user?.email, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setUser(data.user);
    }
    session?.user && fetchApi();
  }, [session]);

  async function getUser() {
    fetch("/api/user/" + session?.user?.email, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user));
    return user;
  }

  return (
    <UserContext.Provider value={{ user, getUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  return context;
}
