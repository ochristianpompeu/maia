import {
  Avatar,
  Box,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { FiChevronDown, FiMenu } from "react-icons/fi";
import { TiUser } from "react-icons/ti";
import ButtonToggleColorMode from "../ButtonToggleColorMode/ButtonToggleColorMode";
import MaiaLogo from "../Logo/MaiaLogo";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

export default function MobileNav({ onOpen, ...rest }: MobileProps) {
  const { data: session } = useSession();
  function handleSignOut() {
    signOut();
  }

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="12"
      alignItems="center"
      bg={useColorModeValue("gray.50", "gray.900")}
      // borderBottomWidth="1px"
      // borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
      position="static"
      pos="relative"
      // bgColor="white"
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <MaiaLogo
        display={{ base: "flex", md: "none" }}
        boxSize="10"
        rounded="md"
        mb={0}
      />

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <ButtonToggleColorMode mr="4" />
            <MenuButton
              py={0}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack p={0}>
                <Avatar
                  size={"sm"}
                  src={session?.user?.image as string | undefined}
                  bg="purple.500"
                  icon={<TiUser fontSize="1.5rem" />}
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontWeight="bold" fontSize="sm">
                    {session?.user?.name}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    {session?.user?.email}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Perfil</MenuItem>
              <MenuItem>Configurações</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
}
