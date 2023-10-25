import { Button, ButtonGroup, Icon, useColorMode } from "@chakra-ui/react";
import NextLink from "next/link";
import { TiUser, TiWeatherNight, TiWeatherSunny } from "react-icons/ti";

export default function ButtonLoginSignin() {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <ButtonGroup>
      <Button colorScheme="blue" size="sm" onClick={toggleColorMode}>
        <Icon as={colorMode === "light" ? TiWeatherNight : TiWeatherSunny} />
      </Button>
      <Button
        as={NextLink}
        variant={"solid"}
        colorScheme={"purple"}
        size={"sm"}
        mr={4}
        leftIcon={<TiUser />}
        href="/auth/login"
      >
        SignIn
      </Button>
    </ButtonGroup>
  );
}
