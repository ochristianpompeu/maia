import { OrgProps } from "@/lib/interfaces";
import {
  ButtonGroup,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { TbEdit, TbTrash } from "react-icons/tb";
import { OrgDeleteDrawerContent } from "./OrgDeleteDrawerContent";
import { OrgEditDrawerContent } from "./OrgEditDrawerContent";

interface EditAndDeleteButtonsProps {
  org: OrgProps;
}

export function EditAndDeleteButtons(props: EditAndDeleteButtonsProps) {
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const firstField = React.useRef() as any;

  function handleCloseDeleteDrawer() {
    onDeleteClose;
  }

  function handleCloseEditDrawer() {
    onEditClose;
  }

  return (
    <>
      <ButtonGroup>
        <IconButton
          size="sm"
          variant="outline"
          colorScheme="purple"
          aria-label="Edit"
          onClick={onEditOpen}
          icon={<TbEdit />}
        />
        <IconButton
          size="sm"
          variant="outline"
          colorScheme="orange"
          aria-label="Delete"
          onClick={onDeleteOpen}
          icon={<TbTrash />}
        />
      </ButtonGroup>
      <Drawer
        size={{ base: "full", md: "md" }}
        isOpen={isEditOpen}
        onClose={onEditClose}
        initialFocusRef={firstField}
      >
        <DrawerOverlay />
        <DrawerContent>
          <OrgEditDrawerContent
            name={props.org.name}
            description={props.org.description}
            id={props.org._id as string}
            initialRef={firstField}
            onClose={handleCloseEditDrawer}
          />
        </DrawerContent>
      </Drawer>
      <Drawer
        size={{ base: "full", md: "md" }}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        initialFocusRef={firstField}
      >
        <DrawerOverlay />
        <DrawerContent>
          <OrgDeleteDrawerContent
            name={props.org.name}
            description={props.org.description}
            id={props.org._id as string}
            initialRef={firstField}
            onClose={handleCloseDeleteDrawer}
          />
        </DrawerContent>
      </Drawer>
    </>
  );
}
