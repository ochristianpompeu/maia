import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Heading,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { BsBuildingAdd } from "react-icons/bs";
import { OrgAddDrawerContent } from "./OrgAddDrawerContent";

export function OrgHeaderAndDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef() as any;

  function handleOnAddClose() {
    onClose;
  }
  return (
    <>
      <HStack justifyContent="space-between" w="full">
        <Heading fontSize={{ base: "2xl" }} w="full">
          Empresas
        </Heading>
        <IconButton
          display={{ md: "none" }}
          aria-label="Add Org"
          colorScheme="purple"
          onClick={onOpen}
          icon={<AddIcon />}
        />
        <Button
          colorScheme="purple"
          variant="outline"
          leftIcon={<BsBuildingAdd />}
          onClick={onOpen}
          display={{ base: "none", md: "inline-flex" }}
        >
          Adicionar
        </Button>
      </HStack>
      <Drawer
        size={{ base: "full", md: "md" }}
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={firstField}
      >
        <DrawerOverlay />
        <DrawerContent>
          <OrgAddDrawerContent
            initialRef={firstField}
            onClose={handleOnAddClose}
          />
        </DrawerContent>
      </Drawer>
    </>
  );
}
