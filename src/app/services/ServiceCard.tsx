import {
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    DrawerContent,
    DrawerOverlay,
    Drawer as DrawerView,
    Heading,
    IconButton,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import React, { Fragment } from "react";
import { TbEdit, TbEye, TbTrash } from "react-icons/tb";
import { ServiceDeleteDrawerContent } from "./ServiceDrawers/ServiceDeleteDrawer";
import { ServiceEditDrawerContent } from "./ServiceDrawers/ServiceEditDrawer";
import { ServiceViewDrawerContent } from "./ServiceDrawers/ServiceViewDrawer";

export function ServiceCard() {
  const {
    isOpen: isOpenView,
    onClose: onCloseView,
    onOpen: onOpenView,
  } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onClose: onCloseEdit,
    onOpen: onOpenEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onClose: onCloseDelete,
    onOpen: onOpenDelete,
  } = useDisclosure();

  const firstField = React.useRef() as any;
  return (
    <Fragment>
      <Card maxH="sm" maxW="md" w={"full"}>
        <CardHeader>
          <Heading size="md">Card</Heading>
        </CardHeader>
        <CardBody>
          <Text>View a summary of all your customers over the last month.</Text>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup w="full">
            <IconButton
              size="md"
              colorScheme="green"
              variant="outline"
              aria-label="view service"
              icon={<TbEye />}
              onClick={onOpenView}
            />
            <IconButton
              colorScheme="purple"
              variant="outline"
              aria-label="edit service"
              icon={<TbEdit />}
              onClick={onOpenEdit}
            />
            <IconButton
              colorScheme="orange"
              variant="outline"
              aria-label="delete service"
              icon={<TbTrash />}
              onClick={onOpenDelete}
            />
          </ButtonGroup>
        </CardFooter>
      </Card>
      <DrawerView
        size={{ base: "full", md: "md" }}
        isOpen={isOpenView}
        onClose={onCloseView}
      >
        <DrawerOverlay />
        <DrawerContent>
          <ServiceViewDrawerContent onClose={onCloseView} />
        </DrawerContent>
      </DrawerView>
      <DrawerView
        size={{ base: "full", md: "md" }}
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        initialFocusRef={firstField}
      >
        <DrawerOverlay />
        <DrawerContent>
          <ServiceEditDrawerContent
            onClose={onCloseEdit}
            initialRef={firstField}
          />
        </DrawerContent>
      </DrawerView>
      <DrawerView
        size={{ base: "full", md: "md" }}
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        initialFocusRef={firstField}
      >
        <DrawerOverlay />
        <DrawerContent>
          <ServiceDeleteDrawerContent onClose={onCloseDelete} />
        </DrawerContent>
      </DrawerView>
    </Fragment>
  );
}
