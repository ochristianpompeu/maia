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
import { OrgEditDrawerContent } from "../OrgEditDrawer/OrgEditDrawerContent";

interface EditAndDeleteButtonsProps {
  org: OrgProps;
}

export function EditAndDeleteButtons(props: EditAndDeleteButtonsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef() as any;
  return (
    <>
      <ButtonGroup>
        <IconButton
          size="sm"
          variant="outline"
          colorScheme="purple"
          aria-label="Edit"
          onClick={onOpen}
          icon={<TbEdit />}
        />
        <IconButton
          size="sm"
          variant="outline"
          colorScheme="orange"
          aria-label="Delete"
          icon={<TbTrash />}
        />
      </ButtonGroup>
      <Drawer
        size={{ base: "full", md: "md" }}
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={firstField}
      >
        <DrawerOverlay />
        <DrawerContent>
          <OrgEditDrawerContent
            name={props.org.name}
            id={props.org._id as string}
            initialRef={firstField}
          />
        </DrawerContent>
      </Drawer>
    </>
  );
}
