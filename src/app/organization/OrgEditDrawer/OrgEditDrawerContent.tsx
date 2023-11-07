"use client";
import {
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerFooter,
  DrawerHeader,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, Fragment, useState } from "react";

interface OrgEditDrawerContentProps {
  name: string;
  id: string;
  initialRef: React.LegacyRef<HTMLInputElement> | undefined;
}

export function OrgEditDrawerContent(props: OrgEditDrawerContentProps) {
  const firstField = React.useRef() as any;
  const [name, setName] = useState(props.name);
  const [error, setError] = useState("");
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.value;
    setName(name);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault;
    const newName = name;
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
      setLoading(false);
      const responseUpdateOrg = await fetch("/api/organization/" + props.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newName,
        }),
      });

      setLoading(false);

      if (responseUpdateOrg.ok) {
        router.push("/organization");
      } else {
        const responseError = await responseUpdateOrg.json();
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
      <DrawerHeader textColor="purple.500" borderBottomWidth="1px">
        Edição do cadastro da empresa
      </DrawerHeader>

      <DrawerBody>
        <form id="alterOrgForm" onSubmit={handleSubmit}>
          <FormLabel htmlFor="name">Nome da Empresa</FormLabel>
          <Input
            ref={props.initialRef}
            id="name"
            name="name"
            placeholder="Nome da Empresa..."
            focusBorderColor="purple.400"
            value={name}
            onChange={handleChange}
          />
        </form>
      </DrawerBody>

      <DrawerFooter>
        <Button
          colorScheme="purple"
          variant="outline"
          type="submit"
          form="alterOrgForm"
          onClick={handleSubmit}
        >
          Atualizar
        </Button>
      </DrawerFooter>
    </Fragment>
  );
}
