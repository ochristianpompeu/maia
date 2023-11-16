import { PanelAndMenuIcons } from "@/lib/Links";
import { applicationConfig } from "@/lib/config";
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
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode, useRef } from "react";
import { RiServiceLine } from "react-icons/ri";
import { TbReload } from "react-icons/tb";
import { AddDrawerContent } from "./AddDrawerContent";
import { PanelContent } from "./PanelContent";
interface DataPanelProps extends CardProps {
  children?: ReactNode;
  handleDisplayDetail: (display: string) => void;
}
export function Panel({
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
  const bgCargHeader = useColorModeValue("gray.50", "whiteAlpha.100");

  function handleOnAddClose() {
    onCloseAdd;
  }

  return (
    <Card
      w="full"
      {...rest}
      m={0}
      height={{ base: "auto", md: applicationConfig.staticHeightPanel }}
      borderRadius="md"
    >
      <CardHeader borderRadius="md" w="full" p="2" bg={bgCargHeader}>
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
            variant="outline"
            icon={<AddIcon />}
          />
          <ButtonGroup
            variant="outline"
            colorScheme="purple"
            display={{ base: "none", md: "inline-flex" }}
            isAttached
          >
            <IconButton
              onClick={onOpenAdd}
              aria-label="Add Service"
              icon={<RiServiceLine />}
            />
            <Button onClick={onOpenAdd}>Adicionar</Button>
            <IconButton
              // onClick={updateOrgs}
              aria-label="Refresh"
              icon={<TbReload />}
            />
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

      <CardBody overflowY="auto">
        <PanelContent handleDisplayDetail={handleDisplayDetail} />
      </CardBody>
    </Card>
  );
}
