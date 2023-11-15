"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import theme from "./theme";

interface Props {
  children: React.ReactNode;
}

export function Providers({ children }: Props) {
  return (
    // <ErrorBoundary>
      <SessionProvider>
        <CacheProvider>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </CacheProvider>
      </SessionProvider>
    // </ErrorBoundary>
  );
}
