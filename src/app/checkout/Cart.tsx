import {
  Button,
  Divider,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Moon, Sun } from "@phosphor-icons/react";
import { Image } from "@chakra-ui/react";

export default function Cart() {
  const { toggleColorMode, colorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50");
  return (
    <VStack
      w={"full"}
      h={"full"}
      p={10}
      spacing={10}
      alignItems={"flex-start"}
      bg={bgColor}
    >
      <VStack spacing={3} alignItems={"flex-start"}>
        <Heading size={"2xl"}>Your Cart</Heading>
        <Text>If this price is too hard on your eyes</Text>
        <Button colorScheme="purple" onClick={toggleColorMode}>
          <Icon as={colorMode === "light" ? Moon : Sun} />
        </Button>
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
      <Divider />
      <HStack justifyContent="space-between" w="full">
        <Text>Taxes</Text>
        <Heading size="lg">R$ 23,80</Heading>
      </HStack>
    </VStack>
  );
}
