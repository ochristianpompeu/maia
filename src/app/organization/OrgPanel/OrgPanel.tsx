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
  const firstField = useRef() as any;
  function handleOnAddClose() {
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

      <CardBody>{children}</CardBody>
    </Card>
  );
}
