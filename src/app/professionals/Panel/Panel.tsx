import { useServices } from "@/app/hooks/useServices";
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
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ReactNode, useRef } from "react";
import { BsPersonBadge } from "react-icons/bs";
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
  const { updateServices } = useServices();
  const router = useRouter();

  function handleOnAddClose() {
    updateServices();
    onCloseAdd;
    router.refresh()
  }

  return (
    <Card
      w="full"
      {...rest}
      m={0}
      // height={{ base: "auto", md: applicationConfig.staticHeightPanel }}
      borderRadius="md"
    >
      <CardHeader borderRadius="md" w="full" p="2" bg={bgCargHeader}>
        <HStack justifyContent="space-between">
          <HStack m={0} p={0}>
            <Icon fontSize="2xl" as={PanelAndMenuIcons.professionals} />
            <Heading size="md">Profissionais</Heading>
          </HStack>
          <IconButton
            display={{ md: "none" }}
            aria-label="Add Professional"
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
            size="sm"
          >
            <IconButton
              onClick={onOpenAdd}
              aria-label="Add Professional"
              icon={<BsPersonBadge />}
            />
            <Button onClick={onOpenAdd}>Adicionar</Button>
            <IconButton
              // onClick={updateServices}
              aria-label="Refresh"
              icon={<TbReload />}
            />
          </ButtonGroup>
        </HStack>
      </CardHeader>
      <Divider />
      <Drawer
        size={{ base: "full", md: "sm" }}
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

      <CardBody borderRadius="md" overflowY="auto">
        <PanelContent handleDisplayDetail={handleDisplayDetail} />
      </CardBody>
    </Card>
  );
}
