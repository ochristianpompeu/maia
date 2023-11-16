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
}

const OrgsContext = createContext<OrgsContextData>({} as OrgsContextData);

export function OrgsProvider({ children }: OrgProviderProps) {
  const { data: session } = useSession();
  const [orgs, setOrgs] = useState([{}] as any);
  const user = useUser();
  useEffect(() => {
    fetch(`/api/organization/byUser/${user._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setOrgs(data));
  }, [session]);

  return <OrgsContext.Provider value={orgs}>{children}</OrgsContext.Provider>;
}

export function useOrgs() {
  const context = useContext(OrgsContext);
  return context;
}
