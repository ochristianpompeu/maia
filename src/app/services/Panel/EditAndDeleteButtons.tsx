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
import { TbEdit } from "react-icons/tb";
import { DeleteDrawer } from "./DeleteDrawer";
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
      <ButtonGroup variant="outline" isAttached size={["sm", "xs"]}>
        <IconButton
          colorScheme="purple"
          aria-label="Edit"
          onClick={onEditOpen}
          icon={<TbEdit />}
        />
        <DeleteDrawer
          name={props.service.name}
          description={props.service.description}
          _id={props.service._id as string}
          org={props.service.org}
        />
      </ButtonGroup>
      <Drawer
        size={{ base: "xs", md: "sm" }}
        isOpen={isEditOpen}
        onClose={onEditClose}
        initialFocusRef={firstField}
      >
        <DrawerOverlay />
        <DrawerContent>
          <EditDrawerContent
            name={props.service.name}
            description={props.service.description}
            _id={props.service._id as string}
            initialRef={firstField}
            onClose={handleCloseEditDrawer}
            org={props.service.org}
          />
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}
