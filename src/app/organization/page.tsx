import SidebarDashboardTest from "@/components/SideBarDashboard/SidebarDashboardTest";
import { Flex, Stack, Text } from "@chakra-ui/react";

export default function Organization() {
  return (
    <SidebarDashboardTest>
      <Stack p={0} direction={{ base: "column", md: "row" }} spacing={[2, 8]}>
        <Flex flex={1} w="full" h="full" justifyContent="center">
          <Text w="full" textAlign="center">Coluna1</Text>
        </Flex>
        <Flex flex={1} w="full" h="full" justifyContent="center">
          <Text w="full">Coluna1</Text>
        </Flex>
      </Stack>
    </SidebarDashboardTest>
  );
}
