import { Button, ButtonGroup, Icon, useColorMode } from "@chakra-ui/react";
import { TiUser, TiWeatherNight, TiWeatherSunny } from "react-icons/ti";

export default function ButtonLoginSignin() {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <ButtonGroup>
      <Button colorScheme="pink" size="sm" onClick={toggleColorMode}>
        <Icon as={colorMode === "light" ? TiWeatherNight : TiWeatherSunny} />
      </Button>
      <Button
        variant={"solid"}
        colorScheme={"purple"}
        size={"sm"}
        mr={4}
        leftIcon={<TiUser />}
      >
        Login
      </Button>
    </ButtonGroup>
  );
}
