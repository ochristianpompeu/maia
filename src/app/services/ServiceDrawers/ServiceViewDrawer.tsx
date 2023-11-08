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
import { TbArrowBack } from "react-icons/tb";

export function ServiceViewDrawerContent(props: ServiceProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  function handleChangeInput() {}
  function handleChangeTextArea() {}
  function handleSubmit() {}

  return (
    <Fragment>
      <DrawerCloseButton />
      <DrawerHeader textColor="green.500" borderBottomWidth="1px">
        Dados do Serviço
      </DrawerHeader>

      <DrawerBody>
        <form id="alterOrgForm" onSubmit={handleSubmit}>
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
            disabled
            variant="filled"
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
            disabled
            variant="filled"
          />
        </form>
      </DrawerBody>
      <DrawerFooter>
        <Button
          colorScheme="green"
          variant="outline"
          type="submit"
          form="alterOrgForm"
          onClick={props.onClose}
          isLoading={loading}
          leftIcon={<TbArrowBack />}
        >
          Voltar
        </Button>
      </DrawerFooter>
    </Fragment>
  );
}
