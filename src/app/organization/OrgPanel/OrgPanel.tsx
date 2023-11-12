import { PanelAndMenuIcons } from "@/lib/Links";
import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  CardProps,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Heading,
  Icon,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode, useRef } from "react";
import { BsBuildingAdd } from "react-icons/bs";
import { OrgAddDrawerContent } from "./OrgAddDrawerContent";
import { OrgDeleteDrawerContent } from "./OrgDeleteDrawerContent";
import { OrgEditDrawerContent } from "./OrgEditDrawerContent";
import { OrgPanelContent } from "./OrgPanelContent";
interface OrgDataPanelProps extends CardProps {
  children?: ReactNode;
}
export function OrgPanel({
  bgGradient,
  overflowY,
  w,
  children,
  ...rest
}: OrgDataPanelProps) {
  const {
    isOpen: isOpenAddOrg,
    onOpen: onOpenAddOrg,
    onClose: onCloseAddOrg,
  } = useDisclosure();
  const {
    isOpen: isOpenEditOrg,
    onOpen: onOpenEditOrg,
    onClose: onCloseEditOrg,
  } = useDisclosure();
  const {
    isOpen: isOpenDeleteOrg,
    onOpen: onOpenDeleteOrg,
    onClose: onCloseDeleteOrg,
  } = useDisclosure();
  const firstField = useRef() as any;

  function handleOnAddClose() {
    onCloseAddOrg;
  }

  function handleOnEditClose() {
    onCloseAddOrg;
  }

  function handleOnDeleteClose() {
    onCloseAddOrg;
  }

  return (
    <Card
      // bgGradient="linear(to-b, gray.100,gray.50)"
      overflowY="auto"
      w="full"
      {...rest}
      m={0}
    >
      <CardHeader w="full">
        <HStack justifyContent="space-between">
          <HStack m={0} p={0}>
            <Icon fontSize="2xl" as={PanelAndMenuIcons.org} />
            <Heading size="md">Empresa</Heading>
          </HStack>
          <IconButton
            display={{ md: "none" }}
            aria-label="Add Org"
            colorScheme="purple"
            onClick={onOpenAddOrg}
            icon={<AddIcon />}
          />
          <ButtonGroup display={{ base: "none", md: "inline-flex" }}>
            <Button
              onClick={onOpenAddOrg}
              leftIcon={<BsBuildingAdd />}
              colorScheme="purple"
            >
              Adicionar
            </Button>
          </ButtonGroup>
        </HStack>
      </CardHeader>
      <Drawer
        size={{ base: "full", md: "md" }}
        isOpen={isOpenAddOrg}
        onClose={onCloseAddOrg}
        initialFocusRef={firstField}
      >
        <DrawerOverlay />
        <DrawerContent>
          <OrgAddDrawerContent
            initialRef={firstField}
            onClose={handleOnAddClose}
          />
        </DrawerContent>
      </Drawer>

      <Drawer
        size={{ base: "full", md: "md" }}
        isOpen={isOpenEditOrg}
        onClose={onCloseEditOrg}
        initialFocusRef={firstField}
      >
        <DrawerOverlay />
        <DrawerContent>
          <OrgEditDrawerContent
            initialRef={firstField}
            onClose={handleOnEditClose}
          />
        </DrawerContent>
      </Drawer>

      <Drawer
        size={{ base: "full", md: "md" }}
        isOpen={isOpenDeleteOrg}
        onClose={onCloseDeleteOrg}
        initialFocusRef={firstField}
      >
        <DrawerOverlay />
        <DrawerContent>
          <OrgDeleteDrawerContent
            initialRef={firstField}
            onClose={handleOnDeleteClose}
          />
        </DrawerContent>
      </Drawer>

      <CardBody h="100vh">
        <OrgPanelContent />
      </CardBody>
    </Card>
  );
}
