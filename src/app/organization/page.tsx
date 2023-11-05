"use client";

import SidebarDashboardTest from "@/components/SideBarDashboard/SidebarDashboardTest";
import { Flex, Heading, Stack } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { OrganizationTable } from "./OrganizationTable";

export default function Organization() {
  const pathName = usePathname();

  function handleClick() {
    // console.log("pathname:", router.pathname);
    return;
  }

  return (
    <SidebarDashboardTest>
      <Stack p={4} direction={{ base: "column", md: "row" }} spacing={[2, 8]}>
        <Flex flex={1} w="full" h="full" alignItems="flex-start">
          <Stack direction="column">
            <Heading fontSize="2xl" w="full">
              Empresa
            </Heading>
            <OrganizationTable />
          </Stack>
        </Flex>
        {/* <Flex flex={1} w="full" h="full" justifyContent="center">
          <Text w="full">Coluna1</Text>
        </Flex> */}
      </Stack>
    </SidebarDashboardTest>
  );
}
