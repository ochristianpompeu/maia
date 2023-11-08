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
import { TbEdit } from "react-icons/tb";

export function ServiceEditDrawerContent(props: ServiceProps) {
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
        bgGradient="linear(to-b, purple.300, purple.200)"
        textColor="white"
        borderBottomWidth="1px"
      >
        Atualizar Serviço
      </DrawerHeader>

      <DrawerBody>
        <form id="alterServiceForm" onSubmit={handleSubmit}>
          <FormLabel pt="4" htmlFor="name">
            Nome
          </FormLabel>
          <Input
            ref={props.initialRef}
            id="name"
            name="name"
            placeholder="Nome da Empresa..."
            focusBorderColor="purple.400"
            value={name}
            onChange={handleChangeInput}
            variant="outline"
          />
          <FormLabel pt="4" htmlFor="description">
            Descrição
          </FormLabel>
          <Textarea
            id="description"
            name="description"
            placeholder="Digite uma descrição para a sua empresa..."
            focusBorderColor="purple.400"
            value={description}
            size="md"
            onChange={handleChangeTextArea}
            variant="outline"
          />
        </form>
      </DrawerBody>
      <DrawerFooter>
        <Button
          colorScheme="purple"
          variant="outline"
          type="submit"
          form="alterServiceForm"
          onClick={props.onClose}
          isLoading={loading}
          leftIcon={<TbEdit />}
        >
          Atualizar
        </Button>
      </DrawerFooter>
    </Fragment>
  );
}
