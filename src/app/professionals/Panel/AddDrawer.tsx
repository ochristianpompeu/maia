import { useOrgs } from "@/app/hooks/useOrgs";
import { useProfessionals } from "@/app/hooks/useProfessionals";
import { useServices } from "@/app/hooks/useServices";
import { OrgProps, ServiceProps } from "@/lib/interfaces";
import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
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
  Stack,
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, Fragment, useRef, useState } from "react";
import { BsPersonBadge } from "react-icons/bs";
import { RiSaveLine } from "react-icons/ri";
import { TbReload } from "react-icons/tb";

export function AddDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef() as any;
  const { orgs } = useOrgs();
  const { services } = useServices();
  const [formServices, setFormServices] = useState(
    services.filter((service) => service.org?._id === orgs[0]._id)
  );
  const [checkboxDefaultValue, setCheckboxDefaultValue] = useState(
    [] as string[]
  );
  const { updateProfessionals } = useProfessionals();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    image: "",
    bio: "",
    func: "",
    orgId: orgs[0]?._id,
    services: [] as string[],
    completeServices: [{}],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();
  const router = useRouter();

  const mainColor = useColorModeValue("purple.600", "purple.200");
  const bgColorDrawer = useColorModeValue("whiteAlpha.900", "blackAlpha.900");

  function handleRouter() {
    updateProfessionals();
    onClose();
    router.refresh();
  }

  function getProfessionalServices() {
    const completeServices = [];
    for (let i = 0; i < formValues.services.length; i++) {
      completeServices.push(
        ...services.filter((service) => service._id === formValues.services[i])
      );
    }
    return completeServices;
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
    const localOrgId = event.target.value;
    const localServices = services.filter(
      (service) => service.org?._id === localOrgId
    );

    setFormValues({
      ...formValues,
      orgId: localOrgId,
    });

    setFormServices(localServices);
  }

  function handleChangeCheckBox(event: ChangeEvent<HTMLInputElement>) {
    const localServices = formValues.services!;

    const newArray = [] as string[];

    const value = event.target.value;
    const checked = event.target.checked;

    if (checked && formValues.services!.indexOf(value) < 0) {
      localServices.push(value);
    }

    if (checked && checkboxDefaultValue!.indexOf(value) < 0) {
      localServices.push(value);
    }

    if (!checked && formValues.services!.indexOf(value) >= 0) {
      for (let i = 0; i < formValues.services!.length; i++) {
        if (localServices[i] !== value) {
          newArray.push(formValues.services![i]);
        }
      }

      setFormValues({
        ...formValues,
        services: newArray,
      });
      setCheckboxDefaultValue(newArray);
      return;
    }

    if (!checked && checkboxDefaultValue!.indexOf(value) >= 0) {
      for (let i = 0; i < checkboxDefaultValue!.length; i++) {
        if (localServices[i] !== value) {
          newArray.push(checkboxDefaultValue![i]);
        }
      }

      setFormValues({
        ...formValues,
        services: newArray,
      });
      setCheckboxDefaultValue(newArray);
      return;
    }

    setFormValues({
      ...formValues,
      services: localServices,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (formValues.orgId === "#") {
      setError("Selecione a empresa");
      toast({
        title: "Empresa não selecionada",
        description: "Selecione a empresa",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

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
      const professionalServices = getProfessionalServices();
      setFormValues({
        ...formValues,
        completeServices: professionalServices,
      });

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
          services: [] as string[],
          completeServices: [{}],
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
        display={{ md: "none" }}
        variant="outline"
        colorScheme="purple"
        isAttached
      >
        <IconButton
          aria-label="Add Professional"
          onClick={onOpen}
          icon={<AddIcon />}
        />
        <IconButton
          onClick={updateProfessionals}
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
          aria-label="Add Professional"
          icon={<BsPersonBadge />}
        />
        <Button onClick={onOpen}>Adicionar</Button>
        <IconButton
          onClick={updateProfessionals}
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
                <option value="#">Nenhum</option>
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
                ref={firstField}
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
              <CheckboxGroup colorScheme="purple">
                <Stack spacing={[1, 5]} direction={["column", "row"]}>
                  {formServices.map((service: ServiceProps) => (
                    <Checkbox
                      key={service._id}
                      value={service._id}
                      onChange={handleChangeCheckBox}
                    >
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
              // onClick={onClose}
              isAttached
            >
              <IconButton
                type="submit"
                form="createForm"
                aria-label="Add"
                icon={<RiSaveLine />}
                // onClick={onClose}
              />
              <Button
                type="submit"
                form="createForm"
                // onClick={onClose}
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
