import {
  Box,
  Card,
  CardBody,
  CardHeader,
  CardProps,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";

interface OrgDataPanelProps extends CardProps {}
export function OrgDataPanel({
  bgGradient,
  overflowY,
  w,
  ...rest
}: OrgDataPanelProps) {
  return (
    <Card
      // bgGradient="linear(to-b, gray.100,gray.50)"
      overflowY="auto"
      w="full"
      {...rest}
    >
      <CardHeader>
        <Heading size="md">Client Report</Heading>
      </CardHeader>

      <CardBody>
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
      </CardBody>
    </Card>
  );
}
