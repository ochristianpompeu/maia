import { Flex, Image, VStack } from "@chakra-ui/react";

export default function ImageSide() {
  return (
    <VStack flex={1}w={"full"}
    h={"full"}>
      <Image
        alt="Login Image"
        boxSize="md"
        objectFit="cover"
        borderRadius="md"
        src={
          "https://images.unsplash.com/photo-1529651737248-dad5e287768e?auto=format&fit=crop&q=80&w=1965&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      />
    </VStack>
  );
}
