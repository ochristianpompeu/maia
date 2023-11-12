import { PanelLinks } from "@/lib/Links";
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
      bg={useColorModeValue("gray.50", "gray.800")}
      // borderRight="1px"
      // borderRightColor={useColorModeValue("purple.200", "purple.800")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="12" alignItems="center" mx="8" justifyContent="space-between">
        <MaiaLogo
          // display={{ base: "flex", md: "none" }}
          boxSize="10"
          rounded="md"
          mb={0}
        />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {PanelLinks.map((link) => (
        <NavItem key={link.text} icon={link.icon} href={link.link}>
          {link.text}
        </NavItem>
      ))}
    </Box>
  );
}
