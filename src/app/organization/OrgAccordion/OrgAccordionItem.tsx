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
import { EditAndDeleteButtons } from "./EditAndDeleteButtons";

async function getOrgs() {
  try {
    const res = await fetch(applicationConfig.baseUrl + "/api/organization", {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch organization api.");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading orgs: ", error);
  }
}

export default async function OrgAccordionItem() {
  const { orgs } = await getOrgs();

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
