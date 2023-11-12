import { applicationConfig } from "@/lib/config";
import { ServiceProps } from "@/lib/interfaces";
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

  const { orgs } = {
    orgs: [
      {
        _id: "654ad4ef0c075178a696e5da",
        name: "Camila Pompeu Nutricionista",
        description:
          "Blessed is the man who doesn't walk in the counsel of the wicked, nor stand in the way of sinners, nor sit in the seat of scoffers; but his delight is in Yahweh's law. On his law he meditates day and night. He will be like a tree planted by the streams of water, that brings forth its fruit in its season, whose leaf also does not wither.",
        userAdmin: "65443103b31c7cbd35d04ac1",
        createdAt: "2023-11-08T00:23:11.791Z",
        updatedAt: "2023-11-08T00:23:11.791Z",
        __v: 0,
      },
      {
        _id: "6550f39d986863eddd46f5b0",
        name: "Christian Pompeu Serviços em ERP",
        description:
          "Blessed is the man who doesn't walk in the counsel of the wicked, nor stand in the way of sinners, nor sit in the seat of scoffers; but his delight is in Yahweh's law. On his law he meditates day and night. He will be like a tree planted by the streams of water, that brings forth its fruit in its season, whose leaf also does not wither. Whatever he does shall prosper. The wicked are not so, but are like the chaff which the wind drives away. Therefore the wicked shall not stand in the judgment, nor sinners in the congregation of the righteous. For Yahweh knows the way of the righteous, but the way of the wicked shall perish.",
        userAdmin: "65443103b31c7cbd35d04ac1",
        createdAt: "2023-11-12T15:47:41.765Z",
        updatedAt: "2023-11-12T15:47:41.765Z",
        __v: 0,
      },
    ],
  };

  // use(
  //   queryUser("orgs", () =>
  //     fetch(
  //       applicationConfig.baseUrl + "/api/organization/byUser" + user!._id,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     ).then((res) => res.json())
  //   )
  // );

  const mainColor = "purple.600";

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
    const userAdmin = user._id;

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
        <form id="createOrgForm" onSubmit={handleSubmit}>
          <FormLabel htmlFor="owner">Select Owner</FormLabel>
          <Select id="orgId">
            {orgs.map((org) => (
              <option key={org._id} value={org._id}>
                {org.name}
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
            value={name}
          />
          <FormLabel textColor={mainColor} pt="4" htmlFor="description">
            Descrição
          </FormLabel>
          <Textarea
            id="description"
            name="description"
            placeholder="Digite uma descrição para seu serviço..."
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
          form="createOrgForm"
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
