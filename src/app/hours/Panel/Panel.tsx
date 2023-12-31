import { useOrgs } from "@/app/hooks/useOrgs";
import { PanelAndMenuIcons } from "@/lib/Links";
import { OrgProps } from "@/lib/interfaces";
import {
  Accordion,
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
import { ReactNode } from "react";
import { AddDrawer } from "./AddDrawer";
import { PanelAccordionItem } from "./PanelAccordionItem";
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
  const { orgs } = useOrgs();
  const bgCargHeader = useColorModeValue("gray.50", "whiteAlpha.100");

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
            <Icon fontSize="2xl" as={PanelAndMenuIcons.hours} />
            <Heading size="md">Horários</Heading>
          </HStack>
          <AddDrawer />
        </HStack>
      </CardHeader>
      <Divider />

      <CardBody borderRadius="md" overflowY="auto">
        <Accordion
          defaultIndex={[0]}
          allowMultiple
        >
          {orgs.map((org: OrgProps) => (
            <PanelAccordionItem key={org._id} org={org} >
              <PanelContent orgId={org._id} />
            </PanelAccordionItem>
          ))}
        </Accordion>
      </CardBody>
    </Card>
  );
}
