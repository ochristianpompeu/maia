import { Button, ButtonProps, Icon, useColorMode } from "@chakra-ui/react";
import { TiWeatherNight, TiWeatherSunny } from "react-icons/ti";

interface ButtonToggleColorModeProps extends ButtonProps {}

export default function ButtonToggleColorMode({ ...rest }) {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Button
      variant="outline"
      colorScheme="orange"
      size="sm"
      onClick={toggleColorMode}
      {...rest}
    >
      <Icon as={colorMode === "light" ? TiWeatherNight : TiWeatherSunny} />
    </Button>
  );
}
