/* eslint-disable react-hooks/exhaustive-deps */
import { useOrgs } from "@/app/hooks/useOrgs";
import {
  Box,
  Divider,
  HStack,
  Heading,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { Fragment } from "react";
import { EditAndDeleteButtons } from "./EditAndDeleteButtons";

export function OrgPanelContentItem() {
  const { orgs } = useOrgs();
  if (orgs) {
    return (
      <Fragment>
        {orgs?.map((org: any) => (
          <Box key={org?._id}>
            <HStack justifyContent="space-between" alignItems="center">
              <Heading m={0} p={0} size="xs" textTransform="uppercase">
                {org?.name}
              </Heading>
              <EditAndDeleteButtons org={org} />
            </HStack>
            <Text fontSize="sm">{org?.description}</Text>
            <Divider pb="4" />
            <Divider />
          </Box>
        ))}
      </Fragment>
    );
  }

  return <SkeletonText />;
}
