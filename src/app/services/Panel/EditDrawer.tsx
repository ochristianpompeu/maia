"use client";
import { useOrgs } from "@/app/hooks/useOrgs";
import { useServices } from "@/app/hooks/useServices";
import { OrgProps, ServiceProps } from "@/lib/interfaces";
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
import React, { ChangeEvent, Fragment, useRef, useState } from "react";
import { TbEdit, TbRefresh } from "react-icons/tb";

export function EditDrawer(props: ServiceProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef() as any;
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [orgId, setOrgId] = useState(props.org?._id);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { orgs } = useOrgs();
  const { updateServices } = useServices();
  const toast = useToast();
  const router = useRouter();
  const mainColor = useColorModeValue("purple.600", "purple.200");
  const bgColorDrawer = useColorModeValue("whiteAlpha.900", "blackAlpha.900");

  function handleServices() {
    updateServices();
    onClose();
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

  function handleChangeSelect(event: ChangeEvent<HTMLSelectElement>) {
    const orgId = event.target.value;
    setOrgId(orgId);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newName = name;
    const newDescription = description;
    const newOrgId = orgId;
    if (orgId === "#") {
      setError("Selecione a empresa");
      toast({
        title: "Empresa não selecionada",
        description: "Selecione a empresa",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
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
      const responseUpdate = await fetch("/api/service/" + props._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newName,
          newDescription,
          newOrgId,
        }),
      });

      setLoading(false);

      if (responseUpdate.ok) {
        toast({
          title: "Sucesso",
          description: "Dados atualizados com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });

        handleServices();
      } else {
        const responseError = await responseUpdate.json();
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
            Edição do Cadastro do Serviço
          </DrawerHeader>

          <DrawerBody>
            <form id="alterForm" onSubmit={handleSubmit}>
              <FormLabel textColor={mainColor} htmlFor="orgId">
                Selcione a Empresa
              </FormLabel>
              <Select
                id="orgId"
                name="orgId"
                textColor={mainColor}
                value={orgId}
                onChange={handleChangeSelect}
              >
                {orgs?.map((org: OrgProps) => (
                  <option key={org._id!} value={org._id!}>
                    {org.name!}
                  </option>
                ))}
              </Select>
              <FormLabel textColor={mainColor} pt="4" htmlFor="name">
                Nome do Serviço
              </FormLabel>
              <Input
                ref={props.initialRef}
                id="name"
                name="name"
                placeholder="Nome do Serviço..."
                focusBorderColor={mainColor}
                value={name}
                onChange={handleChangeInput}
              />
              <FormLabel textColor={mainColor} pt="4" htmlFor="description">
                Descrição
              </FormLabel>
              <Textarea
                id="description"
                name="description"
                placeholder="Digite uma descrição para o serviços prestado..."
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
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}
