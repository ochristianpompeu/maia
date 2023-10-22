import { Flex, Image } from "@chakra-ui/react";

export default function ImageSide() {
  return (
    <Flex flex={1}>
      <Image
        alt={"Login Image"}
        objectFit={"cover"}
        src={
          "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      />
    </Flex>
  );
}
