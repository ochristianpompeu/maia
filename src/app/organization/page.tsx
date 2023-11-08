"use client";
import SidebarDashboardTest from "@/components/SideBarDashboard/SidebarDashboardTest";
import { Flex, Stack, useColorModeValue } from "@chakra-ui/react";
import { Fragment } from "react";
import { OrgAccordion } from "./OrgAccordion/OrgAccordion";
import { OrgHeaderAndDrawer } from "./OrgAddDrawer/OrgHeaderAndDrawer";

export default function Organization() {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const firstField = React.useRef() as any;
  const bgBoxColor = useColorModeValue("white", "gray.800");
  // const bgColor = useColorModeValue("white", "gray.800");
  // const tableBorderColoor = useColorModeValue("gray.100", "black");

  function handleClick() {
    return;
  }

  return (
    <Fragment>
      <SidebarDashboardTest>
        <Stack
          p={[0, 4]}
          direction={{ base: "column", md: "row" }}
          spacing={[2, 8]}
          w="full"
        >
          <Flex
            flex={1}
            w="full"
            h="full"
            alignItems={["center", "flex-start"]}
          >
            <Stack
              direction="column"
              padding={4}
              borderRadius="lg"
              mx={{ base: "auto", md: "0.5" }}
              bgColor={bgBoxColor}
              w="full"
              maxW="xl"
            >
              <OrgHeaderAndDrawer />
              <OrgAccordion />
            </Stack>
          </Flex>
        </Stack>
      </SidebarDashboardTest>
    </Fragment>
  );
}
