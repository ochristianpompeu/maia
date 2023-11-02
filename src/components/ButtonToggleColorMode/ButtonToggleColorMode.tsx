import { Button, Icon, useColorMode } from "@chakra-ui/react";
import { TiWeatherNight, TiWeatherSunny } from "react-icons/ti";

export default function ButtonToggleColorMode() {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Button
      variant="outline"
      colorScheme="orange"
      size="sm"
      onClick={toggleColorMode}
    >
      <Icon as={colorMode === "light" ? TiWeatherNight : TiWeatherSunny} />
    </Button>
  );
}
