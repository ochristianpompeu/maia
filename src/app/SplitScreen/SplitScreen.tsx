"use client";

import { Container, Stack } from "@chakra-ui/react";
import NavBar from "../../components/NavBar/NavBar";
import ImageSide from "./ImageSide";
import LoginSide from "./LoginSide";

export default function SplitScreen() {
  return (
    <Container maxW="full" p={0}>
      <NavBar />
      <Container p={0} maxW="full">
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
    </Container>
  );
}
