"use client";
import { useHours } from "@/app/hooks/useHours";
import { useOrgs } from "@/app/hooks/useOrgs";
import { useProfessionals } from "@/app/hooks/useProfessionals";
import { useServices } from "@/app/hooks/useServices";
import { useUser } from "@/app/hooks/useUser";
import {
  HourProps,
  IntervalProps,
  OrgProps,
  ProfessionalProps,
  ServiceProps,
} from "@/lib/interfaces";
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
import React, { ChangeEvent, Fragment, useRef, useState } from "react";
import { RiSaveLine } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";

export function EditDrawer(props: HourProps) {
  let formatedDay = new Date(props?.day as Date);
  const formatedFormDay = formatDate(formatedDay);
  const stringDay = formatedDay.toLocaleDateString("pt-BR", {
    timeZone: "UTC",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { orgs } = useOrgs();
  const { services } = useServices();
  const { professionals } = useProfessionals();
  const { hours, updateHours } = useHours();
  const { user } = useUser();

  const [orgId, setOrgId] = useState(props.orgId);
  const [org, setOrg] = useState<OrgProps>(props?.org as OrgProps);
  const [professionalId, setProfessionalId] = useState(props.professionalId);
  const [professional, setProfessional] = useState<ProfessionalProps>(
    props.professional as ProfessionalProps
  );
  const [serviceId, setServiceId] = useState(props.serviceId);
  const [service, setService] = useState<ServiceProps>(
    props?.service as ServiceProps
  );
  const [day, setDay] = useState(formatedFormDay);
  const [interval, setInterval] = useState(props.interval as IntervalProps[]);
  const [intervalGroup, setIntervalGroup] = useState(props?.interval?.length!);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formValues, setFormValues] = useState({
    orgId: props?.orgId,
    day: formatedDay,
    interval: props?.interval,
    professionalId: props?.professionalId,
    professionals: professionals.filter(
      (professional) => professional.org?._id === props?.orgId
    ),
    servicesId: props?.serviceId,
    services: professionals.filter(
      (professional) => professional._id === props.professionalId
    )[0]?.completeServices,
    userAdmin: props.userAdmin,
  });

  const firstField = useRef() as any;
  const toast = useToast();
  const router = useRouter();

  const focusBorderColor = useColorModeValue("purple.600", "purple.600");
  const mainColor = useColorModeValue("purple.600", "purple.200");
  const bgColorDrawer = useColorModeValue("whiteAlpha.900", "blackAlpha.900");
  const intervalColor = useColorModeValue("gray.200", "gray.800");
  const intervalInputBorderColor = useColorModeValue("gray.400", "gray.200");

  function formatDate(date: Date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

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
    const localInterval: IntervalProps[] = interval as IntervalProps[];
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
    const localDay = new Date(value);

    setDay(formatDate(localDay));
    setFormValues({
      ...formValues,
      day: localDay,
    });
    return;
  }

  function handleInterval(event: ChangeEvent<HTMLInputElement>, key: number) {
    const { name, value } = event.target;
    const localInterval: IntervalProps[] = interval as IntervalProps[];

    if (name === "start") {
      const localhour = {
        ...localInterval[key],
        start: day + "T" + value,
      };
      localInterval[key] = localhour as any;
    }
    if (name === "end") {
      const localhour = {
        ...localInterval[key],
        end: day + "T" + value,
      };
      localInterval[key] = localhour as any;
    }

    setInterval(localInterval);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newHour = {
      newDay: day,
      newInterval: interval,
      newOrgId: orgId,
      newOrg: org,
      newServiceId: serviceId,
      newService: service,
      newProfessionalId: professionalId,
      newProfessional: professional,
      newUserAdmin: user._id,
    };

    if (
      !newHour.newDay ||
      !newHour.newOrgId ||
      !newHour.newServiceId ||
      !newHour.newProfessionalId ||
      !newHour.newDay ||
      !newHour.newInterval
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

      const response = await fetch(`/api/hour/${props._id}`, {
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
          day: new Date(),
          interval: [],
          professionalId: "",
          professionals: [] as ProfessionalProps[],
          servicesId: "",
          services: [] as ServiceProps[],
          userAdmin: "",
        });

        toast({
          title: "Sucesso",
          description: "Horário atualizado com sucesso",
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
    const formatedStart = new Date(interval[i]?.start! as Date);
    const formatedEnd = new Date(interval[i]?.end! as Date);
    formatedStart.toLocaleTimeString("pt-BR", {
      timeZone: "UTC",
    });
    formatedEnd.toLocaleTimeString("pt-BR", {
      timeZone: "UTC",
    });
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
          value={formatedStart.toLocaleTimeString("pt-BR", {
            timeZone: "UTC",
          })}
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
          value={formatedEnd.toLocaleTimeString("pt-BR", {
            timeZone: "UTC",
          })}
        />
      </InputGroup>
    );
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
                {professionals
                  ?.filter((professional) => professional.org?._id === org._id)
                  .map((professional: ProfessionalProps) => (
                    <option key={professional._id!} value={professional._id!}>
                      {professional.name!}
                    </option>
                  ))}
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
                {professionals
                  ?.filter((professional) => professional.org?._id === org._id)
                  .filter(
                    (professional) =>
                      professional._id === formValues.professionalId
                  )[0]
                  ?.completeServices?.map((service: ServiceProps) => (
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
                value={formatedFormDay}
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
