import { applicationConfig } from "@/lib/config";
import { OrgProps } from "@/lib/interfaces";
import { Box, Divider, HStack, Heading, Text } from "@chakra-ui/react";
import { use } from "react";
import { EditAndDeleteButtons } from "./EditAndDeleteButtons";
const fetchMap = new Map<string, Promise<any>>();

function queryClient(name: string, query: () => Promise<any>) {
  if (!fetchMap.has(name)) {
    fetchMap.set(name, query());
  }

  return fetchMap.get(name)!;
}
export function OrgPanelContentItem() {
  const { orgs } = use(
    queryClient("orgs", () =>
      fetch(applicationConfig.baseUrl + "/api/organization", {
        method: "GET",
        // cache: "no-store",
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
