"use client";
import { OrgEditDrawerContentProps } from "@/lib/interfaces";
import {
  Button,
  ButtonGroup,
  DrawerBody,
  DrawerCloseButton,
  DrawerFooter,
  DrawerHeader,
  FormLabel,
  IconButton,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, Fragment, useState } from "react";
import { TbRefresh } from "react-icons/tb";

export function OrgEditDrawerContent(props: OrgEditDrawerContentProps) {
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const mainColor = "purple.600";

  function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.value;
    setName(name);
  }

  function handleChangeTextArea(event: ChangeEvent<HTMLTextAreaElement>) {
    const description = event.target.value;
    setDescription(description);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault;
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
      const responseUpdateOrg = await fetch("/api/organization/" + props.id, {
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

      if (responseUpdateOrg.ok) {
        toast({
          title: "Sucesso",
          description: "Dados atualizados com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });

        router.refresh();
      } else {
        const responseError = await responseUpdateOrg.json();
        setError(responseError);
        toast({
          title: "Ocorreu um erro",
          description: error,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
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
    }
  }

  return (
    <Fragment>
      <DrawerCloseButton />
      <DrawerHeader textColor="purple.500" borderBottomWidth="1px">
        Edição do cadastro da empresa
      </DrawerHeader>

      <DrawerBody>
        <form id="alterForm" onSubmit={handleSubmit}>
          <FormLabel pt="4" htmlFor="name" textColor={mainColor}>
            Nome da Empresa
          </FormLabel>
          <Input
            ref={props.initialRef}
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
            form="alterForm"
            onClick={props.onClose}
            isLoading={loading}
            icon={<TbRefresh />}
          />
          <Button
            type="submit"
            form="alterForm"
            onClick={props.onClose}
            isLoading={loading}
          >
            Atualizar
          </Button>
        </ButtonGroup>
      </DrawerFooter>
    </Fragment>
  );
}
