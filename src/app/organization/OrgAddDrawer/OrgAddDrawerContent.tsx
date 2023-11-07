"use client";
import { OrgAddDrawerContentProps } from "@/lib/interfaces";
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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, Fragment, useState } from "react";

export function OrgAddDrawerContent(props: OrgAddDrawerContentProps) {
  const { data: session } = useSession();
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();
  const router = useRouter();

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
    const responserUser = await fetch("/api/user/" + session?.user?.email, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { user } = await responserUser.json();
    console.log("User: ", user);
    const userAdmin = "65443103b31c7cbd35d04ac1";

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

      const responseCreateOrg = await fetch("/api/organization/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          userAdmin,
        }),
      });

      setLoading(false);

      if (responseCreateOrg.ok) {
        setName("");
        setDescription("");
        toast({
          title: "Sucesso",
          description: "Empresa cadastrada com sucesso",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        });

        router.push("/organization");
      } else {
        const responseError = await responseCreateOrg.json();
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
        Cadastre sua empresa
      </DrawerHeader>

      <DrawerBody>
        <form id="createOrgForm" onSubmit={handleSubmit}>
          <FormLabel textColor="purple.600" pt="4" htmlFor="name">
            Nome da Empresa
          </FormLabel>
          <Input
            ref={props.initialRef}
            id="name"
            name="name"
            placeholder="Nome da Empresa..."
            focusBorderColor="purple.600"
            onChange={handleChangeInput}
            value={name}
          />
          <FormLabel textColor="purple.600" pt="4" htmlFor="description">
            Descrição
          </FormLabel>
          <Textarea
            id="description"
            name="description"
            placeholder="Digite uma descrição para a sua empresa..."
            focusBorderColor="purple.400"
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
          form="createOrgForm"
          onClick={handleSubmit}
          isLoading={loading}
        >
          Salvar
        </Button>
      </DrawerFooter>
    </Fragment>
  );
}
