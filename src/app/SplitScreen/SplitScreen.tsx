"use client";

import { Container, Stack } from "@chakra-ui/react";
import NavBar from "../../components/NavBar/NavBar";
import ImageSide from "./ImageSide";
import LoginSide from "./LoginSide";
import Footer from "@/components/Footer/Footer";

export default function SplitScreen() {
  return (
    <Container minH="100vh" maxW="full" p={0} h={{ base: "auto", md: "100vh" }}>
      <NavBar />
      <Container p={0} maxW="full">
        <Stack
          m={0}
          p={0}
          maxH={"100vh"}
          direction={{ base: "column-reverse", md: "row" }}
          spacing={0}
        >
          <LoginSide />
          <ImageSide />
        </Stack>
      </Container>
      <Footer />
    </Container>
  );
}
