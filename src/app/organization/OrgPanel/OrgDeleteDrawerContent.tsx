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
import React, { Fragment, useState } from "react";
import { TbTrash } from "react-icons/tb";

interface OrgDeleteDrawerContent extends OrgEditDrawerContentProps {}

export function OrgDeleteDrawerContent(props: OrgDeleteDrawerContent) {
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const mainColor = "red.600";
  const toast = useToast();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      console.log("ID org: ", props.id);
      const responseDeleteOrg = await fetch(
        `/api/organization/?id=${props.id}`,
        {
          method: "DELETE",
        }
      );

      setLoading(false);

      if (responseDeleteOrg.ok) {
        toast({
          title: "Sucesso",
          description: "Registro removido com sucesso",
          status: "warning",
          duration: 9000,
          isClosable: true,
          position: "top",
        });

        router.refresh();
      } else {
        const responseError = await responseDeleteOrg.json();
        setError(responseError);
        toast({
          title: "Ocorreu um erro",
          description: error,
          status: "error",
          duration: 9000,
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
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  }

  return (
    <Fragment>
      <DrawerCloseButton color="white" />
      <DrawerHeader bgColor={mainColor} textColor="white" borderBottomWidth="1px">
        Deletar Empresa?
      </DrawerHeader>

      <DrawerBody>
        <form id="deleteOrgForm" onSubmit={handleSubmit}>
          <FormLabel pt="4" htmlFor="name">
            Nome da Empresa
          </FormLabel>
          <Input
            ref={props.initialRef}
            id="name"
            name="name"
            focusBorderColor={mainColor}
            value={name}
            disabled
            borderColor={mainColor}
            variant="filled"
          />
          <FormLabel pt="4" htmlFor="description">
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
            aria-label="delete org"
            form="deleteOrgForm"
            type="submit"
            onClick={props.onClose}
            isLoading={loading}
            icon={<TbTrash />}
          />
          <Button
            type="submit"
            form="deleteOrgForm"
            onClick={props.onClose}
            isLoading={loading}
          >
            Deletar
          </Button>
        </ButtonGroup>
      </DrawerFooter>
    </Fragment>
  );
}
