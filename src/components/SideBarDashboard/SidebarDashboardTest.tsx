"use client";

import {
    Box,
    Container,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    Flex,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";

import Footer from "../Footer/Footer";
import MobileNav from "./MobileNav";
import SidebarContent from "./SidebarContent";

interface SidebarDashboarProps {
  children: React.ReactNode;
}

export default function SidebarDashboard({ children }: SidebarDashboarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Container
      maxW={"full"}
      p={0}
      h={{
        base: "auto",
        md: "100vh",
      }}
    >
      <Flex
        direction="column"
        w={"full"}
        h={"full"}
        justifyContent="space-between"
        //   minH="100vh"
        bg={useColorModeValue("gray.50", "gray.900")}
      >
        <SidebarContent
          onClose={() => onClose}
          display={{ base: "none", md: "block" }}
        />
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          // size="sm"
        >
          <DrawerOverlay />
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        <MobileNav onOpen={onOpen} />
        <Box
          flex={1}
          justifyContent="space-between"
          ml={{ base: 0, md: 60 }}
          // p="4"
          p={0}
          h="full"
        >
          {children}
        </Box>
        <Footer ml={{ base: 0, md: 60 }} px={{ base: 4, md: 4 }} />
      </Flex>
    </Container>
  );
}
