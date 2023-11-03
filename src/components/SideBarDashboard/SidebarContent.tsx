import { Links } from "@/lib/Links";
import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import MaiaLogo from "../Logo/MaiaLogo";
import NavItem from "./NavItem";

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export default function SidebarContent({ onClose, ...rest }: SidebarProps) {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("purple.200", "purple.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="12" alignItems="center" mx="8" justifyContent="space-between">
        <MaiaLogo
          display={{ base: "flex", md: "none" }}
          boxSize="10"
          rounded="md"
          mb={0}
        />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {Links.map((link) => (
        <NavItem key={link.text} icon={link.icon}>
          {link.text}
        </NavItem>
      ))}
    </Box>
  );
}
