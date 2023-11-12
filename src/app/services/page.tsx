"use client";
import SidebarDashboard from "@/components/SideBarDashboard/SidebarDashboard";
import { Flex, Stack, useColorModeValue } from "@chakra-ui/react";
import { Fragment, useState } from "react";
import { ServicesPanel } from "./ServicesPanel/ServicesPanel";

export default function Organization() {
  const bgBoxColor = useColorModeValue("gray.100", "gray.800");
  const [displayDetail, setDisplayDetail] = useState("none");

  function handleClick() {
    return;
  }

  function handleDisplayDetail() {
    if (displayDetail === "none") {
      setDisplayDetail("block");
    }

    if (displayDetail === "block") {
      setDisplayDetail("none");
    }
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
              <ServicesPanel shadow="none" />
              {/* <OrgDataPanel display={displayDetail} shadow="none" /> */}
            </Stack>
          </Flex>
        </Stack>
      </SidebarDashboard>
    </Fragment>
  );
}
