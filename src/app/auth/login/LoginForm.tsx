"use client";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  AbsoluteCenter,
  Box,
  Button,
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
import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
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
    try {
      setLoading(true);

      const res = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        senha: formValues.password,
        // callbackUrl,
      });

      setLoading(false);
      if(res?.error){
        setError("Dados informados inválidos")
        toast({
          title: "Ocorreu um erro",
          description: error,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        return  
      }

      router.push("/dashboard")

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
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          {/* <Heading fontSize={"4xl"}>Acesse sua</Heading> */}
          <Heading
            textColor={useColorModeValue("gray.800", "gray.500")}
            fontSize={"4xl"}
          >
            Login ✌️
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
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
                {/* <Checkbox>Remember me</Checkbox> */}
                <Text color={"blue.400"}>Esqueceu a senha?</Text>
              </Stack>
              <Button type="submit" disabled={loading} colorScheme="purple" onClick={handleSubmit}>
                {loading ? <Spinner /> : "Entrar"}
              </Button>
            </Stack>
            <Divider />
            <Text textAlign="right">
              Não possui cadastro?{" "}
              <Link color={"blue.400"} as={NextLink} href="/auth/signin">
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
            {/* <Button
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
            </Button> */}
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
