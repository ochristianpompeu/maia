import { Box, Stack } from "@chakra-ui/react";
import NavLink from "./NavLink";

import { HomeLinks } from "../../lib/Links";

export default function NavMenuMobile() {
  return (
    <Box pb={4} display={{ md: "none" }}>
      <Stack as={"nav"} spacing={4}>
        {HomeLinks.map((link) => (
          <NavLink href={link.link as string} key={link.text}>
            {link.text}
          </NavLink>
        ))}
      </Stack>
    </Box>
  );
}
