"use client";
import SidebarDashboard from "@/components/SideBarDashboard/SidebarDashboard";
import { ServiceProps } from "@/lib/interfaces";
import { Flex, Stack, useColorModeValue } from "@chakra-ui/react";
import { Fragment, useState } from "react";
import { DataPanel } from "./DataPanel/DataPanel";
import { Panel } from "./Panel/Panel";

export default function Professionals() {
  const bgBoxColor = useColorModeValue("gray.100", "gray.800");
  const [displayDetail, setDisplayDetail] = useState("none");
  const [detailService, setDetailService] = useState<ServiceProps>();

  function handleDisplayDetail(display: string, service?: ServiceProps) {
    setDisplayDetail(display);
    setDetailService(service);
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
              <Panel handleDisplayDetail={handleDisplayDetail} shadow="none" />
              <DataPanel
                display={displayDetail}
                handleDisplayDetail={handleDisplayDetail}
                service={detailService}
                shadow="none"
              />
            </Stack>
          </Flex>
        </Stack>
      </SidebarDashboard>
    </Fragment>
  );
}
