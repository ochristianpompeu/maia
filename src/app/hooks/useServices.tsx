/* eslint-disable react-hooks/exhaustive-deps */
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
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function fetchApi() {
      const res = await fetch(`/api/service/byUser/${user?._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setServices(data?.localServices);
    }
    session?.user && fetchApi();
  }, [user]);

  function updateServices() {
    async function fetchApi() {
      const res = await fetch(`/api/service/byUser/${user?._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setServices(data?.localServices);
    }
    session?.user && fetchApi();
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
