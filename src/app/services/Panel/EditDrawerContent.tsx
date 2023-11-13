"use client";
import { applicationConfig } from "@/lib/config";
import { query } from "@/lib/genericFunctions";
import { OrgProps, ServiceProps } from "@/lib/interfaces";
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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, Fragment, use, useState } from "react";
import { TbRefresh } from "react-icons/tb";

export function EditDrawerContent(props: ServiceProps) {
  const { data: session } = useSession();
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [orgId, setOrgId] = useState(props.orgId);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const mainColor = "purple.600";

  const { user } = use(
    query("user", () =>
      fetch(applicationConfig.baseUrl + "/api/user/" + session?.user?.email, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json())
    )
  );

  const { orgs } = use(
    query("orgs", () =>
      fetch(
        applicationConfig.baseUrl + "/api/organization/byUser/" + user!._id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json())
    )
  );

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
    if (!name) {
      setError("O campo nome não pode ficar em branco");
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

    try {
      setLoading(true);
      const responseUpdateService = await fetch("/api/service/" + props._id, {
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

      if (responseUpdateService.ok) {
        toast({
          title: "Sucesso",
          description: "Dados atualizados com sucesso",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        });

        router.refresh();
      } else {
        const responseError = await responseUpdateService.json();
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
      <DrawerCloseButton />
      <DrawerHeader textColor={mainColor} borderBottomWidth="1px">
        Edição do Cadastro do Serviço
      </DrawerHeader>

      <DrawerBody>
        <form id="alterServiceForm" onSubmit={handleSubmit}>
          <FormLabel textColor={mainColor} htmlFor="orgId">
            Select Owner
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

      <DrawerFooter>
        <Button
          colorScheme="purple"
          variant="outline"
          type="submit"
          form="alterServiceForm"
          onClick={props.onClose}
          isLoading={loading}
          leftIcon={<TbRefresh />}
        >
          Atualizar
        </Button>
      </DrawerFooter>
    </Fragment>
  );
}
