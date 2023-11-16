/* eslint-disable react-hooks/exhaustive-deps */
import { useUser } from "@/app/hooks/useUser";
import { ProfessionalProps } from "@/lib/interfaces";
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
  const { user } = useUser();
  const [professionals, setProfessionals] = useState([]);

  useEffect(() => {
    async function fetchApi() {
      if (user === undefined) {
        const res = await fetch(
          `/api/professional/byUser/6543f7feb31c7cbd35d04ab4`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        setProfessionals(data?.localProfessionals);
      }
      if (user) {
        try {
          const res = await fetch(`/api/professional/byUser/${user?._id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();
          setProfessionals(data?.localProfessionals);
          console.log("useProfessionals: ", professionals)
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

  function updateProfessionals() {
    async function fetchApi() {
      if (user === undefined) {
        const res = await fetch(
          `/api/service/professional/6543f7feb31c7cbd35d04ab4`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        setProfessionals(data?.localProfessionals);
      }

      if (user) {
        try {
          const res = await fetch(`/api/professional/byUser/${user?._id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();
          setProfessionals(data?.localProfessionals);
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
