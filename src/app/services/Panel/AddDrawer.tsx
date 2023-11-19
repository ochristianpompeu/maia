import { useOrgs } from "@/app/hooks/useOrgs";
import { useServices } from "@/app/hooks/useServices";
import { OrgProps } from "@/lib/interfaces";
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
  Select,
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, Fragment, useRef, useState } from "react";
import { RiSaveLine, RiServiceLine } from "react-icons/ri";
import { TbReload } from "react-icons/tb";

export function AddDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { orgs } = useOrgs();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [orgId, setOrgId] = useState(orgs[0]?._id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();
  const router = useRouter();
  const { updateServices } = useServices();

  const mainColor = useColorModeValue("purple.600", "purple.200");
  const bgColorDrawer = useColorModeValue("whiteAlpha.900", "blackAlpha.900");
  const firstField = useRef() as any;

  function handleRouter() {
    updateServices();
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

      const responseCreate = await fetch("/api/service/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          orgId,
        }),
      });

      setLoading(false);

      if (responseCreate.ok) {
        setName("");
        setDescription("");
        toast({
          title: "Sucesso",
          description: "Serviço cadastrado com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });

        handleRouter();
      } else {
        const responseError = await responseCreate.json();
        setError(responseError);
        toast({
          title: "Ocorreu um erro",
          description: error,
          status: "error",
          duration: 3000,
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
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      handleRouter();
    }
  }

  return (
    <Fragment>
      <ButtonGroup
        variant="outline"
        colorScheme="purple"
        display={{ base: "none", md: "inline-flex" }}
        isAttached
        size="sm"
      >
        <IconButton
          onClick={onOpen}
          aria-label="Add Service"
          icon={<RiServiceLine />}
        />
        <Button onClick={onOpen}>Adicionar</Button>
        <IconButton
          onClick={updateServices}
          aria-label="Refresh"
          icon={<TbReload />}
        />
      </ButtonGroup>
      <ButtonGroup
        variant="outline"
        colorScheme="purple"
        display={{ md: "none" }}
        isAttached
        size="sm"
      >
        <IconButton
          onClick={onOpen}
          aria-label="Add Service"
          icon={<AddIcon />}
        />
        <IconButton
          onClick={updateServices}
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
        <DrawerContent bg={bgColorDrawer} height="auto" overflowY="auto">
          <DrawerCloseButton />
          <DrawerHeader textColor={mainColor} borderBottomWidth="1px">
            Cadastrar Serviço
          </DrawerHeader>

          <DrawerBody>
            <form id="create" onSubmit={handleSubmit}>
              <FormLabel textColor={mainColor} htmlFor="orgId">
                Selecione a Empresa
              </FormLabel>
              <Select
                id="orgId"
                name="orgId"
                value={orgId}
                onChange={handleChangeSelect}
                focusBorderColor={mainColor}
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
                ref={firstField}
                id="name"
                name="name"
                placeholder="Nome do Serviço..."
                focusBorderColor={mainColor}
                onChange={handleChangeInput}
                value={name!}
              />
              <FormLabel textColor={mainColor} pt="4" htmlFor="description">
                Descrição
              </FormLabel>
              <Textarea
                id="description"
                name="description"
                placeholder="Digite uma descrição para seu serviço..."
                focusBorderColor={mainColor}
                value={description!}
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
                aria-label="Add Service"
                icon={<RiSaveLine />}
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
