import { Box, Heading, Stack, StackDivider, Text } from "@chakra-ui/react";

export function OrgPanelContent() {
  return (
    <Stack divider={<StackDivider />} spacing="4">
      <Box>
        <Heading size="xs" textTransform="uppercase">
          Summary
        </Heading>
        <Text pt="2" fontSize="sm">
          View a summary of all your clients over the last month.
        </Text>
      </Box>
      <Box>
        <Heading size="xs" textTransform="uppercase">
          Overview
        </Heading>
        <Text pt="2" fontSize="sm">
          Check out the overview of your clients.
        </Text>
      </Box>
    </Stack>
  );
}
