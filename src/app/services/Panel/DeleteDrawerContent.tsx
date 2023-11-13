"use client";
import { ServiceProps } from "@/lib/interfaces";
import {
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerFooter,
  DrawerHeader,
  FormLabel,
  Input,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { Fragment, useState } from "react";
import { TbTrash } from "react-icons/tb";

export function DeleteDrawerContent(props: ServiceProps) {
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [orgId, setOrgId] = useState(props.orgId);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const mainColor = "red.600";
  const toast = useToast();
  const router = useRouter();

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
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        router.refresh();
        return;
      } else {
        const responseError = await responseDeleteService.json();
        setError(responseError);
        toast({
          title: "Ocorreu um erro",
          description: error,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        return;
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
      return;
    }
  }

  return (
    <Fragment>
      <DrawerCloseButton color="white" />
      <DrawerHeader
        bgColor={mainColor}
        textColor="white"
        borderBottomWidth="1px"
      >
        Deletar Empresa?
      </DrawerHeader>

      <DrawerBody>
        <form id="deleteForm" onSubmit={handleSubmit}>
          <FormLabel textColor={mainColor} htmlFor="orgId">
            Select Owner
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
            ref={props.initialRef}
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
          form="deleteForm"
          onClick={props.onClose}
          isLoading={loading}
          leftIcon={<TbTrash />}
        >
          Deletar
        </Button>
      </DrawerFooter>
    </Fragment>
  );
}
