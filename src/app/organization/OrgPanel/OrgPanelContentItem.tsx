/* eslint-disable react-hooks/exhaustive-deps */
import { UserContext } from "@/app/contexts/userContext";
import { useOrgs } from "@/app/hooks/useOrgs";
import { Box, Divider, HStack, Heading, SkeletonText, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { EditAndDeleteButtons } from "./EditAndDeleteButtons";

export function OrgPanelContentItem() {
  const user = useContext(UserContext);
  const { orgs } = useOrgs();
  if (orgs) {
    return (
      <>
        {orgs?.map((org: any) => (
          <Box pt="2" key={org?._id}>
            <HStack justifyContent="space-between">
              <Heading size="xs" textTransform="uppercase">
                {org?.name}
              </Heading>
              <EditAndDeleteButtons org={org} />
            </HStack>
            <Text pt="2" fontSize="sm">
              {org?.description}
            </Text>
            <Divider pb="4" />
          </Box>
        ))}
        {/* <Heading>{user?.name}</Heading>
        {orgs.map((org: OrgProps) => (
          <Heading key={org._id}>{org?.name}</Heading>
        ))} */}
      </>
    );
  }

  return <SkeletonText />;
}
