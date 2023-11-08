import { AddIcon } from "@chakra-ui/icons";
import { Button, HStack, Heading, IconButton } from "@chakra-ui/react";
import { BsBuildingAdd } from "react-icons/bs";

export function ServiceHeader() {
  return (
    <HStack
      justifyContent="space-between"
      w="full"
      maxW={{ base: "full", md: "xs" }}
    >
      <Heading textColor="purple.600" fontSize={{ base: "2xl" }} w="full">
        Serviços
      </Heading>
      <IconButton
        display={{ md: "none" }}
        aria-label="Add Org"
        colorScheme="purple"
        // onClick={onOpen}
        icon={<AddIcon />}
      />
      <Button
        colorScheme="purple"
        variant="outline"
        leftIcon={<BsBuildingAdd />}
        // onClick={onOpen}
        display={{ base: "none", md: "inline-flex" }}
      >
        Adicionar
      </Button>
    </HStack>
  );
}
