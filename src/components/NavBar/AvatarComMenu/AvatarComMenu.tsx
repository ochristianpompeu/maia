import { Routes } from "@/lib/Links";
import {
  Avatar,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { SlUser } from "react-icons/sl";
import ButtonLoginSignin from "./ButtonLoginSignin";

export default function AvatarComMenu() {
  const { data: session } = useSession();
  return (
    <Flex alignItems={"center"}>
      <ButtonLoginSignin />
      <Menu>
        <MenuButton
          as={Button}
          rounded={"full"}
          variant={"link"}
          cursor={"pointer"}
          minW={0}
        >
          <Avatar
            size={"sm"} colorScheme="purple" bg="purple.500"
            src={session?.user?.image as string | undefined}
            name={session?.user?.name as string | undefined}
            icon={<SlUser fontSize="1.rem"/>}
            // src="https://i.pravatar.cc/300"
          />
        </MenuButton>
        <MenuList>
          <MenuItem>{Routes.blog.text}</MenuItem>
          <MenuItem>{Routes.servicos.text}</MenuItem>
          <MenuDivider />
          <MenuItem>Configurações</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
