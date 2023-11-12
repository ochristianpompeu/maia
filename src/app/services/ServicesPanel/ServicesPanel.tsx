import { PanelAndMenuIcons } from "@/lib/Links";
import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  CardProps,
  Divider,
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
import { RiServiceLine } from "react-icons/ri";
import { OrgAddDrawerContent } from "./ServicesAddDrawerContent";
import { ServicesPanelContent } from "./ServicesPanelContent";
interface OrgDataPanelProps extends CardProps {
  children?: ReactNode;
}
export function ServicesPanel({
  bgGradient,
  overflowY,
  w,
  children,
  ...rest
}: OrgDataPanelProps) {
  const {
    isOpen: isOpenAddService,
    onOpen: onOpenAddService,
    onClose: onCloseAddService,
  } = useDisclosure();

  const firstField = useRef() as any;

  function handleOnAddClose() {
    onCloseAddService;
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
            <Icon fontSize="2xl" as={PanelAndMenuIcons.services} />
            <Heading size="md">Serviços</Heading>
          </HStack>
          <IconButton
            display={{ md: "none" }}
            aria-label="Add Org"
            colorScheme="purple"
            onClick={onOpenAddService}
            icon={<AddIcon />}
          />
          <ButtonGroup display={{ base: "none", md: "inline-flex" }}>
            <Button
              onClick={onOpenAddService}
              leftIcon={<RiServiceLine />}
              colorScheme="purple"
            >
              Adicionar
            </Button>
          </ButtonGroup>
        </HStack>
      </CardHeader>
      <Divider />
      <Drawer
        size={{ base: "full", md: "md" }}
        isOpen={isOpenAddService}
        onClose={onCloseAddService}
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

      <CardBody h="100vh">
        <ServicesPanelContent />
      </CardBody>
    </Card>
  );
}
