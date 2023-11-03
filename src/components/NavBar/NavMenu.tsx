import { HStack } from "@chakra-ui/react";
import { HomeLinks } from "../../lib/Links";
import NavLink from "./NavLink";

export default function NavMenu() {
  return (
    <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
      {HomeLinks.map((link) => (
        <NavLink href={link.link as string} key={link.text}>
          {link.text}
        </NavLink>
      ))}
    </HStack>
  );
}
