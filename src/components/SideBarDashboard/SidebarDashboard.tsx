"use client";

import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Stack,
  useColorModeValue,
  useDisclosure
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
    <Box
      minH="100vh"
      justifyContent="space-between"
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
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box
        ml={{ base: 0, md: 60 }}
        h="calc(100vh - 80px)"
        // w="calc(100vw - 240px)"
        w={{base:"full", md:"calc(100vw - 240px)"} }
        bg={useColorModeValue("gray.100", "gray.800")}
        // borderColor="gray.900"
      >
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={[2, 8]}
          h="calc(100vh - 48px - 64px)"
          borderRadius="lg"
          overflowY="auto"
        >
          {children}
        </Stack>
        <Footer height="16" px={{ base: 4, md: 4 }} />
      </Box>
    </Box>
  );
}
