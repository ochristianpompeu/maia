"use client";
import SidebarDashboardTest from "@/components/SideBarDashboard/SidebarDashboardTest";
import { Flex, SimpleGrid, Stack, useColorModeValue } from "@chakra-ui/react";
import { ServiceCard } from "./ServiceCard";
import { ServiceHeader } from "./ServiceHeader";

export default function Services() {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const firstField = React.useRef() as any;
  const bgBoxColor = useColorModeValue("white", "gray.800");
  // const bgColor = useColorModeValue("white", "gray.800");
  // const tableBorderColoor = useColorModeValue("gray.100", "black");

  function handleClick() {
    return;
  }

  return (
    <SidebarDashboardTest>
      <Stack
        p={[0, 4]}
        direction={{ base: "column", md: "row" }}
        spacing={[2, 8]}
        w="full"
        h={{
          base: "auto",
          md: "full",
        }}
      >
        <Flex
          p="1.5"
          flex={1}
          w="full"
          h={{
            base: "auto",
            md: "full",
          }}
          alignItems={["center", "flex-start"]}
        >
          <Stack
            direction="column"
            padding={4}
            borderRadius="lg"
            mx={{ base: "auto", md: "0.5" }}
            bgGradient="linear(to-b, purple.100, purple.50)"
            w="full"
            maxW="full"
            h={{
              base: "auto",
              md: "full",
            }}
          >
            <ServiceHeader />
            <SimpleGrid
              spacing={4}
              templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
              w="full"
            >
              <ServiceCard />
              <ServiceCard />
            </SimpleGrid>
          </Stack>
        </Flex>
      </Stack>
    </SidebarDashboardTest>
  );
}
