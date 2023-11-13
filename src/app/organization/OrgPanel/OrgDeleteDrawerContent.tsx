"use client";
import { OrgEditDrawerContentProps } from "@/lib/interfaces";
import {
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerFooter,
  DrawerHeader,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { Fragment, useState } from "react";

interface OrgDeleteDrawerContent extends OrgEditDrawerContentProps {}

export function OrgDeleteDrawerContent(props: OrgDeleteDrawerContent) {
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault;

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
      <DrawerHeader bgColor="red.400" textColor="white" borderBottomWidth="1px">
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
            focusBorderColor="red.400"
            value={name}
            disabled
            borderColor="red.400"
            variant="filled"
          />
          <FormLabel pt="4" htmlFor="description">
            Descrição
          </FormLabel>
          <Textarea
            id="description"
            name="description"
            focusBorderColor="red.400"
            value={description}
            size="md"
            disabled
            borderColor="red.400"
            variant="filled"
          />
        </form>
      </DrawerBody>

      <DrawerFooter>
        <Button
          colorScheme="red"
          variant="outline"
          type="submit"
          form="deleteOrgForm"
          onClick={props.onClose}
          isLoading={loading}
        >
          Deletar
        </Button>
      </DrawerFooter>
    </Fragment>
  );
}
