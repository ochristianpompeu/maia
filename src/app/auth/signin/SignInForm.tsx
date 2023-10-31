"use client";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
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
  Link,
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

export default function SignInForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/perfil";
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault;

    if (!formValues.name || !formValues.email || !formValues.password) {
      setError("Todos os campos são obrigatórios");
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

    try {
      setLoading(true);
      const responseUserExists = await fetch("/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      const { user } = await responseUserExists.json();

      if (user) {
        setError("Usuário já existe");
        setLoading(false);
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

      const signInResponse = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      setLoading(false);
      if (signInResponse.ok) {
        setFormValues({
          name: "",
          email: "",
          password: "",
        });
        router.push("/dashboard");
      } else {
        const errorResponse = await signInResponse.json();
        setError(errorResponse);
      }

    } catch (erro: any) {
      setLoading(false);
      setError(erro);
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
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Cadastro ✌️</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          w={["sm", "md"]}
        >
          <Stack spacing={4} onSubmit={handleSubmit}>
            <FormControl id="name">
              <FormLabel>Nome</FormLabel>
              <Input
                type="text"
                name="name"
                placeholder="Elrond de Valfenda"
                value={formValues.name}
                onChange={handleChange}
                w={"full"}
                required
                // disabled
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="durin@moria.com"
                value={formValues.email}
                onChange={handleChange}
                w={"full"}
                required
                // disabled
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
                  required
                  // disabled
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
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blue.400"}>Forgot password?</Text>
              </Stack>
              <Button
                onClick={handleSubmit}
                type="submit"
                disabled={loading}
                colorScheme="purple"
              >
                {loading ? <Spinner /> : "Sign in"}
              </Button>
            </Stack>
          </Stack>
          <Divider my={6} />
          <Stack spacing={4}>
            <Text textAlign={"right"}>
              Já possui cadastro?{" "}
              <Link color={"blue.400"} as={NextLink} href="/auth/login">
                Clique aqui
              </Link>
            </Text>
            <Box position="relative" paddingY="4">
              <Divider />
              <AbsoluteCenter
                bg={useColorModeValue("white", "gray.700")}
                px="4"
              >
                Ou
              </AbsoluteCenter>
            </Box>
            <Button
              variant="outline"
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/perfil",
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
                  callbackUrl: "/perfil",
                })
              }
              leftIcon={<FaGithub />}
              colorScheme="purple"
            >
              Login com Github
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
