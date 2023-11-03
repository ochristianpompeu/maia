"use client";

import {
  Box,
  Drawer,
  DrawerContent,
  Heading,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react";

import MobileNav from "./MobileNav";
import SidebarContent from "./SidebarContent";

export default function SidebarDashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
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
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Heading>O Conteúdo vai aqui. Vamos dividir em duas colunas?</Heading>
      </Box>
    </Box>
  );
}
