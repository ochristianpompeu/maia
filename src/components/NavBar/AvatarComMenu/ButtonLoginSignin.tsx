import ButtonToggleColorMode from "@/components/ButtonToggleColorMode/ButtonToggleColorMode";
import { Button, ButtonGroup, useColorMode } from "@chakra-ui/react";
import NextLink from "next/link";
import { TiUser } from "react-icons/ti";

export default function ButtonLoginSignin() {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <ButtonGroup>
      <ButtonToggleColorMode />
      <Button
        as={NextLink}
        variant={"solid"}
        colorScheme={"purple"}
        size={"sm"}
        mr={4}
        leftIcon={<TiUser />}
        href="/auth/login" //quando completar a construção da autenticação deve tratar o nome e destino do botão com base na sessão
      >
        Entrar
      </Button>
    </ButtonGroup>
  );
}
