import { useOrgs } from "@/app/hooks/useOrgs";
import { useServices } from "@/app/hooks/useServices";
import { OrgProps, ServiceProps } from "@/lib/interfaces";
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
  Select,
  Textarea,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, Fragment, useState } from "react";
import { RiSaveLine } from "react-icons/ri";

export function AddDrawerContent(props: ServiceProps) {
  const { data: session } = useSession();
  const { orgs } = useOrgs();
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [orgId, setOrgId] = useState(orgs[0]._id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();
  const router = useRouter();
  const { updateServices } = useServices();

  const mainColor = useColorModeValue("purple.600", "purple.200");

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
      <DrawerHeader textColor={mainColor} borderBottomWidth="1px">
        Cadastrar Serviço
      </DrawerHeader>

      <DrawerBody>
        <form id="createServiceForm" onSubmit={handleSubmit}>
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
            ref={props.initialRef}
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
          onClick={props.onClose}
          isAttached
        >
          <IconButton
            type="submit"
            form="createServiceForm"
            aria-label="Add Service"
            icon={<RiSaveLine />}
            // onClick={props.onClose}
          />
          <Button
            type="submit"
            form="createServiceForm"
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
