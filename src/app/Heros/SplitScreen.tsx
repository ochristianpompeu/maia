"use client";

import { Routes } from "@/lib/Links";
import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { poppins } from "../fonts";

export default function SplitScreen() {
  const router = useRouter();
  function handleSignIn() {
    router.push(Routes.signin.link);
  }
  return (
    <Stack
      className={poppins.className}
      minH={"100vh"}
      direction={{ base: "column", md: "row" }}
    >
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          fallbackSrc="https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          src="https://firebasestorage.googleapis.com/v0/b/maia-1286a.appspot.com/o/images%2F_128f1410-460f-4cb7-a18d-0bb33817d637.jfif?alt=media&token=a723d88a-1309-433b-a8ac-6795a4ee3de1"
        />
      </Flex>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: useBreakpointValue({ base: "20%", md: "30%" }),
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "purple.400",
                zIndex: -1,
              }}
            >
              Presta serviço?
            </Text>
            <br />{" "}
            <Text color={"purple.400"} as={"span"}>
              Cadastre os dados da empresa
            </Text>{" "}
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
            A partir dos dados da empresa você poderá fazer os demais cadastros
            It&apos;s Seus profissionais, serviços e horários.
          </Text>
          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <Button
              rounded={"lg"}
              bg={"purple.400"}
              color={"white"}
              _hover={{
                bg: "purple.500",
              }}
              onClick={handleSignIn}
            >
              Cadastre-se
            </Button>
            {/* <Button rounded={"full"}>How It Works</Button> */}
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
}
