"use client";
import { Button, Heading, Image, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { poppins } from "./fonts";

export default function NotFound() {
  const router = useRouter();
  function handleRouter() {
    router.back();
  }
  return (
    <VStack
      w="full"
      h={{
        base: "auto",
      }}
      p="4"
      m={0}
      spacing="8"
      flex={1}
      overflowY="auto"
      justifyContent={{ lg: "center" }}
      className={poppins.className}
    >
      <Image
        rounded="full"
        boxSize="xs"
        alt="logo maia"
        border="4px"
        borderColor="purple"
        src="https://firebasestorage.googleapis.com/v0/b/maia-1286a.appspot.com/o/images%2F_64877f7e-f96c-44c8-9e9b-4dfc8b624a84.jfif?alt=media&token=06394491-3822-4329-9a14-4fa4e2e8caa4"
      />
      <Heading textAlign="center">
        O professor Marcelo não deixou fazermos <br />
        essa página ainda... heheh!!
        <br />
        🤭
      </Heading>
      <Button colorScheme="purple" onClick={handleRouter}>
        Volte para o abismo de onde veio!!
      </Button>
    </VStack>
  );
}
