/* eslint-disable react-hooks/exhaustive-deps */
import { useUser } from "@/app/hooks/useUser";
import { HourProps } from "@/lib/interfaces";
import { useSession } from "next-auth/react";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useOrgs } from "./useOrgs";

interface ProfessionalsProviderProps {
  children: ReactNode;
}

interface HoursContextData {
  hours: HourProps[];
  updateHours: () => void;
}

const HoursContext = createContext<HoursContextData>({} as HoursContextData);

export function HoursProvider({ children }: ProfessionalsProviderProps) {
  const { data: session } = useSession();
  const { user } = useUser();
  const { orgs } = useOrgs();
  const [hours, setHours] = useState<HourProps[]>([]);

  useEffect(() => {
    async function fetchApi() {
      const res = await fetch(`/api/hour/byUser/${user?._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setHours(data?.hours);
    }
    session?.user && fetchApi();
  }, [user]);

  function updateHours() {
    async function fetchApi() {
      const res = await fetch(`/api/hour/byUser/${user?._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setHours(data?.hours);
    }
    session?.user && fetchApi();
  }

  return (
    <HoursContext.Provider value={{ hours, updateHours }}>
      {children}
    </HoursContext.Provider>
  );
}

export function useHours() {
  const context = useContext(HoursContext);
  return context;
}
