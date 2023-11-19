/* eslint-disable react-hooks/exhaustive-deps */
import { useUser } from "@/app/hooks/useUser";
import { OrgProps } from "@/lib/interfaces";
import { useSession } from "next-auth/react";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface OrgProviderProps {
  children: ReactNode;
}

interface OrgsContextData {
  orgs: OrgProps[];
  updateOrgs: () => void;
}

const OrgsContext = createContext<OrgsContextData>({} as OrgsContextData);

export function OrgsProvider({ children }: OrgProviderProps) {
  const { data: session } = useSession();
  const { user } = useUser();
  const [orgs, setOrgs] = useState([]);

  useEffect(() => {
    async function fetchApi() {
      const res = await fetch(`/api/organization/byUser/${user?._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res?.json();
      setOrgs(data.orgs);
    }
    session?.user && fetchApi();
  }, [user]);

  function updateOrgs() {
    async function fetchApi() {
      const res = await fetch(`/api/organization/byUser/${user?._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res?.json();
      setOrgs(data.orgs);
    }

    session?.user && fetchApi();
  }

  return (
    <OrgsContext.Provider value={{ orgs, updateOrgs }}>
      {children}
    </OrgsContext.Provider>
  );
}

export function useOrgs() {
  const context = useContext(OrgsContext);
  return context;
}
