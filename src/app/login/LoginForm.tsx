"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputRightElement,
  InputGroup,
  Divider,
  Spinner,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { GithubLogo, GoogleLogo } from "@phosphor-icons/react";

export default function SimpleCard() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    senha: "",
  });

  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/perfil";
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault;
    try {
      setLoading(true);

      setFormValues({
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
          <Heading fontSize={"4xl"}>Acesse sua</Heading>
          <Heading fontSize={"4xl"}>conta ✌️</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
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
                disabled
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
                  disabled
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
            </Stack>
            <Divider />
            <Button
              variant="outline"
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/perfil",
                })
              }
              leftIcon={<GoogleLogo size={20} weight="bold" />}
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
              leftIcon={<GithubLogo size={20} weight="bold" />}
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
