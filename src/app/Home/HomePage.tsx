"use client";

import NavBar from "@/components/NavBar/NavBar";
import { applicationConfig } from "@/lib/config";
import { Container, Flex } from "@chakra-ui/react";
import SimpleThreeColumns from "../Features/SimpleThreeColumns";
import { CallToActionWithAnnotation } from "../Heros/CtaWithAnotation";
import CallToActionWithVideo from "../Heros/CtaWithVideo";
import SplitScreen from "../Heros/SplitScreen";
import WithBackgroundImage from "../Heros/WithBackgroundImage";

export default function HomePage() {
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
          <CallToActionWithAnnotation />
        </Flex>
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
          <SplitScreen />
        </Flex>
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
          <CallToActionWithVideo />
        </Flex>
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
          <SimpleThreeColumns />
        </Flex>
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
          <WithBackgroundImage />
        </Flex>

        {/* <Footer /> */}
      </Flex>
    </Container>
  );
}
