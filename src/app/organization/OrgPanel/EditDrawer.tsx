"use client";
import { useOrgs } from "@/app/hooks/useOrgs";
import { OrgEditDrawerContentProps } from "@/lib/interfaces";
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
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, Fragment, useState } from "react";
import { TbEdit, TbRefresh } from "react-icons/tb";

export function EditDrawer(props: OrgEditDrawerContentProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { updateOrgs } = useOrgs();
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const firstField = React.useRef() as any;
  const toast = useToast();
  const router = useRouter();
  const mainColor = useColorModeValue("purple.600", "purple.200");
  const bgColorDrawer = useColorModeValue("whiteAlpha.900", "blackAlpha.900");
  const borderColor = "purple.600";

  function handleRouter() {
    updateOrgs();
    router.refresh();
  }

  function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.value;
    setName(name);
  }

  function handleChangeTextArea(event: ChangeEvent<HTMLTextAreaElement>) {
    const description = event.target.value;
    setDescription(description);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newName = name;
    const newDescription = description;
    if (!name) {
      setError("O campo nome não pode ficar em branco");
      toast({
        title: "Ocorreu um erro",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/organization/" + props.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newName,
          newDescription,
        }),
      });

      setLoading(false);

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: "Dados atualizados com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });

        handleRouter();
      } else {
        const responseError = await response.json();
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
        colorScheme="purple"
        aria-label="Edit"
        onClick={onOpen}
        icon={<TbEdit />}
      />
      <Drawer
        size={{ base: "xs", md: "sm" }}
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={firstField}
      >
        <DrawerOverlay />
        <DrawerContent bg={bgColorDrawer} height="auto" overflowY="auto">
          <DrawerCloseButton />
          <DrawerHeader textColor={mainColor} borderBottomWidth="1px">
            Edição do cadastro da empresa
          </DrawerHeader>

          <DrawerBody>
            <form id="alter" onSubmit={handleSubmit}>
              <FormLabel pt="4" htmlFor="name" textColor={mainColor}>
                Nome da Empresa
              </FormLabel>
              <Input
                ref={firstField}
                id="name"
                name="name"
                placeholder="Nome da Empresa..."
                focusBorderColor={mainColor}
                value={name}
                onChange={handleChangeInput}
              />
              <FormLabel pt="4" htmlFor="description" textColor={mainColor}>
                Descrição
              </FormLabel>
              <Textarea
                id="description"
                name="description"
                placeholder="Digite uma descrição para a sua empresa..."
                focusBorderColor={mainColor}
                value={description}
                size="md"
                onChange={handleChangeTextArea}
              />
            </form>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <ButtonGroup colorScheme="purple" variant="outline" isAttached>
              <IconButton
                aria-label="alter service"
                type="submit"
                form="alter"
                onClick={onClose}
                isLoading={loading}
                icon={<TbRefresh />}
              />
              <Button
                type="submit"
                form="alter"
                onClick={onClose}
                isLoading={loading}
              >
                Atualizar
              </Button>
            </ButtonGroup>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}
