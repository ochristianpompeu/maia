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
import { AddDrawerContent } from "./AddDrawerContent";
import { ServicesPanelContent } from "./ServicesPanelContent";
interface DataPanelProps extends CardProps {
  children?: ReactNode;
  handleDisplayDetail: (display: string) => void;
}
export function ServicesPanel({
  bgGradient,
  overflowY,
  w,
  children,
  handleDisplayDetail,
  ...rest
}: DataPanelProps) {
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();

  const firstField = useRef() as any;

  function handleOnAddClose() {
    onCloseAdd;
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
            aria-label="Add Service"
            colorScheme="purple"
            onClick={onOpenAdd}
            icon={<AddIcon />}
          />
          <ButtonGroup display={{ base: "none", md: "inline-flex" }}>
            <Button
              onClick={onOpenAdd}
              leftIcon={<RiServiceLine />}
              colorScheme="purple"
              variant="outline"
            >
              Adicionar
            </Button>
          </ButtonGroup>
        </HStack>
      </CardHeader>
      <Divider />
      <Drawer
        size={{ base: "full", md: "md" }}
        isOpen={isOpenAdd}
        onClose={onCloseAdd}
        initialFocusRef={firstField}
      >
        <DrawerOverlay />
        <DrawerContent>
          <AddDrawerContent
            initialRef={firstField}
            onClose={handleOnAddClose}
          />
        </DrawerContent>
      </Drawer>

      <CardBody h="100vh">
        <ServicesPanelContent handleDisplayDetail={handleDisplayDetail} />
      </CardBody>
    </Card>
  );
}
