import { Divider, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";

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
        <Text>If this price is too hard on yout eyes</Text>
      </VStack>
      <HStack w={"full"} p={0}>
        <Image
          boxSize="80px"
          src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg"
          alt="Dan Abramov"
        />
        <HStack w="full" justifyContent="space-between">
          <VStack spacing={0} alignItems="flex-start">
            <Heading size="md">Camera</Heading>
            <Text>SDFDFGD$%$</Text>
          </VStack>
          <Heading size="sm">R$ 119,00</Heading>
        </HStack>
      </HStack>
      <VStack w="full">
        <HStack justifyContent="space-between" w="full">
          <Text>Subtotal</Text>
          <Heading size="sm">R$ 119,00</Heading>
        </HStack>
        <HStack justifyContent="space-between" w="full">
          <Text>Shipping</Text>
          <Heading size="sm">R$ 19,99</Heading>
        </HStack>
        <HStack justifyContent="space-between" w="full">
          <Text>Taxes</Text>
          <Heading size="sm">R$ 23,80</Heading>
        </HStack>
      </VStack>
      <Divider/>
      <HStack justifyContent="space-between" w="full">
          <Text>Taxes</Text>
          <Heading size="lg">R$ 23,80</Heading>
        </HStack>
    </VStack>
  );
}
