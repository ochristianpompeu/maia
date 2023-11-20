import { useHours } from "@/app/hooks/useHours";
import { useOrgs } from "@/app/hooks/useOrgs";
import { useProfessionals } from "@/app/hooks/useProfessionals";
import { useServices } from "@/app/hooks/useServices";
import { useUser } from "@/app/hooks/useUser";
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
  const { updateHours } = useHours();
  const { user } = useUser();

  const [orgId, setOrgId] = useState("");
  const [org, setOrg] = useState<OrgProps>(orgs[0] as OrgProps);
  const [professionalId, setProfessionalId] = useState("");
  const [professional, setProfessional] = useState<ProfessionalProps>(
    {} as ProfessionalProps
  );
  const [serviceId, setServiceId] = useState("");
  const [service, setService] = useState<ServiceProps>({} as ServiceProps);
  const [day, setDay] = useState("");
  const [interval, setInterval] = useState([
    { start: "00:00", end: "00:00", status: "free" },
  ]);
  const [intervalGroup, setIntervalGroup] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formValues, setFormValues] = useState({
    orgId: "",
    day: "",
    interval: [],
    professionalId: "",
    professionals: [] as ProfessionalProps[],
    servicesId: "",
    services: [] as ServiceProps[],
    userAdmin: "",
  });

  const firstField = useRef() as any;
  const toast = useToast();
  const router = useRouter();

  const focusBorderColor = useColorModeValue("purple.600", "purple.600");
  const mainColor = useColorModeValue("purple.600", "purple.200");
  const bgColorDrawer = useColorModeValue("whiteAlpha.900", "blackAlpha.900");
  const intervalColor = useColorModeValue("gray.200", "gray.800");
  const intervalInputBorderColor = useColorModeValue("gray.400", "gray.200");

  function handleRouter() {
    updateHours();
    router.refresh();
  }

  function handleAddInterval() {
    setIntervalGroup(intervalGroup + 1);
  }

  function handleMinusInterval() {
    if (intervalGroup === 0) {
      return;
    }
    const localInterval: { start: string; end: string; status: string }[] =
      interval;
    localInterval.pop();
    setIntervalGroup(intervalGroup - 1);
    setInterval(localInterval);
  }

  function handleChangeOrg(event: ChangeEvent<HTMLSelectElement>) {
    const localOrgId = event.target.value;
    const localOrg = orgs.find((org) => org._id === localOrgId) as OrgProps;
    const localProfessionals = professionals.filter(
      (professional: ProfessionalProps) => professional.org?._id === localOrgId
    );
    setOrgId(localOrgId);
    setOrg(localOrg);
    setFormValues({
      ...formValues,
      orgId: orgId,
      professionals: localProfessionals || ([{}] as ProfessionalProps[]),
    });
  }

  function handleChangeProfessional(event: ChangeEvent<HTMLSelectElement>) {
    const localProfessionalId = event.target.value;
    const localProfessionals = professionals.filter(
      (professional: ProfessionalProps) =>
        professional._id === localProfessionalId
    );
    const localProfessional = localProfessionals[0];
    const localServices = localProfessionals[0]?.completeServices;

    setProfessionalId(localProfessionalId);
    setProfessional(localProfessional);

    setFormValues({
      ...formValues,
      professionalId: localProfessionalId,
      services:
        localProfessionalId !== "#"
          ? localServices || ([{}] as ServiceProps[])
          : ([] as ServiceProps[]),
    });
  }

  function handleChangeService(event: ChangeEvent<HTMLSelectElement>) {
    const localServices = services.filter(
      (service: ServiceProps) => service._id === event.target.value
    );
    const localServiceId = localServices[0]?._id!;

    setService(localServices[0]);
    setServiceId(localServiceId);
    setFormValues({
      ...formValues,
      servicesId: localServiceId,
    });
  }

  function handleChangeDay(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, id } = event.target;
    const localDay = value;

    setDay(localDay);
    setFormValues({
      ...formValues,
      day: localDay,
    });
    return;
  }

  function handleInterval(event: ChangeEvent<HTMLInputElement>, key: number) {
    const { name, value } = event.target;
    const localInterval: { start: string; end: string; status: string }[] =
      interval;

    if (name === "start") {
      const localhour = {
        ...localInterval[key],
        start: day + "T" + value,
        status: "free",
      };
      localInterval[key] = localhour;
    }
    if (name === "end") {
      const localhour = {
        ...localInterval[key],
        end: day + "T" + value,
        status: "free",
      };
      localInterval[key] = localhour;
    }

    setInterval(localInterval);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newHour = {
      day: day,
      interval: interval,
      orgId: orgId,
      org: org,
      serviceId: serviceId,
      service: service,
      professionalId: professionalId,
      professional: professional,
      userAdmin: user._id,
    };

    console.log(newHour);

    if (
      !newHour.day ||
      !newHour.orgId ||
      !newHour.serviceId ||
      !newHour.professionalId ||
      !newHour.day ||
      !newHour.interval
    ) {
      setError("Todos os campos são obrigatórios  ");
      toast({
        title: "Campos obrigatórios não informados",
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

      const response = await fetch("/api/hour/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newHour,
        }),
      });

      setLoading(false);

      if (response.ok) {
        setFormValues({
          orgId: "",
          day: "",
          interval: [],
          professionalId: "",
          professionals: [] as ProfessionalProps[],
          servicesId: "",
          services: [] as ServiceProps[],
          userAdmin: "",
        });

        toast({
          title: "Sucesso",
          description: "Horário cadastrado com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });

        handleRouter();
      } else {
        const responseError = await response.json();
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

  const rows = [];
  for (let i = 0; i < intervalGroup; i++) {
    // note: we are adding a key prop here to allow react to uniquely identify each
    // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
    rows.push(
      <InputGroup
        key={i}
        borderRadius="md"
        p="2"
        bg={intervalColor}
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
          borderColor={intervalInputBorderColor}
          focusBorderColor={focusBorderColor}
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
          borderColor={intervalInputBorderColor}
          focusBorderColor={focusBorderColor}
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
                value={orgId}
                onChange={handleChangeOrg}
                focusBorderColor={focusBorderColor}
              >
                <option value="#">Nenhum</option>
                {orgs.map((org: OrgProps) => (
                  <option key={org._id} value={org._id!}>
                    {org.name}
                  </option>
                ))}
              </Select>

              <FormLabel textColor={mainColor} htmlFor="professionalId">
                Profissional
              </FormLabel>
              <Select
                id="professionalId"
                name="professionalId"
                value={professionalId}
                onChange={handleChangeProfessional}
                focusBorderColor={focusBorderColor}
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
                value={serviceId}
                onChange={handleChangeService}
                focusBorderColor={focusBorderColor}
              >
                <option value="#">Nenhum</option>
                {formValues.services?.map((service: ServiceProps) => (
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
                focusBorderColor={focusBorderColor}
                onChange={handleChangeDay}
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
                <VStack
                  borderRadius="md"
                  border="1px"
                  w="full"
                  p="2"
                  borderColor={intervalColor}
                >
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
                // onClick={onClose}
              />
              <Button
                type="submit"
                form="createForm"
                onClick={onClose}
                isLoading={loading}
                // onClick={onClose}
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
