import { useOrgs } from "@/app/hooks/useOrgs";
import { useProfessionals } from "@/app/hooks/useProfessionals";
import { useServices } from "@/app/hooks/useServices";
import { OrgProps, ProfessionalProps, ServiceProps } from "@/lib/interfaces";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
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
  HStack,
  IconButton,
  Input,
  InputGroup,
  Select,
  VStack,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, Fragment, useRef, useState } from "react";
import { Ri24HoursLine, RiSaveLine } from "react-icons/ri";
import { TbReload } from "react-icons/tb";

export function AddDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { orgs } = useOrgs();
  const { services } = useServices();
  const { professionals, updateProfessionals } = useProfessionals();
  const initialProfessionals = professionals?.filter(
    (professional: ProfessionalProps) => professional.org?._id === orgs[0]?._id
  );

  const [formValues, setFormValues] = useState({
    orgId: "",
    day: "",
    professionalId: "initialProfessionals[0]?._id",
    professionals: [] as ProfessionalProps[],
    servicesId: "",
    services: [] as ServiceProps[],
  });
  const [professional, setProfessional] = useState<ProfessionalProps>(
    {} as ProfessionalProps
  );
  const [service, setService] = useState<ServiceProps>({} as ServiceProps);
  const [day, setDay] = useState("");
  const [interval, setInterval] = useState([{ start: "00:00", end: "00:00" }]);
  // const
  const [intervalGroup, setIntervalGroup] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const firstField = useRef() as any;
  const toast = useToast();
  const router = useRouter();

  const mainColor = useColorModeValue("purple.600", "purple.200");
  const bgColorDrawer = useColorModeValue("whiteAlpha.900", "blackAlpha.900");

  function handleRouter() {
    updateProfessionals();
    router.refresh();
  }

  // function getProfessionalServices() {
  //   const completeServices = [];
  //   for (let i = 0; i < formValues.services.length; i++) {
  //     completeServices.push(
  //       ...services.filter((service) => service._id === formValues.services[i])
  //     );
  //   }
  //   return completeServices;
  // }

  // function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
  //   const { name, value } = event.target;
  //   setFormValues({
  //     ...formValues,
  //     [name]: value,
  //   });
  // }

  // function handleChangeTextArea(event: ChangeEvent<HTMLTextAreaElement>) {
  //   const newBio = event.target.value;
  //   setFormValues({
  //     ...formValues,
  //     bio: newBio,
  //   });
  // }
  function handleAddInterval() {
    setIntervalGroup(intervalGroup + 1);
  }

  function handleMinusInterval() {
    if (intervalGroup === 0) {
      return;
    }
    const localInterval: { start: string; end: string }[] = interval;
    localInterval.pop();
    setIntervalGroup(intervalGroup - 1);
    setInterval(localInterval);
  }

  function handleChangeOrg(event: ChangeEvent<HTMLSelectElement>) {
    const localOrgId = event.target.value;
    const localProfessionals = professionals.filter(
      (professional: ProfessionalProps) => professional.org?._id === localOrgId
    );
    const localServices = services.filter(
      (service: ServiceProps) => service.org?._id === localOrgId
    );

    setFormValues({
      ...formValues,
      orgId: localOrgId,
      servicesId: localServices[0]?._id!,
      services: localServices,
      professionalId: localProfessionals[0]?._id,
      professionals: localProfessionals,
    });
  }

  function handleChangeProfessional(event: ChangeEvent<HTMLSelectElement>) {
    const localProfessionals = professionals.filter(
      (professional: ProfessionalProps) =>
        professional._id === event.target.value
    );
    const localServices = localProfessionals[0]?.completeServices;

    setFormValues({
      ...formValues,
      professionalId: localProfessionals[0]?._id,
      services: localServices || ([{}] as ServiceProps[]),
    });

    setProfessional(localProfessionals[0]);
  }

  function handleChangeService(event: ChangeEvent<HTMLSelectElement>) {
    const localServices = services.filter(
      (service: ServiceProps) => service._id === event.target.value
    );

    setFormValues({
      ...formValues,
      servicesId: localServices[0]?._id!,
    });
    setService(localServices[0]);
  }

  function handleInterval(event: ChangeEvent<HTMLInputElement>, key: number) {
    const { name, value, id } = event.target;
    const localInterval: { start: string; end: string }[] = interval;

    if (name === "start") {
      const localhour = { ...localInterval[key], start: value };
      localInterval[key] = localhour;
      console.log(name, value, id, key);
    }
    if (name === "end") {
      const localhour = { ...localInterval[key], end: value };
      localInterval[key] = localhour;
      console.log(name, value, id, key);
    }

    setInterval(localInterval);

    console.log("interval: ", interval);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    return;

    // if (!formValues.name) {
    //   setError("O campo nome não pode ficar em branco");
    //   toast({
    //     title: "Ocorreu um erro",
    //     description: error,
    //     status: "error",
    //     duration: 3000,
    //     isClosable: true,
    //     position: "top",
    //   });
    //   return;
    // }

    // try {
    //   setLoading(true);
    //   const professionalServices = getProfessionalServices();
    //   // console.log("professionalServices: ", professionalServices);
    //   setFormValues({
    //     ...formValues,
    //     completeServices: professionalServices,
    //   });

    //   // console.log("formValues: ", formValues);

    //   const responseCreate = await fetch("/api/professional/", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       ...formValues,
    //     }),
    //   });

    //   setLoading(false);

    //   if (responseCreate.ok) {
    //     // setFormValues({
    //     //   name: "",
    //     //   email: "",
    //     //   image: "",
    //     //   bio: "",
    //     //   func: "",
    //     //   orgId: orgs[0]._id,
    //     //   services: [] as string[],
    //     //   completeServices: [{}],
    //     // });

    //     toast({
    //       title: "Sucesso",
    //       description: "Serviço cadastrado com sucesso",
    //       status: "success",
    //       duration: 3000,
    //       isClosable: true,
    //       position: "top",
    //     });

    //     handleRouter();
    //   } else {
    //     const responseError = await responseCreate.json();
    //     setError(responseError);
    //     toast({
    //       title: "Ocorreu um erro",
    //       description: error,
    //       status: "error",
    //       duration: 3000,
    //       isClosable: true,
    //       position: "top",
    //     });
    //     handleRouter();
    //   }
    // } catch (erro: any) {
    //   setLoading(false);
    //   setError(erro);
    //   toast({
    //     title: "Ocorreu um erro",
    //     description: error,
    //     status: "error",
    //     duration: 3000,
    //     isClosable: true,
    //     position: "top",
    //   });
    //   handleRouter();
    // }
  }

  const rows = [];
  for (let i = 0; i < intervalGroup; i++) {
    // note: we are adding a key prop here to allow react to uniquely identify each
    // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
    rows.push(
      <InputGroup
        key={i}
        borderRadius="md"
        p="2"
        bg="gray.800"
        id="interval"
        alignItems="center"
      >
        <FormLabel textColor={mainColor} htmlFor="start">
          Inicio
        </FormLabel>
        <Input
          placeholder="Hora inicial"
          size="md"
          type="time"
          id="start"
          name="start"
          mr="2"
          onChange={(e) => handleInterval(e, i)}
        />
        <FormLabel textColor={mainColor} htmlFor="end">
          Fim
        </FormLabel>
        <Input
          placeholder="Hora final"
          size="md"
          type="time"
          id="end"
          name="end"
          key={1}
          onChange={(e) => handleInterval(e, i)}
        />
      </InputGroup>
    );
  }

  return (
    <Fragment>
      <ButtonGroup
        display={{ md: "none" }}
        variant="outline"
        colorScheme="purple"
        isAttached
      >
        <IconButton aria-label="Add Hour" onClick={onOpen} icon={<AddIcon />} />
        <IconButton
          // onClick={updateHours}
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
          aria-label="Add Hour"
          icon={<Ri24HoursLine />}
        />
        <Button onClick={onOpen}>Adicionar</Button>
        <IconButton
          // onClick={updateHours}
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
        <DrawerContent bg={bgColorDrawer} h="auto" overflowY="auto">
          <DrawerCloseButton />
          <DrawerHeader textColor={mainColor} borderBottomWidth="1px">
            Cadastrar Horário
          </DrawerHeader>

          <DrawerBody>
            <form id="createForm" onSubmit={handleSubmit}>
              <FormLabel textColor={mainColor} htmlFor="orgId">
                Empresa
              </FormLabel>
              <Select
                id="orgId"
                name="orgId"
                value={formValues.orgId}
                onChange={handleChangeOrg}
                focusBorderColor={mainColor}
              >
                <option value="#">Nenhum</option>
                {orgs?.map((org: OrgProps) => (
                  <option key={org._id!} value={org._id!}>
                    {org.name!}
                  </option>
                ))}
              </Select>

              <FormLabel textColor={mainColor} htmlFor="professionalId">
                Profissional
              </FormLabel>
              <Select
                id="professionalId"
                name="professionalId"
                value={formValues.professionalId}
                onChange={handleChangeProfessional}
                focusBorderColor={mainColor}
              >
                <option value="#">Nenhum</option>
                {formValues.professionals?.map(
                  (professional: ProfessionalProps) => (
                    <option key={professional._id!} value={professional._id!}>
                      {professional.name!}
                    </option>
                  )
                )}
              </Select>

              <FormLabel textColor={mainColor} htmlFor="serviceId">
                Serviço
              </FormLabel>
              <Select
                id="serviceId"
                name="serviceId"
                value={formValues.servicesId}
                onChange={handleChangeService}
                focusBorderColor={mainColor}
              >
                <option value="#">Nenhum</option>
                {formValues.services.map((service: ServiceProps) => (
                  <option key={service._id!} value={service._id!}>
                    {service.name!}
                  </option>
                ))}
              </Select>

              <FormLabel textColor={mainColor} htmlFor="day">
                Dia
              </FormLabel>
              <Input
                name="day"
                id="day"
                placeholder="Selecione o dia"
                size="md"
                type="date"
              />
              <VStack mt="2">
                <HStack justifyContent="space-between" w="full">
                  <FormLabel textColor={mainColor} htmlFor="interval">
                    Intervalos
                  </FormLabel>
                  <ButtonGroup isAttached size="sm" variant="outline">
                    <IconButton
                      aria-label="add interval"
                      icon={<AddIcon />}
                      onClick={handleAddInterval}
                      name="add"
                      id="add"
                    />
                    <IconButton
                      aria-label="minus interval"
                      icon={<MinusIcon />}
                      onClick={handleMinusInterval}
                      name="minus"
                      id="minus"
                    />
                  </ButtonGroup>
                </HStack>
                <VStack borderRadius="md" border="1px" w="full" p="2">
                  {rows}
                </VStack>
              </VStack>
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
                onClick={onClose}
              />
              <Button
                type="submit"
                form="createForm"
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
