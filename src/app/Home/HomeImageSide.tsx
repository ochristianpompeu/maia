import { Flex, Image, useColorMode, useColorModeValue } from "@chakra-ui/react";

export default function HomeImageSide() {
  const { toggleColorMode, colorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50");
  return (
    <Flex flex={1}>
      <Image
        alt={"Login Image"}
        objectFit={"cover"}
        fallbackSrc="https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        src="https://firebasestorage.googleapis.com/v0/b/maia-1286a.appspot.com/o/logos%2Fmaia(2).png?alt=media&token=e18bba9e-fc73-482d-8886-e0904395a78a&_gl=1*4gvz21*_ga*MTc3MTAyMTk3OC4xNjkzODQ2MTg0*_ga_CW55HF8NVT*MTY5ODk0ODAxMy4zLjEuMTY5ODk0OTI1Ni4zOS4wLjA."
        maxH="full"
        maxW="full"
      />
    </Flex>
  );
}
