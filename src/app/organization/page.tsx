/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import SidebarDashboard from "@/components/SideBarDashboard/SidebarDashboard";
import { Flex, Stack, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { UserContext } from "../contexts/userContext";
import { useUser } from "../hooks/useUser";
import { OrgPanel } from "./OrgPanel/OrgPanel";
import { OrgPanelContent } from "./OrgPanel/OrgPanelContent";

export default function Organization() {
  const bgBoxColor = useColorModeValue("gray.100", "gray.800");
  const [displayDetail, setDisplayDetail] = useState("none");
  const { user } = useUser();

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
    // setDisplayDetail(!displayDeta);
    return;
  }

  return (
      <UserContext.Provider value={user}>
        {/* <Fragment> */}
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
                  <OrgPanel shadow="none">
                    <OrgPanelContent />
                  </OrgPanel>
                  {/* <OrgDataPanel display={displayDetail} shadow="none" /> */}
                </Stack>
              </Flex>
            </Stack>
          </SidebarDashboard>
        {/* </Fragment> */}
      </UserContext.Provider>
  );
}
