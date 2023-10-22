import { Box, useColorModeValue } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}
export default function NavLink({ children }: Props) {
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
}
