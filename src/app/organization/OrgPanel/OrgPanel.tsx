import { PanelAndMenuIcons } from "@/lib/Links";
import { applicationConfig } from "@/lib/config";
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
} from "@chakra-ui/react";
import { AddDrawerContent } from "./AddDrawerContent";
import { OrgPanelContent } from "./OrgPanelContent";
interface OrgDataPanelProps extends CardProps {}
export function OrgPanel({ overflowY, ...rest }: OrgDataPanelProps) {
  const bgCargHeader = useColorModeValue("blackAlpha.100", "whiteAlpha.100");

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
          <AddDrawerContent />
        </HStack>
      </CardHeader>
      <Divider />

      <CardBody overflowY="auto">
        <OrgPanelContent />
      </CardBody>
    </Card>
  );
}
