import { PanelAndMenuIcons } from "@/lib/Links";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
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
import { AddDrawerContent } from "./AddDrawerContent";
import { PanelAccordion } from "./PanelAccordion";
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
  const bgCargHeader = useColorModeValue("gray.50", "whiteAlpha.100");

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
            <Icon fontSize="2xl" as={PanelAndMenuIcons.hours} />
            <Heading size="md">Horários</Heading>
          </HStack>
          <AddDrawerContent />
        </HStack>
      </CardHeader>
      <Divider />

      <CardBody borderRadius="md" overflowY="auto">
        <Accordion defaultIndex={[0]} allowMultiple>
          <PanelAccordion>
            <PanelContent />
          </PanelAccordion>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Section 2 title
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </CardBody>
    </Card>
  );
}
