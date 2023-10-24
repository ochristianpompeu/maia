"use client";

import { Container, Stack } from "@chakra-ui/react";
import LoginSide from "./LoginSide";
import ImageSide from "./ImageSide";
import NavBar from "../../components/NavBar/NavBar";

export default function SplitScreen() {
  return (
    <Container maxW="full" p={0}>
      <NavBar />
      <Stack
        m={0}
        p={0}
        minH={"100vh"}
        direction={{ base: "column-reverse", md: "row" }}
        spacing={0}
      >
        <LoginSide />
        <ImageSide />
      </Stack>
    </Container>
  );
}
