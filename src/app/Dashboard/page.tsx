import SidebarDashboard from "@/components/SideBarDashboard/SidebarDashboard";
import { Container } from "@chakra-ui/react";

export default function Panel() {
  return (
    <Container margin={0} p={0} maxW="full">
      <SidebarDashboard>
        Conteúdo
      </SidebarDashboard>
    </Container>
  );
}
