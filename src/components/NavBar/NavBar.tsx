"use client";

import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import AvatarComMenu from "./AvatarComMenu/AvatarComMenu";

import Logo from "../Logo/MaiaLogo";
import NavMenu from "./NavMenu";
import NavMenuMobile from "./NavMenuMobile";

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    // <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
    <Box  px={4}>
      <Container maxW="container.xl" p={0}>
        <Flex h={12} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Logo />
            <NavMenu />
          </HStack>
          <AvatarComMenu />
        </Flex>
        {isOpen ? <NavMenuMobile /> : null}
      </Container>
    </Box>
  );
}
