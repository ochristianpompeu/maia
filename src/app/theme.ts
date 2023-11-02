import { extendTheme } from "@chakra-ui/react";

const config = {
  fonts: {
    heading: `'Bayon', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
};
const theme = extendTheme({
  config,
});

export default theme;
