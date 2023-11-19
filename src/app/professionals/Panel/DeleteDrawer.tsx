"use client";
import { useProfessionals } from "@/app/hooks/useProfessionals";
import { ProfessionalProps } from "@/lib/interfaces";
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

export function DeleteDrawer(props: ProfessionalProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { updateProfessionals } = useProfessionals();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const mainColor = "purple.600"
  const bgColorDrawer = useColorModeValue("whiteAlpha.900", "blackAlpha.800");
  const toast = useToast();
  const router = useRouter();

  function handleRouter() {
    updateProfessionals();
    onClose();
    router.refresh();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      const responseDelete = await fetch(`/api/professional/?id=${props._id}`, {
        method: "DELETE",
      });

      setLoading(false);

      if (responseDelete.ok) {
        toast({
          title: "Sucesso",
          description: "Registro removido com sucesso",
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        handleRouter();
      } else {
        const responseError = await responseDelete.json();
        setError(responseError);
        toast({
          title: "Ocorreu um erro",
          description: error,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        handleRouter();
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
      handleRouter();
    }
  }

  return (
    <Fragment>
      <IconButton
        icon={<TbTrash />}
        aria-label="Delete Professional"
        colorScheme="red"
        onClick={onOpen}
      />
      <Drawer
        size={{ base: "xs", md: "sm" }}
        isOpen={isOpen}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent bg={bgColorDrawer} h="auto" overflowY="auto">
          <DrawerCloseButton color="white" />
          <DrawerHeader
            bgColor={mainColor}
            textColor="white"
            borderBottomWidth="1px"
          >
            Deletar Profissional?
          </DrawerHeader>

          <DrawerBody>
            <form id="deleteForm" onSubmit={handleSubmit}>
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
                Nome
              </FormLabel>
              <Input
                ref={props.initialRef}
                id="name"
                name="name"
                focusBorderColor={mainColor}
                value={props.name}
                disabled
                borderColor={mainColor}
                variant="filled"
              />
              <FormLabel textColor={mainColor} pt="4" htmlFor="email">
                E-mail
              </FormLabel>
              <Input
                id="email"
                name="email"
                placeholder="E-mail..."
                focusBorderColor={mainColor}
                value={props.email}
                type="email"
                disabled
                variant="filled"
              />
              <FormLabel textColor={mainColor} pt="4" htmlFor="func">
                Função
              </FormLabel>
              <Input
                id="func"
                name="func"
                placeholder="Função..."
                focusBorderColor={mainColor}
                value={props.function}
                type="text"
                variant="filled"
                disabled
              />
              <FormLabel textColor={mainColor} pt="4" htmlFor="image">
                URL da Imagem
              </FormLabel>
              <Input
                id="image"
                name="image"
                placeholder="preencha com a url da imagem"
                focusBorderColor={mainColor}
                value={props.image}
                type="url"
                variant="filled"
                disabled
              />
              <FormLabel textColor={mainColor} pt="4" htmlFor="bio">
                Sobre
              </FormLabel>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Fale um pouco sobre o profissional..."
                focusBorderColor={mainColor}
                value={props.bio}
                size="md"
                disabled
                variant="filled"
              />
            </form>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px" borderTopColor={mainColor}>
            <ButtonGroup colorScheme="red" variant="outline" isAttached>
              <IconButton
                aria-label="delete service"
                form="deleteForm"
                type="submit"
                // onClick={onClose}
                isLoading={loading}
                icon={<TbTrash />}
              />
              <Button
                type="submit"
                form="deleteForm"
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
