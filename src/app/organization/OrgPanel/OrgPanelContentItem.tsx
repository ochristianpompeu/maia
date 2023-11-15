import { applicationConfig } from "@/lib/config";
import { query } from "@/lib/genericFunctions";
import { OrgProps } from "@/lib/interfaces";
import { Box, Divider, HStack, Heading, Text } from "@chakra-ui/react";
import { use } from "react";
import { EditAndDeleteButtons } from "./EditAndDeleteButtons";
const fetchMap = new Map<string, Promise<any>>();

export function OrgPanelContentItem() {
  const { orgs } = use(
    query("orgs", () =>
      fetch(applicationConfig.baseUrl + "/api/organization", {
        method: "GET",
        // cache: "no-store",
        next: {
          revalidate: 300,
        },
      }).then((res) => res.json())
    )
  );

  return (
    <>
      {orgs.map((org: OrgProps) => (
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
    </>
  );
}
