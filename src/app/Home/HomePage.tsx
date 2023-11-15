"use client";

import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import { Container, Flex } from "@chakra-ui/react";
import HomeImageSide from "./HomeImageSide";
import HomeSignInForm from "./HomeSignInForm";

export default function HomePage() {
  return (
    <Container
      maxW={"full"}
      p={0}
      h={{
        base: "auto",
        md: "100vh",
      }}
    >
      <Flex 
        direction="column"
        w={"full"}
        // h={"full"}
        justifyContent="space-between"
      >
        <NavBar />
        <Flex
          h={{
            base: "auto",
            md: "full",
          }}
          // py={[0, 10, 20]}
          direction={{
            base: "column-reverse",
            md: "row",
          }}
        >
          <HomeSignInForm />
          <HomeImageSide />
        </Flex>
        <Footer />
      </Flex>
    </Container>
  );
}
