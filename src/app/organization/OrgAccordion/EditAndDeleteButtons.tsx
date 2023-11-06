import {
    ButtonGroup,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    IconButton,
    useDisclosure,
} from "@chakra-ui/react";
import { TbEdit, TbTrash } from "react-icons/tb";
import { OrgEditDrawerContent } from "../OrgEditDrawer/OrgEditDrawerContent";

export function EditAndDeleteButtons() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        // initialFocusRef={firstField}
      >
        <DrawerOverlay />
        <DrawerContent>
          <OrgEditDrawerContent />
        </DrawerContent>
      </Drawer>
    </>
  );
}
