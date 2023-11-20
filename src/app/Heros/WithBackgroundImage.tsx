"use client";

import { Routes } from "@/lib/Links";
import {
    Button,
    Flex,
    Stack,
    Text,
    VStack,
    useBreakpointValue,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { poppins } from "../fonts";

export default function WithBackgroundImage() {
  const router = useRouter();
  function handleSignIn() {
    router.push(Routes.signin.link);
  }
  return (
    <Flex
      w={"full"}
      h={"100vh"}
      backgroundImage={
        "https://firebasestorage.googleapis.com/v0/b/maia-1286a.appspot.com/o/images%2F_12aa1ca6-1583-485e-97dd-edcc4fac21ca.jfif?alt=media&token=33612364-ec09-499f-a572-9b1bda95d07b"
      }
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
      className={poppins.className}
    >
      <VStack
        w={"full"}
        justify={"center"}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
      >
        <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
          <Text
            color={"white"}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
          >
            A aplicação ainda é simples, mas temos muito por produzir juntos.
            Vamos testar?
          </Text>
          <Stack direction={"row"}>
            <Button
              bg={"purple.400"}
              rounded={"lg"}
              color={"white"}
              _hover={{ bg: "purple.500" }}
              onClick={handleSignIn}
            >
              Cadastre-se
            </Button>
            <Button
              bg={"whiteAlpha.300"}
              rounded={"lg"}
              color={"white"}
              _hover={{ bg: "whiteAlpha.500" }}
              disabled
            >
              Saiba mais
            </Button>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  );
}
