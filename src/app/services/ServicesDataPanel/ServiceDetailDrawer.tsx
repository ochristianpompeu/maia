"use client";
import { ServiceProps } from "@/lib/interfaces";
import {
  Box,
  Card,
  CardBody,
  CardProps,
  DrawerBody,
  DrawerCloseButton,
  DrawerHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { Fragment } from "react";

interface ServiceDataPanelProps extends CardProps {
  service?: ServiceProps;
  onClose?: () => void;
}

export function DetailDrawerContent({
  service,
  ...rest
}: ServiceDataPanelProps) {
  return (
    <Fragment>
      <DrawerCloseButton />
      <DrawerHeader textColor="purple.500" borderBottomWidth="1px">
        Dados do Serviço
      </DrawerHeader>

      <DrawerBody>
        <Card
          // bgGradient="linear(to-b, gray.100,gray.50)"
          overflowY="auto"
          w="full"
          {...rest}
        >
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
      </DrawerBody>
    </Fragment>
  );
}
