"use client";

import MaiaLogo from "@/components/Logo/MaiaLogo";
import { Routes } from "@/lib/Links";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";
import {
  AbsoluteCenter,
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import NextLink from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function NewLoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault;
    try {
      setLoading(true);

      const res = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
      });

      setLoading(false);
      if (res?.error) {
        setError("Dados informados inválidos");
        toast({
          title: "Ocorreu um erro",
          description: error,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        return;
      }

      router.replace("dashboard");
    } catch (error: any) {
      setLoading(false);
      setError(error);
      toast({
        title: "Ocorreu um erro",
        description: error,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  }

  return (
    <Flex
      align={"center"}
      justify={"center"}
      //   bg={useColorModeValue("gray.50", "gray.800")}
      flex={1}
    >
      <Stack spacing={2} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <MaiaLogo mb={10} boxSize={[12, 16, 20]} rounded="full" />
          <Stack align={"center"}>
            <Heading
              fontSize={"4xl"}
              textColor={useColorModeValue("purple.600", "purple.100")}
            >
              Entrar ✌️
            </Heading>
          </Stack>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("purple.50", "gray.700")}
          boxShadow={"lg"}
          p={8}
          // w="sm"
        >
          <Stack spacing={4} onSubmit={handleSubmit}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="durin@valfenda.com"
                value={formValues.email}
                onChange={handleChange}
                w={"full"}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Senha</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="senha"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                />
                <InputRightElement h="full">
                  <Button
                    variant="ghost"
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack >
              <Stack
                direction={{ base: "column", md: "row" }}
                justifyContent={"space-between"}
                w="full"
                p={0}
              >
                <Checkbox colorScheme="purple">Remember me</Checkbox>
                <Text color={"blue.600"}>Esqueceu sua senha?</Text>
              </Stack>
              <Button
                type="submit"
                disabled={loading}
                colorScheme="purple"
                onClick={handleSubmit}
              >
                {loading ? <Spinner /> : "Entrar"}
              </Button>
            </Stack>
            <Divider />
            <Text textAlign="right" w="full">
              Não possui cadastro?{" "}
              <Link color={"blue.600"} as={NextLink} href="/">
                Clique aqui
              </Link>
            </Text>
            <Box position="relative" paddingY="4">
              <Divider />
              <AbsoluteCenter
                bg={useColorModeValue("purple.50", "gray.700")}
                px="4"
              >
                Ou
              </AbsoluteCenter>
            </Box>
            <Button
              variant="outline"
              onClick={() =>
                signIn("google", {
                  callbackUrl: Routes.dashboard.link,
                })
              }
              leftIcon={<FcGoogle />}
              colorScheme="red"
            >
              Login com Google
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                signIn("github", {
                  callbackUrl: Routes.dashboard.link,
                })
              }
              leftIcon={<FaGithub />}
              colorScheme="blackAlpha"
            >
              Login com Github
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
