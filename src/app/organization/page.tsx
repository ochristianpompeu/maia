"use client";
import SidebarDashboard from "@/components/SideBarDashboard/SidebarDashboard";
import { Flex, Stack, useColorModeValue } from "@chakra-ui/react";
import { Fragment } from "react";
import { OrgDataPanel } from "./OrgDataPanel/OrgDataPanel";
import { OrgPanel } from "./OrgPanel/OrgPanel";
import { OrgPanelContent } from "./OrgPanel/OrgPanelContent";

export default function Organization() {
  const bgBoxColor = useColorModeValue("gray.100", "gray.800");

  function handleClick() {
    return;
  }

  return (
    <Fragment>
      <SidebarDashboard>
        <Stack
          p={[0, 2]}
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
              direction={{ base: "column", md: "row" }}
              padding={2}
              borderRadius="lg"
              // mx={{ base: "auto", md: "0.5" }}
              bgColor={bgBoxColor}
              w="full"
              maxW="full"
            >
              {/* <OrgHeaderAndDrawer /> */}
              <OrgPanel shadow="none">
                <OrgPanelContent />
              </OrgPanel>
              <OrgDataPanel shadow="none" />
              {/* <OrgAccordion /> */}
            </Stack>
          </Flex>
        </Stack>
      </SidebarDashboard>
    </Fragment>
  );
}
