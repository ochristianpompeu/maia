/* eslint-disable react-hooks/exhaustive-deps */
import { useOrgs } from "@/app/hooks/useOrgs";
import { useUser } from "@/app/hooks/useUser";
import { ServiceProps } from "@/lib/interfaces";
import { useSession } from "next-auth/react";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ServicesProviderProps {
  children: ReactNode;
}

interface ServicesContextData {
  services: ServiceProps[];
  updateServices: () => void;
}

const ServicesContext = createContext<ServicesContextData>(
  {} as ServicesContextData
);

export function ServicesProvider({ children }: ServicesProviderProps) {
  const { data: session } = useSession();
  const { user } = useUser();
  const { orgs } = useOrgs();
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function fetchApi() {
      if (user === undefined) {
        const res = await fetch(
          `/api/service/byUser/6543f7feb31c7cbd35d04ab4`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        setServices(data?.localServices);
      }
      if (orgs) {
        try {
          const res = await fetch(`/api/service/byUser/${user?._id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();
          setServices(data?.localServices);
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

  function updateServices() {
    async function fetchApi() {
      if (user === undefined) {
        const res = await fetch(
          `/api/service/byUser/6543f7feb31c7cbd35d04ab4`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        setServices(data?.localServices);
      }

      if (user) {
        try {
          const res = await fetch(`/api/service/byUser/${user?._id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();
          setServices(data?.localServices);
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
  }

  return (
    <ServicesContext.Provider value={{ services, updateServices }}>
      {children}
    </ServicesContext.Provider>
  );
}

export function useServices() {
  const context = useContext(ServicesContext);
  return context;
}
