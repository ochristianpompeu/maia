"use client";
import { useHours } from "@/app/hooks/useHours";
import { HourProps } from "@/lib/interfaces";
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
import React, { Fragment, useState } from "react";
import { TbTrash } from "react-icons/tb";

export function DeleteDrawer(props: HourProps) {
  const formatedDay = new Date(props.day as Date);

  const { isOpen, onClose, onOpen } = useDisclosure();
  const { updateHours } = useHours();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const mainColor = "purple.600";
  const bgColorDrawer = useColorModeValue("whiteAlpha.900", "blackAlpha.900");
  const intervalColor = useColorModeValue("gray.200", "gray.800");
  const intervalInputBorderColor = useColorModeValue("gray.400", "gray.200");

  const toast = useToast();
  const router = useRouter();

  function formatedDate(date: any) {
    const formatedDate = new Date(date as Date);
    return formatedDate.toLocaleTimeString("pt-BR", {
      timeZone: "UTC",
    });
  }

  function handleRouter() {
    updateHours();
    router.refresh();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      const responseDelete = await fetch(`/api/hour/?id=${props._id}`, {
        method: "DELETE",
      });

      setLoading(false);

      if (responseDelete.ok) {
        toast({
          title: "Sucesso",
          description: "Registro removido com sucesso",
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        handleRouter();
      } else {
        const responseError = await responseDelete.json();
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
      <IconButton
        icon={<TbTrash />}
        aria-label="Delete Hour"
        colorScheme="red"
        onClick={onOpen}
      />
      <Drawer size={{ base: "xs", md: "sm" }} isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={bgColorDrawer} h="auto" overflowY="auto">
          <DrawerCloseButton color="white" />
          <DrawerHeader
            bgColor={mainColor}
            textColor="white"
            borderBottomWidth="1px"
          >
            Deletar Profissional?
          </DrawerHeader>

          <DrawerBody>
            <form id="deleteForm" onSubmit={handleSubmit}>
              <FormLabel textColor={mainColor} htmlFor="orgId">
                Empresa
              </FormLabel>
              <Select
                id="orgId"
                name="orgId"
                textColor={mainColor}
                value={props.orgId}
                disabled
              >
                <option value={props.orgId}>{props.org?.name}</option>
              </Select>

              <FormLabel textColor={mainColor} pt="4" htmlFor="professionalId">
                Profissional
              </FormLabel>
              <Select
                id="professionalId"
                name="professionalId"
                textColor={mainColor}
                value={props.professionalId}
                disabled
              >
                <option value={props.professionalId}>
                  {props.professional?.name}
                </option>
              </Select>

              <FormLabel textColor={mainColor} pt="4" htmlFor="serviceId">
                Serviço
              </FormLabel>
              <Select
                id="serviceId"
                name="serviceId"
                textColor={mainColor}
                value={props.serviceId}
                disabled
              >
                <option value={props.serviceId}>{props.service?.name}</option>
              </Select>

              <FormLabel textColor={mainColor} pt="4" htmlFor="day">
                Dia
              </FormLabel>
              <Input
                id="day"
                name="day"
                focusBorderColor={mainColor}
                value={formatedDay.toLocaleDateString("pt-BR", {
                  timeZone: "UTC",
                })}
                type="text"
                variant="filled"
                disabled
                readOnly
              />
              <VStack mt="2">
                <HStack justifyContent="space-between" w="full">
                  <FormLabel textColor={mainColor} htmlFor="interval">
                    Intervalos
                  </FormLabel>
                </HStack>
                <VStack
                  borderRadius="md"
                  border="1px"
                  w="full"
                  p="2"
                  borderColor={intervalColor}
                >
                  {props.interval?.map((interval) => (
                    <InputGroup
                      key={interval._id}
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
                        type="text"
                        id="start"
                        name="start"
                        mr="2"
                        value={formatedDate(interval.start)}
                        borderColor={intervalInputBorderColor}
                        disabled
                        readOnly
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
                        value={formatedDate(interval.end)}
                        borderColor={intervalInputBorderColor}
                        disabled
                        readOnly
                      />
                    </InputGroup>
                  ))}
                </VStack>
              </VStack>
            </form>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px" borderTopColor={mainColor}>
            <ButtonGroup colorScheme="red" variant="outline" isAttached>
              <IconButton
                aria-label="delete service"
                form="deleteForm"
                type="submit"
                // onClick={onClose}
                isLoading={loading}
                icon={<TbTrash />}
              />
              <Button
                type="submit"
                form="deleteForm"
                // onClick={onClose}
                isLoading={loading}
              >
                Deletar
              </Button>
            </ButtonGroup>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}
