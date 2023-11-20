"use client";

import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import { applicationConfig } from "@/lib/config";
import { Container, Flex } from "@chakra-ui/react";
import ImageSide from "./ImageSide";
import SignInForm from "./SignInForm";

export default function SignIn() {
  return (
    <Container
      maxW="full"
      p={0}
      h={{
        base: "auto",
        md: "100vh",
      }}
    >
      <Flex direction="column" w="full" justifyContent="space-between">
        <NavBar />
        <Flex
          w="full"
          h={{
            base: "auto",
            md: applicationConfig.staticHeight,
          }}
          direction={{
            base: "column-reverse",
            md: "row",
          }}
        >
          <SignInForm />
          <ImageSide />
        </Flex>
        <Footer />
      </Flex>
    </Container>
  );
}
