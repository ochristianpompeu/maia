import { ServiceProps } from "@/lib/interfaces";
import {
  ButtonGroup,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import React, { Fragment } from "react";
import { TbEdit, TbTrash } from "react-icons/tb";
import { DeleteDrawerContent } from "./DeleteDrawerContent";
import { EditDrawerContent } from "./EditDrawerContent";

interface EditAndDeleteButtonsProps {
  service: ServiceProps;
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
    <Fragment>
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
          <EditDrawerContent
            name={props.service.name}
            description={props.service.description}
            id={props.service._id as string}
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
          <DeleteDrawerContent
            name={props.service.name}
            description={props.service.description}
            id={props.service._id as string}
            initialRef={firstField}
            onClose={handleCloseDeleteDrawer}
          />
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}
