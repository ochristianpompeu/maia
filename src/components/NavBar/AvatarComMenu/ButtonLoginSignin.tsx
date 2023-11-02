import ButtonToggleColorMode from "@/components/ButtonToggleColorMode/ButtonToggleColorMode";
import { Routes } from "@/lib/Links";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SlLogin, SlLogout } from "react-icons/sl";

export default function ButtonLoginSignin() {
  const { data: session } = useSession();
  const route = useRouter();

  function handleClick() {
    session ? signOut() : route.replace(Routes.login.link);
  }
  return (
    <ButtonGroup>
      <ButtonToggleColorMode />
      <Button
        variant={"outline"}
        colorScheme={"purple"}
        size={"sm"}
        mr={4}
        leftIcon={session ? <SlLogout /> : <SlLogin />}
        onClick={handleClick}
      >
        {session ? "Sair" : "Entrar"}
      </Button>
    </ButtonGroup>
  );
}
