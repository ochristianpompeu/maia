import NavBar from "@/components/NavBar/NavBar";
import Sidebar from "@/components/SideBar/Sidebar";
import { Button, Container, Heading } from "@chakra-ui/react";
// import {  } from "next-auth"

export default function Dashboard() {
  return (
    <Container margin={0} p={0} maxW="full">
      <NavBar />
      <Sidebar />
    </Container>
  );
}
