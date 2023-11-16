"use client";
import { useOrgs } from "@/app/hooks/useOrgs";
import { useUser } from "@/app/hooks/useUser";
import { OrgAddDrawerContentProps } from "@/lib/interfaces";
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
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, Fragment, useState } from "react";
import { BsBuildingFillAdd } from "react-icons/bs";

export function OrgAddDrawerContent(props: OrgAddDrawerContentProps) {
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const textColor = useColorModeValue("purple.600", "purple.100");
  const borderColor = "purple.600";
  const toast = useToast();
  const router = useRouter();
  const { user } = useUser();
  const { updateOrgs } = useOrgs();

  function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.value;
    setName(name);
  }

  function handleRouter() {
    updateOrgs()
    router.refresh();
  }

  function handleChangeTextArea(event: ChangeEvent<HTMLTextAreaElement>) {
    const description = event.target.value;
    setDescription(description);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const userAdmin = user._id;
    setLoading(true);

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
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        // router.push("/organization");
        handleRouter();
      } else {
        const responseError = await responseCreateOrg.json();
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
      <DrawerHeader textColor={textColor} borderBottomWidth="1px">
        Cadastre sua empresa
      </DrawerHeader>

      <DrawerBody>
        <form id="createOrgForm" onSubmit={handleSubmit}>
          <FormLabel textColor={textColor} pt="4" htmlFor="name">
            Nome da Empresa
          </FormLabel>
          <Input
            ref={props.initialRef}
            id="name"
            name="name"
            placeholder="Nome da Empresa..."
            focusBorderColor={borderColor}
            onChange={handleChangeInput}
            value={name}
          />
          <FormLabel textColor={textColor} pt="4" htmlFor="description">
            Descrição
          </FormLabel>
          <Textarea
            id="description"
            name="description"
            placeholder="Digite uma descrição para a sua empresa..."
            focusBorderColor={borderColor}
            value={description}
            size="md"
            onChange={handleChangeTextArea}
          />
        </form>
      </DrawerBody>

      <DrawerFooter>
        <ButtonGroup
          colorScheme="purple"
          variant="outline"
          onClick={props.onClose}
          isAttached
        >
          <IconButton
            type="submit"
            form="createOrgForm"
            aria-label="Save Org"
            icon={<BsBuildingFillAdd />}
            onClick={props.onClose}
          />
          <Button
            type="submit"
            form="createOrgForm"
            // onClick={props.onClose}
            isLoading={loading}
          >
            Salvar
          </Button>
        </ButtonGroup>
      </DrawerFooter>
    </Fragment>
  );
}
