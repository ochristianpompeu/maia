'use client'
import SidebarDashboard from "@/components/SideBarDashboard/SidebarDashboard";
import { Container } from "@chakra-ui/react";

export default function Dashboard() {
  return (
    <Container margin={0} p={0} maxW="full">
      <SidebarDashboard>Panel</SidebarDashboard>
    </Container>
  );
}
