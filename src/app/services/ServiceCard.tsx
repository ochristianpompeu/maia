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
import { ServiceViewDrawerContent } from "./ServiceDrawers/ServiceViewDrawer";

export function ServiceCard() {
  const {
    isOpen: isOpenView,
    onClose: onCloseView,
    onOpen: onOpenView,
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
            />
            <IconButton
              colorScheme="orange"
              variant="outline"
              aria-label="delete service"
              icon={<TbTrash />}
            />
          </ButtonGroup>
        </CardFooter>
      </Card>
      <DrawerView
        size={{ base: "full", md: "md" }}
        isOpen={isOpenView}
        onClose={onCloseView}
        initialFocusRef={firstField}
      >
        <DrawerOverlay />
        <DrawerContent>
          <ServiceViewDrawerContent />
        </DrawerContent>
      </DrawerView>
    </Fragment>
  );
}
