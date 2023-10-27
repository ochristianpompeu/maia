"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import NextLink from "next/link";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  AbsoluteCenter,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
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
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SignInForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/perfil";
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault;

    if (!formValues.nome || !formValues.email || !formValues.senha) {
      setError("Todos os campos são obrigatórios");
      return;
    }

    try {
      setLoading(true);

      setFormValues({
        nome: "",
        email: "",
        senha: "",
      });

      const res = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.senha,
        callbackUrl,
      });

      setLoading(false);
      console.log(res);
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError("Email ou senha inválidos");
      }
    } catch (error: any) {
      setLoading(false);
      setError(error);
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
          <Heading fontSize={"4xl"}>Faça o</Heading>
          <Heading fontSize={"4xl"}>seu cadastro ✌️</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          w={["sm", "md"]}
        >
          <Stack spacing={4} onSubmit={()=>handleSubmit}>
            <FormControl id="nome">
              <FormLabel>Nome</FormLabel>
              <Input
                type="text"
                name="nome"
                placeholder="Elrond de Valfenda"
                value={formValues.nome}
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
                placeholder="durin@valfenda.com"
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
                  name="senha"
                  value={formValues.senha}
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
              <Button type="submit" disabled={loading} colorScheme="purple">
                {loading ? <Spinner /> : "Sign in"}
              </Button>
              {error && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Ocorreu um erro!</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </Stack>
          </Stack>
          <Divider my={6} />
          <Stack spacing={4} >
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
