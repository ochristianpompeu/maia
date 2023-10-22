"use client";

import { Container, Flex } from "@chakra-ui/react";
import Details from "./Details";
import Cart from "./Cart";

export default function CheckoutScreen() {
  return (
    <Container maxW={"container.xl"} p={0}>
      <Flex h={"100vh"} py={20}>
        <Details />
        <Cart />
      </Flex>
    </Container>
  );
}
