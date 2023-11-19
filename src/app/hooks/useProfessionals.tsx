/* eslint-disable react-hooks/exhaustive-deps */
import { useUser } from "@/app/hooks/useUser";
import { ProfessionalProps } from "@/lib/interfaces";
import { useSession } from "next-auth/react";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ProfessionalsProviderProps {
  children: ReactNode;
}

interface ProfessionalsContextData {
  professionals: ProfessionalProps[];
  updateProfessionals: () => void;
}

const ProfessionalsContext = createContext<ProfessionalsContextData>(
  {} as ProfessionalsContextData
);

export function ProfessionalsProvider({
  children,
}: ProfessionalsProviderProps) {
  const { data: session } = useSession();
  const { user } = useUser();
  const [professionals, setProfessionals] = useState<ProfessionalProps[]>([]);
  useEffect(() => {
    async function fetchApi() {
      const res = await fetch(`/api/professional/byUser/${user?._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setProfessionals(data?.localProfessionals);
    }
    session?.user && fetchApi();
  }, [user]);

  function updateProfessionals() {
    async function fetchApi() {
      const res = await fetch(`/api/professional/byUser/${user?._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setProfessionals(data?.localProfessionals);
    }
    session?.user && fetchApi();
  }

  return (
    <ProfessionalsContext.Provider
      value={{ professionals, updateProfessionals }}
    >
      {children}
    </ProfessionalsContext.Provider>
  );
}

export function useProfessionals() {
  const context = useContext(ProfessionalsContext);
  return context;
}
