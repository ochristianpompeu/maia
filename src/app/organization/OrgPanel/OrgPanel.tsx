import { useOrgs } from "@/app/hooks/useOrgs";
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
import { useRouter } from "next/navigation";
import { ReactNode, useRef } from "react";
import { BsBuildingAdd } from "react-icons/bs";
import { TbReload } from "react-icons/tb";
import { OrgAddDrawerContent } from "./OrgAddDrawerContent";
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

  const firstField = useRef() as any;
  const bgCargHeader = useColorModeValue("blackAlpha.100", "whiteAlpha.100");
  const router = useRouter();
  const { updateOrgs } = useOrgs();

  function handleOnAddClose() {
    router.refresh();
    onCloseAddOrg;
  }

  return (
    <Card
      w="full"
      {...rest}
      m={0}
      height={{ base: "auto", md: applicationConfig.staticHeightPanel }}
    >
      <CardHeader borderRadius="md" w="full" p="2" bg={bgCargHeader}>
        <HStack p={0} justifyContent="space-between">
          <HStack m={0} p={0}>
            <Icon fontSize="2xl" as={PanelAndMenuIcons.org} />
            <Heading size="md">Empresa</Heading>
          </HStack>
          <IconButton
            display={{ md: "none" }}
            aria-label="Add Org"
            colorScheme="purple"
            onClick={onOpenAddOrg}
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
              onClick={onOpenAddOrg}
              aria-label="Add Org"
              icon={<BsBuildingAdd />}
            />
            <Button onClick={onOpenAddOrg}>Adicionar</Button>
            <IconButton
              onClick={updateOrgs}
              aria-label="Refresh"
              icon={<TbReload />}
            />
          </ButtonGroup>
        </HStack>
      </CardHeader>
      <Divider />
      <Drawer
        size={{ base: "full", md: "sm" }}
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

      <CardBody
        overflowY="auto"
        // height={{ base: "auto", md: applicationConfig.staticHeightPanel }}
      >
        <OrgPanelContent />
      </CardBody>
    </Card>
  );
}
