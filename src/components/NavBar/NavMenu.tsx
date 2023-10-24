import { HStack } from "@chakra-ui/react";
import { Links } from "../../lib/Links";
import NavLink from "./NavLink";

export default function NavMenu() {
  return (
    <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
      {Links.map((link) => (
        <NavLink href={link.link} key={link.text}>
          {link.text}
        </NavLink>
      ))}
    </HStack>
  );
}
