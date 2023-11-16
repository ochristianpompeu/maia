/* eslint-disable react-hooks/exhaustive-deps */
import { useOrgs } from "@/app/hooks/useOrgs";
import { OrgProps } from "@/lib/interfaces";
import { Box, Divider, HStack, Heading, Text } from "@chakra-ui/react";
import { EditAndDeleteButtons } from "./EditAndDeleteButtons";

export function OrgPanelContentItem() {
  const { orgs } = useOrgs();
  console.log("Orgs: ", orgs);

  return (
    <>
      {orgs?.map((org: OrgProps) => (
        <Box pt="2" key={org._id}>
          <HStack justifyContent="space-between">
            <Heading size="xs" textTransform="uppercase">
              {org.name}
            </Heading>
            <EditAndDeleteButtons org={org} />
          </HStack>
          <Text pt="2" fontSize="sm">
            {org.description}
          </Text>
          <Divider pb="4" />
        </Box>
      ))}
      {JSON.stringify(orgs)}
    </>
  );
}
