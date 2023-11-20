"use client";

import { Logo } from "@/components/Logo/Logo";
import { Routes } from "@/lib/Links";
import { applicationConfig } from "@/lib/config";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";
import {
  AbsoluteCenter,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
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
import { SlLogin } from "react-icons/sl";

export default function NewLoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const mainColor = useColorModeValue("purple.600", "purple.100");

  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const callbackUrl =
    searchParams.get("callbackUrl") || `${Routes.dashboard.link}`;
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);

      const res = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
      });

      if (res?.error) {
        setError("Dados informados inválidos");
        toast({
          title: error ? error : "Dados informados inválidos",
          description: error ? "" : "Dados informados inválidos",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        return;
      }

      router.replace("panel");
    } catch (error: any) {
      setLoading(false);
      setError(error);
      toast({
        title: error ? error : "Ocorreu um erro",
        description: !error && "Ocorreu um erro",
        status: "error",
        duration: 3000,
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
      h={{
        base: "auto",
        md: applicationConfig.staticHeight,
      }}
      width="full"
      overflowY="auto"
      py={8}
    >
      <Stack w="full" spacing={2} mx={"auto"} maxW={"lg"} px="2">
        <Stack align={"center"}>
          <Logo
            boxSize={["16", "24", "32", "40"]}
            p={["8", "12", "16", "20"]}
            borderRadius="full"
          />
          <Stack direction={{ base: "column", md: "row" }} align={"center"}>
            <Heading fontSize={["3xl", "4xl"]} textColor={mainColor}>
              Entrar
            </Heading>
            <Heading
              fontSize={"4xl"}
              textColor={useColorModeValue("purple.600", "purple.100")}
            >
              🤟
            </Heading>
          </Stack>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("gray.50", "gray.700")}
          boxShadow={"lg"}
          p={8}
          overflowY="auto"
        >
          <Stack spacing={4} onSubmit={handleSubmit}>
            <FormControl id="email">
              <FormLabel textColor={mainColor}>Email</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="durin@valfenda.com"
                value={formValues.email}
                onChange={handleChange}
                w={"full"}
                focusBorderColor={mainColor}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel textColor={mainColor}>Senha</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="senha"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                  focusBorderColor={mainColor}
                />
                <InputRightElement h="full">
                  <Button
                    variant="ghost"
                    colorScheme="purple"
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack>
              <Stack
                direction={{ base: "column", md: "row" }}
                justifyContent={"space-between"}
                w="full"
                px={0}
                py="2"
              >
                <Checkbox colorScheme="purple">Lembre de mim 🎶</Checkbox>
                <Text color={mainColor}>Esqueceu sua senha?</Text>
              </Stack>
              <ButtonGroup
                variant="outline"
                colorScheme="purple"
                w="full"
                justifyContent="right"
                isAttached
              >
                <Button
                  type="submit"
                  disabled={loading}
                  variant="solid"
                  onClick={handleSubmit}
                  w="full"
                >
                  {loading ? <Spinner /> : "Entrar"}
                </Button>
                <IconButton aria-label="login button" icon={<SlLogin />} />
              </ButtonGroup>
            </Stack>
            <Text textAlign="right" w="full" py="2">
              Não possui cadastro?{" "}
              <Link color={mainColor} as={NextLink} href={Routes.signin.link}>
                Clique aqui
              </Link>
            </Text>
            <Box position="relative" paddingY="2">
              <Divider />
              <AbsoluteCenter
                bg={useColorModeValue("purple.50", "gray.700")}
                px="4"
              >
                Ou
              </AbsoluteCenter>
            </Box>
            <Stack
              justifyContent={{ base: "center", md: "space-between" }}
              w="full"
              direction={{ base: "column", md: "row" }}
              spacing="4"
            >
              <ButtonGroup
                variant="outline"
                colorScheme="red"
                onClick={() =>
                  signIn("google", {
                    callbackUrl: Routes.dashboard.link,
                  })
                }
                w="full"
                isAttached
              >
                <IconButton aria-label="login com Google" icon={<FcGoogle />} />

                <Button w="full">Login com Google</Button>
              </ButtonGroup>
              <ButtonGroup
                colorScheme="purple"
                w="full"
                variant="outline"
                onClick={() =>
                  signIn("github", {
                    callbackUrl: Routes.dashboard.link,
                  })
                }
                isAttached
              >
                <IconButton aria-label="login com github" icon={<FaGithub />} />
                <Button w={"full"}>Login com Github</Button>
              </ButtonGroup>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
