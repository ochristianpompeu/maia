"use client";

import { UserProps } from "@/lib/interfaces";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { UserContext } from "./contexts/userContext";
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
    <UserContext.Provider value={user}>
      <SessionProvider>
        <CacheProvider>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </CacheProvider>
      </SessionProvider>
    </UserContext.Provider>
    // </ErrorBoundary>
  );
}
