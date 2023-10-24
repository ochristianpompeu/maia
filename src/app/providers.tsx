"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import theme from "./theme";

interface Props {
  children: React.ReactNode;
  // session?: any;
}

// export function Providers({ children, session }: Props) {
export function Providers({ children }: Props) {
  return (
    // <SessionProvider session={session}>
    <SessionProvider>
      <CacheProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </CacheProvider>
    </SessionProvider>
  );
}
