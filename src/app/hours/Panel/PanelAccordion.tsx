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
}
export function PanelAccordion({ children }: PanelAccordionProps) {
  const bgAccordionButton = useColorModeValue("gray.100", "blackAlpha.400");
  const colorAccordionButton = useColorModeValue("gray.800", "gray.100");
  return (
    <AccordionItem>
      <h2>
        <AccordionButton
          _expanded={{
            bg: bgAccordionButton,
            color: colorAccordionButton,
          }}
        >
          <Box as="span" flex="1" textAlign="left">
            Nome da Empresa
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>{children}</AccordionPanel>
    </AccordionItem>
  );
}
