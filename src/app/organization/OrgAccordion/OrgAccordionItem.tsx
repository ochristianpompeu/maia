import { applicationConfig } from "@/lib/config";
import { OrgProps } from "@/lib/interfaces";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import { use } from "react";
import { EditAndDeleteButtons } from "./EditAndDeleteButtons";

const fetchMap = new Map<string, Promise<any>>();

function queryClient(name: string, query: () => Promise<any>) {
  if (!fetchMap.has(name)) {
    fetchMap.set(name, query());
  }

  return fetchMap.get(name)!;
}

export function OrgAccordionItem() {
  const { orgs } = use(
    queryClient("orgs", () =>
      fetch(applicationConfig.baseUrl + "/api/organization", {
        method: "GET",
        cache: "no-store",
      }).then((res) => res.json())
    )
  );

  return (
    <>
      {orgs.map((org: OrgProps) => (
        <AccordionItem key={org._id}>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                {org.name}
              </Box>

              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
            <Box w="full" flex="1" textAlign="right">
              <EditAndDeleteButtons org={org} />
            </Box>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </>
  );
}
