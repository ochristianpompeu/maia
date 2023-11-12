import { ServiceProps } from "@/lib/interfaces";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  CardProps,
  CloseButton,
  HStack,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";

interface ServicesDataPanelProps extends CardProps {
  handleDisplayDetail: (display: string) => void;
  service?: ServiceProps;
}
export function ServicesDataPanel({
  bgGradient,
  overflowY,
  w,
  handleDisplayDetail,
  service,
  ...rest
}: ServicesDataPanelProps) {
  function handleClick() {
    handleDisplayDetail("none");
  }
  return (
    <Card
      // bgGradient="linear(to-b, gray.100,gray.50)"
      overflowY="auto"
      w="full"
      {...rest}
    >
      <CardHeader>
        <HStack justifyContent="space-between">
          <Heading size="md">Dados do Serviço</Heading>
          <CloseButton color="purple" onClick={handleClick} />
        </HStack>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              {service?.name}
            </Heading>
            <Text pt="2" fontSize="sm">
              {service?.org?.name}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Descrição
            </Heading>
            <Text pt="2" fontSize="sm">
              {service?.description}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}
