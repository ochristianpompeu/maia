import { Accordion } from "@chakra-ui/react";
import OrgAccordionItem from "./OrgAccordionItem";

export function OrgAccordion() {
  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      <OrgAccordionItem />
    </Accordion>
  );
}
