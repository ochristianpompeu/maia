import { applicationConfig } from "@/lib/config";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
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
  VStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { TiUserAddOutline } from "react-icons/ti";
import { Routes } from "../../lib/Links";

export default function HomeSignInForm() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();
  const router = useRouter();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("")
    if (!formValues.name || !formValues.email || !formValues.password) {
      setError("Todos os campos são obrigatórios");
      toast({
        title: error ? error : "Todos os campos são obrigatórios",
        description: error ? "" : "Todos os campos são obrigatórios",
        status: "error",
        duration: 3000,
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
          title: error ? error : "Usuário já existe",
          description: error ? "" : "Usuário já existe",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });

        return;
      }

      const responseSignIn = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      setLoading(false);
      if (responseSignIn.ok) {
        setFormValues({
          email: "",
          name: "",
          password: "",
        });
        router.push(Routes.login.link);
      } else {
        const responseError = await responseSignIn.json();
        setError(responseError);
      }
    } catch (erro: any) {
      setLoading(false);
      setError(erro);
      toast({
        title: "Ocorreu um erro",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  }

  return (
    <VStack
      w="full"
      h={{
        base: "auto",
        md: applicationConfig.staticHeight,
      }}
      py={2}
      m={0}
      spacing={0}
      flex={1}
      overflowY="auto"
      justifyContent={{ lg: "center" }}
    >
      <Stack
        h="auto"
        mx="auto"
        alignItems="center"
        justifyContent="center"
        px={4}
        onSubmit={handleSubmit}
      >
        <Stack
          py={4}
          align={"center"}
          direction={{ base: "column", md: "row" }}
        >
          <Heading textColor="purple.600" fontSize={"4xl"}>Faça seu Cadastro</Heading>
          <Heading fontSize={"4xl"}>✌️</Heading>
        </Stack>
        <FormControl id="name">
          <FormLabel>Nome</FormLabel>
          <Input
            type="text"
            name="name"
            placeholder="Elrond de Valfenda"
            focusBorderColor="purple.500"
            value={formValues.name}
            onChange={handleChange}
            w={"full"}
            required
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            placeholder="durin@moria.com"
            focusBorderColor="purple.500"
            value={formValues.email}
            onChange={handleChange}
            w={"full"}
            required
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Senha</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="senha"
              name="password"
              focusBorderColor="purple.500"
              value={formValues.password}
              onChange={handleChange}
              required
            />
            <InputRightElement h="full">
              <Button
                variant="ghost"
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? (
                  <ViewIcon color="purple.500" />
                ) : (
                  <ViewOffIcon color="purple.500" />
                )}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Stack w="full">
          <Button
            onClick={handleSubmit}
            type="submit"
            colorScheme="purple"
            variant="outline"
            w="full"
            leftIcon={<TiUserAddOutline fontSize="20" />}
          >
            {loading ? <Spinner /> : "Cadastrar"}
          </Button>
        </Stack>
        <Text textAlign="end" w="full">
          Já possui cadastro?{" "}
          <Link color={"purple.600"} as={NextLink} href={Routes.login.link}>
            Clique aqui
          </Link>
        </Text>
        <Box w="full" position="relative" paddingY="4">
          <Divider />
          <AbsoluteCenter bg={useColorModeValue("white", "gray.800")} px="4">
            Ou
          </AbsoluteCenter>
        </Box>
        <Button
          variant="outline"
          onClick={() =>
            signIn("google", {
              callbackUrl: Routes.login.link,
            })
          }
          leftIcon={<FcGoogle />}
          colorScheme="red"
          w="full"
        >
          Registre-se com Google
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            signIn("github", {
              callbackUrl: "/login",
            })
          }
          leftIcon={<FaGithub />}
          colorScheme="purple"
          disabled={true}
          w="full"
        >
          Registre-se com Github
        </Button>
      </Stack>
    </VStack>
  );
}
