import { extendTheme } from "@chakra-ui/react";

const config = {
  fonts: {
    heading: `'Bayon', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
  initialColorMode: 'dark',
  useSystemColorMode: false,
};
const theme = extendTheme({
  config,
});

export default theme;
