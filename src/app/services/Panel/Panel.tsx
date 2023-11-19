import { useServices } from "@/app/hooks/useServices";
import { PanelAndMenuIcons } from "@/lib/Links";
import {
  Card,
  CardBody,
  CardHeader,
  CardProps,
  Divider,
  HStack,
  Heading,
  Icon,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { AddDrawer } from "./AddDrawer";
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

  const bgCargHeader = useColorModeValue("gray.50", "whiteAlpha.100");
  const { updateServices } = useServices();
  const router = useRouter();

  return (
    <Card
      w="full"
      {...rest}
      m={0}
      borderRadius="md"
    >
      <CardHeader borderRadius="md" w="full" p="2" bg={bgCargHeader}>
        <HStack justifyContent="space-between">
          <HStack m={0} p={0}>
            <Icon fontSize="2xl" as={PanelAndMenuIcons.services} />
            <Heading size="md">Serviços</Heading>
          </HStack>
          <AddDrawer />
        </HStack>
      </CardHeader>

      <Divider />

      <CardBody borderRadius="md" p="2">
        <PanelContent handleDisplayDetail={handleDisplayDetail} />
      </CardBody>
    </Card>
  );
}
