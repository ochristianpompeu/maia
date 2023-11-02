import {
  Flex,
  Image,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react";

export default function HomeImageSide() {
  const { toggleColorMode, colorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50");
  return (
    <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          fallbackSrc="https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          src={
            "https://th.bing.com/th/id/OIG.C9.ju41jGa8d072rBQeG?pid=ImgGn"
            
          }
        />
      </Flex>
  );
}
