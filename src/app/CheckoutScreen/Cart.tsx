import { Heading, Text, VStack } from "@chakra-ui/react";

export default function Cart() {
  return (
    <VStack
      w={"full"}
      h={"full"}
      p={10}
      spacing={10}
      alignItems={"flex-start"}
      bg={"gray.50"}
    >
      <VStack spacing={3} alignItems={"flex-start"}>
        <Heading size={"2xl"}>Your Cart</Heading>
        <Text>
          If this price is too hard on yout eyes 
        </Text>
      </VStack>
    </VStack>
  );
}
