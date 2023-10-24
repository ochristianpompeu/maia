import { Box, Stack } from "@chakra-ui/react";
import NavLink from "./NavLink";

import { Links } from "../../lib/Links";

export default function NavMenuMobile() {
  return (
    <Box pb={4} display={{ md: "none" }}>
      <Stack as={"nav"} spacing={4}>
        {Links.map((link) => (
          <NavLink href={link.link} key={link.text}>
            {link.text}
          </NavLink>
        ))}
      </Stack>
    </Box>
  );
}
