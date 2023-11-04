import SidebarDashboardTest from "@/components/SideBarDashboard/SidebarDashboardTest";
import { Container } from "@chakra-ui/react";

export default function Dashboard() {
  return (
    <Container margin={0} p={0} maxW="full">
      <SidebarDashboardTest>Panel</SidebarDashboardTest>
    </Container>
  );
}
