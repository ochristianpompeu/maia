"use client";

import { UserProps } from "@/lib/interfaces";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { HoursProvider } from "./hooks/useHours";
import { OrgsProvider } from "./hooks/useOrgs";
import { ProfessionalsProvider } from "./hooks/useProfessionals";
import { ServicesProvider } from "./hooks/useServices";
import { UserProvider } from "./hooks/useUser";
import theme from "./theme";

interface Props {
  children: React.ReactNode;
}

const user: UserProps = {
  _id: "",
  email: "",
  name: "",
  user: "teste",
};

export function Providers({ children }: Props) {
  return (
    // <ErrorBoundary>
    <SessionProvider>
      <UserProvider>
        <OrgsProvider>
          <ServicesProvider>
            <ProfessionalsProvider>
              <HoursProvider>
                <CacheProvider>
                  <ChakraProvider theme={theme}>{children}</ChakraProvider>
                </CacheProvider>
              </HoursProvider>
            </ProfessionalsProvider>
          </ServicesProvider>
        </OrgsProvider>
      </UserProvider>
    </SessionProvider>
    // </ErrorBoundary>
  );
}
