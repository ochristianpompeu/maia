"use client";
import { useOrgs } from "@/app/hooks/useOrgs";
import { useUser } from "@/app/hooks/useUser";
import { AddIcon } from "@chakra-ui/icons";
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
import { ChangeEvent, Fragment, useRef, useState } from "react";
import { BsBuildingAdd, BsBuildingFillAdd } from "react-icons/bs";
import { TbReload } from "react-icons/tb";

export function AddDrawerContent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const mainColor = useColorModeValue("purple.600", "purple.200");
  const bgColorDrawer = useColorModeValue("whiteAlpha.900", "blackAlpha.900");
  const borderColor = "purple.600";
  const { user } = useUser();
  const { updateOrgs } = useOrgs();
  const router = useRouter();
  const toast = useToast();
  const firstField = useRef() as any;

  function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.value;
    setName(name);
  }

  function handleRouter() {
    updateOrgs();
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
      <ButtonGroup
        colorScheme="purple"
        variant="outline"
        display={{ md: "none" }}
        isAttached
        size="sm"
      >
        <IconButton aria-label="Add" onClick={onOpen} icon={<AddIcon />} />
        <IconButton
          onClick={updateOrgs}
          aria-label="Refresh"
          icon={<TbReload />}
        />
      </ButtonGroup>
      <ButtonGroup
        variant="outline"
        colorScheme="purple"
        display={{ base: "none", md: "inline-flex" }}
        isAttached
        size="sm"
      >
        <IconButton
          onClick={onOpen}
          aria-label="Add"
          icon={<BsBuildingAdd />}
        />
        <Button onClick={onOpen}>Adicionar</Button>
        <IconButton
          onClick={updateOrgs}
          aria-label="Refresh"
          icon={<TbReload />}
        />
      </ButtonGroup>
      <Drawer
        size={{ base: "xs", md: "sm" }}
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={firstField}
      >
        <DrawerOverlay />
        <DrawerContent bg={bgColorDrawer} height="auto">
          <DrawerCloseButton />
          <DrawerHeader textColor={mainColor} borderBottomWidth="1px">
            Cadastre sua empresa
          </DrawerHeader>

          <DrawerBody>
            <form id="create" onSubmit={handleSubmit}>
              <FormLabel textColor={mainColor} pt="4" htmlFor="name">
                Nome da Empresa
              </FormLabel>
              <Input
                ref={firstField}
                id="name"
                name="name"
                placeholder="Nome da Empresa..."
                focusBorderColor={borderColor}
                onChange={handleChangeInput}
                value={name}
              />
              <FormLabel textColor={mainColor} pt="4" htmlFor="description">
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

          <DrawerFooter borderTopWidth="1px">
            <ButtonGroup
              colorScheme="purple"
              variant="outline"
              onClick={onClose}
              isAttached
            >
              <IconButton
                type="submit"
                form="create"
                aria-label="Save Org"
                icon={<BsBuildingFillAdd />}
                onClick={onClose}
              />
              <Button
                type="submit"
                form="create"
                onClick={onClose}
                isLoading={loading}
              >
                Salvar
              </Button>
            </ButtonGroup>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}
