/* eslint-disable react-hooks/exhaustive-deps */
import { useUser } from "@/app/hooks/useUser";
import { OrgProps } from "@/lib/interfaces";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface OrgProviderProps {
  children: ReactNode;
}

interface OrgsContextData {
  orgs: OrgProps[];
  updateOrgs: () => void;
}

const OrgsContext = createContext<OrgsContextData>({} as OrgsContextData);

export function OrgsProvider({ children }: OrgProviderProps) {
  const [orgs, setOrgs] = useState<OrgProps[]>([] as OrgProps[]);
  const { user } = useUser();

  useEffect(() => {
    fetch(`/api/organization/byUser/${user._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setOrgs(data.orgs));
      // .then((data) => console.log(data.orgs));
  }, []);

  function updateOrgs() {
    fetch(`/api/organization/byUser/${user._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setOrgs(data));
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
