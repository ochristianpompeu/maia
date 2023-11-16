import { useOrgs } from "@/app/hooks/useOrgs";
import { useProfessionals } from "@/app/hooks/useProfessionals";
import { useServices } from "@/app/hooks/useServices";
import { OrgProps, ProfessionalProps, ServiceProps } from "@/lib/interfaces";
import {
  Button,
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  DrawerBody,
  DrawerCloseButton,
  DrawerFooter,
  DrawerHeader,
  FormLabel,
  IconButton,
  Input,
  Select,
  Stack,
  Textarea,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, Fragment, useState } from "react";
import { RiSaveLine } from "react-icons/ri";

export function AddDrawerContent(props: ProfessionalProps) {
  const { orgs } = useOrgs();
  const { services } = useServices();
  const { updateProfessionals } = useProfessionals();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    image: "",
    bio: "",
    func: "",
    orgId: orgs[0]._id,
    services: services.filter(
      (service) => service.org?._id === orgs[0]._id
    ) as ServiceProps[],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();
  const router = useRouter();

  const mainColor = useColorModeValue("purple.600", "purple.200");

  function handleRouter() {
    updateProfessionals();
    router.refresh();
  }

  function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }

  function handleChangeTextArea(event: ChangeEvent<HTMLTextAreaElement>) {
    const newBio = event.target.value;
    setFormValues({
      ...formValues,
      bio: newBio,
    });
  }

  function handleChangeSelect(event: ChangeEvent<HTMLSelectElement>) {
    const newOrgId = event.target.value;
    const localServices = services.filter(
      (service) => service.org?._id === newOrgId
    );
    setFormValues({
      ...formValues,
      orgId: newOrgId,
      services: localServices,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formValues.name) {
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

      const responseCreate = await fetch("/api/professional/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formValues,
        }),
      });

      setLoading(false);

      if (responseCreate.ok) {
        setFormValues({
          name: "",
          email: "",
          image: "",
          bio: "",
          func: "",
          orgId: orgs[0]._id,
          services: services.filter(
            (service) => service.org?._id === orgs[0]._id
          ) as ServiceProps[],
        });

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
        Cadastrar Profissional
      </DrawerHeader>

      <DrawerBody>
        <form id="createForm" onSubmit={handleSubmit}>
          <FormLabel textColor={mainColor} htmlFor="orgId">
            Selecione a Empresa
          </FormLabel>
          <Select
            id="orgId"
            name="orgId"
            value={formValues.orgId}
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
            Nome
          </FormLabel>
          <Input
            ref={props.initialRef}
            id="name"
            name="name"
            placeholder="Nome do Profissional..."
            focusBorderColor={mainColor}
            onChange={handleChangeInput}
            value={formValues.name}
            type="text"
          />
          <FormLabel textColor={mainColor} pt="4" htmlFor="email">
            E-mail
          </FormLabel>
          <Input
            id="email"
            name="email"
            placeholder="E-mail..."
            focusBorderColor={mainColor}
            onChange={handleChangeInput}
            value={formValues.email}
            type="email"
          />
          <FormLabel textColor={mainColor} pt="4" htmlFor="func">
            Função
          </FormLabel>
          <Input
            id="func"
            name="func"
            placeholder="Função..."
            focusBorderColor={mainColor}
            onChange={handleChangeInput}
            value={formValues.func}
            type="text"
          />
          <FormLabel textColor={mainColor} pt="4" htmlFor="image">
            URL da Imagem
          </FormLabel>
          <Input
            id="image"
            name="image"
            placeholder="preencha com a url da imagem"
            focusBorderColor={mainColor}
            onChange={handleChangeInput}
            value={formValues.image}
            type="url"
          />

          <FormLabel textColor={mainColor} pt="4" htmlFor="bio">
            Sobre
          </FormLabel>
          <Textarea
            id="bio"
            name="bio"
            placeholder="Fale um pouco sobre o profissional..."
            focusBorderColor={mainColor}
            value={formValues.bio}
            size="md"
            onChange={handleChangeTextArea}
          />
          <FormLabel textColor={mainColor} pt="4" htmlFor="services">
            Selecione os Serviços
          </FormLabel>
          <CheckboxGroup colorScheme="purple" defaultValue={[]}>
            <Stack spacing={[1, 5]} direction={["column", "row"]}>
              {formValues.services.map((service) => (
                <Checkbox key={service._id} value={service._id}>
                  {service.name}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
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
            form="createForm"
            aria-label="Add"
            icon={<RiSaveLine />}
            // onClick={props.onClose}
          />
          <Button
            type="submit"
            form="createForm"
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
