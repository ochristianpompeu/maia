"use client";
import { useOrgs } from "@/app/hooks/useOrgs";
import { useProfessionals } from "@/app/hooks/useProfessionals";
import { useServices } from "@/app/hooks/useServices";
import { OrgProps, ProfessionalProps, ServiceProps } from "@/lib/interfaces";
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
import React, { ChangeEvent, Fragment, useRef, useState } from "react";
import { TbEdit, TbRefresh } from "react-icons/tb";

export function EditDrawer(props: ProfessionalProps) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { updateProfessionals } = useProfessionals();
  const { orgs } = useOrgs();
  const { services } = useServices();
  const [formServices, setFormServices] = useState(
    services.filter((service) => service.org?._id === props.org?._id)
  );
  const [checkboxDefaultValue, setCheckboxDefaultValue] = useState(
    props.services
  );
  const { isOpen, onClose, onOpen } = useDisclosure();

  const initialRef = useRef() as any;
  const toast = useToast();
  const router = useRouter();
  const mainColor = useColorModeValue("purple.600", "purple.300");
  const bgColorDrawer = useColorModeValue("whiteAlpha.900", "blackAlpha.900");

  const [formValues, setFormValues] = useState({
    name: props.name,
    email: props.email,
    image: props.image,
    bio: props.bio,
    func: props.function,
    orgId: props.orgId,
    services: props.services,
    completeServices: props.completeServices,
  });

  function handleRouter() {
    updateProfessionals();
    onClose();
    router.refresh();
  }

  function getProfessionalServices() {
    const completeServices = [];
    for (let i = 0; i < formValues.services!.length; i++) {
      completeServices.push(
        ...services.filter((service) => service._id === formValues.services![i])
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
    const newOrgId = event.target.value;
    const localServices = services.filter(
      (service) => service.org?._id === newOrgId
    );

    setFormValues({
      ...formValues,
      orgId: newOrgId,
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
    const professionalServices = getProfessionalServices();
    setFormValues({
      ...formValues,
      completeServices: professionalServices,
    });

    const updateProfessional = {
      newName: formValues.name,
      newEmail: formValues.email,
      newImage: formValues.image,
      newBio: formValues.bio,
      newFunc: formValues.func,
      newOrgId: formValues.orgId,
      newServices: formValues.services,
      newCompleteServices: professionalServices,
    };
    if (!updateProfessional.newName) {
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
      const responseUpdate = await fetch("/api/professional/" + props._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...updateProfessional,
        }),
      });

      setLoading(false);

      if (responseUpdate.ok) {
        toast({
          title: "Sucesso",
          description: "Dados atualizados com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });

        handleRouter();
      } else {
        const responseError = await responseUpdate.json();
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
      <IconButton
        icon={<TbEdit />}
        aria-label="Edit Professional"
        colorScheme="teal"
        onClick={onOpen}
      />
      <Drawer
        size={{ base: "xs", md: "sm" }}
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
      >
        <DrawerOverlay />
        <DrawerContent bg={bgColorDrawer} h="auto" overflowY="auto">
          <DrawerCloseButton />
          <DrawerHeader textColor={mainColor} borderBottomWidth="1px">
            Edição do Cadastro do Profissional
          </DrawerHeader>

          <DrawerBody>
            <form id="alterForm" onSubmit={handleSubmit}>
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
                value={formValues?.name}
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
                value={formValues?.email}
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
                value={formValues?.func}
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
                value={formValues?.image}
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
                value={formValues?.bio}
                size="md"
                onChange={handleChangeTextArea}
              />
              <FormLabel textColor={mainColor} pt="4" htmlFor="services">
                Selecione os Serviços
              </FormLabel>
              <CheckboxGroup
                colorScheme="purple"
                defaultValue={checkboxDefaultValue}
              >
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
            <ButtonGroup colorScheme="purple" variant="outline" isAttached>
              <IconButton
                aria-label="alter"
                type="submit"
                form="alterForm"
                // onClick={onClose}
                isLoading={loading}
                icon={<TbRefresh />}
              />
              <Button
                type="submit"
                form="alterForm"
                // onClick={onClose}
                isLoading={loading}
              >
                Atualizar
              </Button>
            </ButtonGroup>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}
