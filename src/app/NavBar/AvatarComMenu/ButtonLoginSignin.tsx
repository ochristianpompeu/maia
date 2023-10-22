import { Button, ButtonGroup, Icon, useColorMode } from "@chakra-ui/react";
import { Moon, Sun, User } from "@phosphor-icons/react";

export default function ButtonLoginSignin() {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <ButtonGroup>
      <Button colorScheme="pink" size="sm" onClick={toggleColorMode}>
        <Icon as={colorMode === "light" ? Moon : Sun} />
      </Button>
      <Button
        variant={"solid"}
        colorScheme={"purple"}
        size={"sm"}
        mr={4}
        leftIcon={<User />}
      >
        Login
      </Button>
    </ButtonGroup>
  );
}
