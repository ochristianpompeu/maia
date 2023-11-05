"use client";

import SidebarDashboardTest from "@/components/SideBarDashboard/SidebarDashboardTest";
import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormLabel,
  HStack,
  Heading,
  IconButton,
  Input,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { BsBuildingAdd } from "react-icons/bs";
import { OrganizationTable } from "./OrganizationTable";

export default function Organization() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef() as any;
  const bgBoxColor = useColorModeValue("white", "gray.800");
  
  function handleClick() {
    return;
  }

  return (
    <SidebarDashboardTest>
      <Stack
        p={[0, 4]}
        direction={{ base: "column", md: "row" }}
        spacing={[2, 8]}
        w="full"
      >
        <Flex flex={1} w="full" h="full" alignItems={["center", "flex-start"]}>
          <Stack
            direction="column"
            padding={4}
            // border="1px"
            borderRadius="lg"
            mx={{ base: "auto", md: "0.5" }}
            bgColor={bgBoxColor}
          >
            <HStack justifyContent="space-between" w="full">
              <Heading fontSize={{ base: "2xl" }} w="full">
                Empresa
              </Heading>
              <IconButton
                display={{ md: "none" }}
                aria-label="Add Org"
                colorScheme="purple"
                icon={<AddIcon />}
              />
              <Button
                colorScheme="purple"
                variant="outline"
                leftIcon={<BsBuildingAdd />}
                onClick={onOpen}
                // size={{ base: "sm", md: "md" }}
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
                <DrawerCloseButton />
                <DrawerHeader textColor="purple.500" borderBottomWidth="1px">
                  Cadastre sua empresa
                </DrawerHeader>

                <DrawerBody>
                  <form
                    id="createOrgForm"
                    onSubmit={(e) => {
                      e.preventDefault();
                      console.log("submitted");
                    }}
                  >
                    <FormLabel htmlFor="name">Nome da Empresa</FormLabel>
                    <Input
                      ref={firstField}
                      id="name"
                      name="name"
                      placeholder="Nome da Empresa..."
                      focusBorderColor="purple.400"
                    />
                  </form>
                </DrawerBody>

                <DrawerFooter>
                  <Button
                    colorScheme="purple"
                    variant="outline"
                    type="submit"
                    form="createOrgForm"
                  >
                    Salvar
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            <OrganizationTable />
          </Stack>
        </Flex>
        {/* <Flex flex={1} w="full" h="full" justifyContent="center">
          <Text w="full">Coluna1</Text>
        </Flex> */}
      </Stack>
    </SidebarDashboardTest>
  );
}
