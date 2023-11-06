import {
    Button,
    DrawerBody,
    DrawerCloseButton,
    DrawerFooter,
    DrawerHeader,
    FormLabel,
    Input,
} from "@chakra-ui/react";
import React, { Fragment } from "react";

export function OrgAddDrawerContent() {
  const firstField = React.useRef() as any;
  return (
    <Fragment>
      <DrawerCloseButton />
      <DrawerHeader textColor="purple.500" borderBottomWidth="1px">
        Cadastre sua empresa
      </DrawerHeader>

      <DrawerBody>
        <form
          id="createOrgForm"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("submitted");
          }}
        >
          <FormLabel htmlFor="name">Nome da Empresa</FormLabel>
          <Input
            ref={firstField}
            id="name"
            name="name"
            placeholder="Nome da Empresa..."
            focusBorderColor="purple.400"
          />
        </form>
      </DrawerBody>

      <DrawerFooter>
        <Button
          colorScheme="purple"
          variant="outline"
          type="submit"
          form="createOrgForm"
        >
          Salvar
        </Button>
      </DrawerFooter>
    </Fragment>
  );
}
