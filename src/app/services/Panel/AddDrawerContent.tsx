import { applicationConfig } from "@/lib/config";
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
  useColorModeValue,
  useToast
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, Fragment, use, useState } from "react";
import { RiSaveLine } from "react-icons/ri";

const fetchMap = new Map<string, Promise<any>>();
function queryUser(name: string, query: () => Promise<any>) {
  if (!fetchMap.has(name)) {
    fetchMap.set(name, query());
  }

  return fetchMap.get(name)!;
}

export function AddDrawerContent(props: ServiceProps) {
  const { data: session } = useSession();
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [orgId, setOrgId] = useState(props.orgId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();
  const router = useRouter();

  const { user } = use(
    queryUser("user", () =>
      fetch(applicationConfig.baseUrl + "/api/user/" + session?.user?.email, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json())
    )
  );

  const { orgs } = use(
    queryUser("orgs", () =>
      fetch(
        applicationConfig.baseUrl + "/api/organization/byUser/" + user?._id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json())
    )
  );

  const mainColor = useColorModeValue("purple.600", "purple.200");

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
    console.log(
      "Service: ",
      JSON.stringify({
        name,
        description,
        orgId,
      })
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

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

      const responseCreateOrg = await fetch("/api/service/", {
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

      if (responseCreateOrg.ok) {
        setName("");
        setDescription("");
        toast({
          title: "Sucesso",
          description: "Serviço cadastrado com sucesso",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        });

        router.refresh();
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
      <DrawerHeader textColor={mainColor} borderBottomWidth="1px">
        Cadastre sua empresa
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

      <DrawerFooter>
        <Button
          colorScheme="purple"
          variant="outline"
          type="submit"
          form="createServiceForm"
          onClick={props.onClose}
          isLoading={loading}
          leftIcon={<RiSaveLine />}
        >
          Salvar
        </Button>
      </DrawerFooter>
    </Fragment>
  );
}
