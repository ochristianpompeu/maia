"use client";
import { useOrgs } from "@/app/hooks/useOrgs";
import { OrgEditDrawerContentProps } from "@/lib/interfaces";
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
import React, { Fragment, useState } from "react";
import { TbTrash } from "react-icons/tb";

interface OrgDeleteDrawerContent extends OrgEditDrawerContentProps {}

export function DeleteDrawer(props: OrgDeleteDrawerContent) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { updateOrgs } = useOrgs();
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const firstField = React.useRef() as any;
  const toast = useToast();
  const router = useRouter();
  const mainColor = useColorModeValue("purple.600", "purple.200");
  const bgColorDrawer = useColorModeValue("whiteAlpha.900", "blackAlpha.900");

  function handleRouter() {
    updateOrgs();
    router.refresh();
  }

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

        handleRouter();
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
        handleRouter();
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
      handleRouter();
    }
  }

  return (
    <Fragment>
      <IconButton
        colorScheme="orange"
        aria-label="Delete"
        onClick={onOpen}
        icon={<TbTrash />}
      />
      <Drawer
        size={{ base: "xs", md: "sm" }}
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={firstField}
      >
        <DrawerOverlay />
        <DrawerContent bg={bgColorDrawer} height="auto" overflowY="auto">
          <DrawerCloseButton color="white" />
          <DrawerHeader
            bgColor={mainColor}
            textColor="white"
            borderBottomWidth="1px"
          >
            Deletar Empresa?
          </DrawerHeader>

          <DrawerBody>
            <form id="delete" onSubmit={handleSubmit}>
              <FormLabel pt="4" htmlFor="name">
                Nome da Empresa
              </FormLabel>
              <Input
                ref={firstField}
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
                form="delete"
                type="submit"
                onClick={onClose}
                isLoading={loading}
                icon={<TbTrash />}
              />
              <Button
                type="submit"
                form="delete"
                onClick={onClose}
                isLoading={loading}
              >
                Deletar
              </Button>
            </ButtonGroup>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}
