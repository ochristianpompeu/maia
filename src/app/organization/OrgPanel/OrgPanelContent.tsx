import { Stack, StackDivider } from "@chakra-ui/react";
import { OrgPanelContentItem } from "./OrgPanelContentItem";

export function OrgPanelContent() {
  return (
    <Stack divider={<StackDivider />} spacing="4">
      <OrgPanelContentItem />
    </Stack>
  );
}
