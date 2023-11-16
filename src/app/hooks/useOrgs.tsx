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
      if (user === undefined) {
        const res = await fetch(
          `/api/organization/byUser/6543f7feb31c7cbd35d04ab4`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        console.log("data: ", data);
        setOrgs(data?.orgs);
      }

      if (user) {
        try {
          const res = await fetch(
            `/api/organization/byUser/${user?._id as string}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await res.json();
          console.log("data: ", data);
          setOrgs(data?.orgs);
        } catch (error) {
          return;
        }
      }
    }
    try {
      fetchApi();
    } catch (error) {
      console.log("Error ao realizar fetch:", error);
    }
  }, [user]);

  function updateOrgs() {
    fetch(`/api/organization/byUser/${user?._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setOrgs(data?.orgs));
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
