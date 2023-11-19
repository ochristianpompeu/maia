"use client";
import { useServices } from "@/app/hooks/useServices";
import { ServiceProps } from "@/lib/interfaces";
import {
  Button,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  IconButton,
  Input,
  Select,
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { Fragment, useState } from "react";
import { TbTrash } from "react-icons/tb";

export function DeleteDrawer(props: ServiceProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef() as any;
  const name = props.name;
  const description = props.description;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const mainColor = useColorModeValue("purple.600", "purple.200");
  const mainColor = "purple.600";
  const bgColorDrawer = useColorModeValue("whiteAlpha.900", "blackAlpha.900");
  const toast = useToast();
  const router = useRouter();
  const { updateServices } = useServices();

  function handleServices() {
    updateServices();
    onClose();
    router.refresh();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      const responseDeleteService = await fetch(
        `/api/service/?id=${props._id}`,
        {
          method: "DELETE",
        }
      );

      setLoading(false);

      if (responseDeleteService.ok) {
        toast({
          title: "Sucesso",
          description: "Registro removido com sucesso",
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        handleServices();
      } else {
        const responseError = await responseDeleteService.json();
        setError(responseError);
        toast({
          title: "Ocorreu um erro",
          description: error,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        handleServices();
      }
    } catch (erro: any) {
      setLoading(false);
      setError(erro);
      toast({
        title: "Ocorreu um erro",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      handleServices();
    }
  }

  return (
    <Fragment>
      <IconButton
        colorScheme="orange"
        aria-label="Delete"
        onClick={onOpen}
        icon={<TbTrash />}
      />
      <Drawer
        size={{ base: "xs", md: "sm" }}
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={firstField}
      >
        <DrawerOverlay />
        <DrawerContent bg={bgColorDrawer} height="auto" overflowY="auto">
          <DrawerCloseButton color="white" />
          <DrawerHeader
            bgColor={mainColor}
            textColor="white"
            borderBottomWidth="1px"
          >
            Deletar Serviço?
          </DrawerHeader>

          <DrawerBody>
            <form id="delete" onSubmit={handleSubmit}>
              <FormLabel textColor={mainColor} htmlFor="orgId">
                Empresa
              </FormLabel>
              <Select
                id="orgId"
                name="orgId"
                textColor={mainColor}
                value={props.orgId}
                disabled
              >
                <option value={props.orgId}>{props.org?.name}</option>
              </Select>
              <FormLabel textColor={mainColor} pt="4" htmlFor="name">
                Nome do Serviço
              </FormLabel>
              <Input
                ref={firstField}
                id="name"
                name="name"
                focusBorderColor={mainColor}
                value={name}
                disabled
                borderColor={mainColor}
                variant="filled"
              />
              <FormLabel textColor={mainColor} pt="4" htmlFor="description">
                Descrição
              </FormLabel>
              <Textarea
                id="description"
                name="description"
                focusBorderColor={mainColor}
                value={description}
                size="md"
                disabled
                borderColor={mainColor}
                variant="filled"
              />
            </form>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px" borderTopColor={mainColor}>
            <ButtonGroup colorScheme="red" variant="outline" isAttached>
              <IconButton
                aria-label="delete service"
                form="delete"
                type="submit"
                // onClick={onClose}
                isLoading={loading}
                icon={<TbTrash />}
              />
              <Button
                type="submit"
                form="delete"
                // onClick={onClose}
                isLoading={loading}
              >
                Deletar
              </Button>
            </ButtonGroup>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}
