"use client";
import {
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerFooter,
  DrawerHeader,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { ChangeEvent, Fragment, useState } from "react";

interface OrgEditDrawerContentProps {
  name: string;
  id: string;
}

export function OrgEditDrawerContent(props: OrgEditDrawerContentProps) {
  const firstField = React.useRef() as any;
  const [name, setName] = useState(props.name);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.value;
    setName(name);
  }

  return (
    <Fragment>
      <DrawerCloseButton />
      <DrawerHeader textColor="purple.500" borderBottomWidth="1px">
        Edição do cadastro da empresa
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
            value={name}
            onChange={handleChange}
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
