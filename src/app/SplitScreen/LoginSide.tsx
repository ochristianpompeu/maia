import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

export default function LoginSide() {
  return (
    <Flex p={4} flex={1} align={"center"} justify={"flex-start"}>
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
            Maia
          </Text>
          <br />{" "}
          <Text color={"purple.400"} as={"span"}>
            Agendador
          </Text>{" "}
        </Heading>
        <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
          Projeto de aplicação web para realizar agendamento de serviços
        </Text>
        <Stack direction={{ base: "column", md: "row" }} spacing={4}>
          <Button
            rounded={"full"}
            colorScheme="purple"
            _hover={{
              bg: "blue.500",
            }}
          >
            Consultar Serviços
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
