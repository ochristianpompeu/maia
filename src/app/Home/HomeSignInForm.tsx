import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  VStack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

export default function HomeSignInForm() {
  const { toggleColorMode, colorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50");
  return (
    <VStack
      w={"full"}
      h={"full"}
      py={2}
      m={0}
      spacing={0}
      //   bg={bgColor}
      justifyContent="center"
      flex={1}
    >
      <Stack
        spacing={8}
        mx={"auto"}
        maxW={"full"}
        // py={12}
        px={6}
      >
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Faça seu Cadastro ✌️</Heading>
        </Stack>
        <FormControl id="name">
          <FormLabel>Nome</FormLabel>
          <Input
            type="text"
            name="name"
            placeholder="Elrond de Valfenda"
            focusBorderColor="purple.500"
            //   value={formValues.name}
            //   onChange={handleChange}
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
            focusBorderColor="purple.500"
            //   value={formValues.email}
            //   onChange={handleChange}
            w={"full"}
            required
            // disabled
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Senha</FormLabel>
          <InputGroup>
            <Input
              // type={showPassword ? "text" : "password"}
              type="text"
              placeholder="senha"
              name="password"
              focusBorderColor="purple.500"
              // value={formValues.password}
              // onChange={handleChange}
              required
              // disabled
            />
            <InputRightElement h="full">
              <Button
                variant="ghost"
                //   onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {/* {showPassword ? <ViewIcon /> : <ViewOffIcon />} */}
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
            <Checkbox colorScheme="purple">Remember me</Checkbox>
            <Text color={"blue.600"}>Forgot password?</Text>
          </Stack>
          <Button
            // onClick={handleSubmit}
            type="submit"
            // disabled={loading}
            colorScheme="purple"
          >
            {/* {loading ? <Spinner /> : "Sign in"} */}
          </Button>
        </Stack>
      </Stack>
    </VStack>
  );
}
