import { OrgProps } from "@/lib/interfaces";
import {
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    useColorModeValue,
} from "@chakra-ui/react";
interface PanelAccordionProps {
  children?: React.ReactNode;
  org?: OrgProps;
}
export function PanelAccordion({ children, org }: PanelAccordionProps) {
  const bgAccordionButton = useColorModeValue("gray.100", "blackAlpha.400");
  const colorAccordionButton = useColorModeValue("gray.800", "gray.100");
  return (
    <AccordionItem
    borderLeft="1px"
    borderRight="1px"
    borderColor="gray.100"
      _first={{
        borderTopRadius: "lg",
      }}
      _last={{
        borderBottomRadius: "lg",
        borderBottom: "1px",
        borderBottomColor: "gray.100"
      }}
    >
      <h2>
        <AccordionButton
          _expanded={{
            bg: bgAccordionButton,
            color: colorAccordionButton,
          }}
        >
          <Box as="span" flex="1" textAlign="left">
            {org?.name}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>{children}</AccordionPanel>
    </AccordionItem>
  );
}
