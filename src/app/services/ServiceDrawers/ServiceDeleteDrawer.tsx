import { ServiceProps } from "@/lib/interfaces";
import {
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerFooter,
  DrawerHeader,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Fragment, useState } from "react";
import { TbTrash } from "react-icons/tb";

export function ServiceDeleteDrawerContent(props: ServiceProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  function handleChangeInput() {}
  function handleChangeTextArea() {}
  function handleSubmit() {}

  return (
    <Fragment>
      <DrawerCloseButton />
      <DrawerHeader
        bgGradient="linear(to-b, orange.300, orange.200)"
        textColor="white"
        borderBottomWidth="1px"
      >
        Deletar Serviço
      </DrawerHeader>

      <DrawerBody>
        <form id="deleteServiceForm" onSubmit={handleSubmit}>
          <FormLabel pt="4" htmlFor="name">
            Nome
          </FormLabel>
          <Input
            ref={props.initialRef}
            id="name"
            name="name"
            placeholder="Nome da Empresa..."
            focusBorderColor="orange.400"
            value={name}
            onChange={handleChangeInput}
            variant="filled"
            disabled
            borderColor="orange.600"
          />
          <FormLabel pt="4" htmlFor="description">
            Descrição
          </FormLabel>
          <Textarea
            id="description"
            name="description"
            placeholder="Digite uma descrição para a sua empresa..."
            focusBorderColor="orange.400"
            value={description}
            size="md"
            onChange={handleChangeTextArea}
            variant="filled"
            disabled
            borderColor="orange.600"
          />
        </form>
      </DrawerBody>
      <DrawerFooter>
        <Button
          colorScheme="orange"
          variant="outline"
          type="submit"
          form="deleteServiceForm"
          onClick={props.onClose}
          isLoading={loading}
          leftIcon={<TbTrash />}
        >
          Deletar
        </Button>
      </DrawerFooter>
    </Fragment>
  );
}
