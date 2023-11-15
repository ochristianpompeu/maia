"use client";

import {
  Box,
  BoxProps,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { TbBrandGithubFilled, TbBrandYoutubeFilled } from "react-icons/tb";
interface FooterProps extends BoxProps {}

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer({ ...rest }: FooterProps) {
  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.800")}
      color={useColorModeValue("gray.700", "gray.200")}
      {...rest}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Text>Maia Agendador de Serviços</Text>
        <Stack direction={"row"} spacing={6}>
          <SocialButton label={"Twitter"} href={"https://github.com/ochristianpompeu/maia"}>
            <TbBrandGithubFilled />
          </SocialButton>
          <SocialButton label={"YouTube"} href={"https://www.youtube.com/channel/UC7E41zZsqVRcypu2iAGwjXQ"}>
            <TbBrandYoutubeFilled />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
