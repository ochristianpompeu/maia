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
import { FiBell, FiChevronDown, FiMenu } from "react-icons/fi";
import { TiUser } from "react-icons/ti";
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
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <MaiaLogo display={{ base: "flex", md: "none" }} boxSize="10" rounded="md" mb={0} />

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
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
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
}
