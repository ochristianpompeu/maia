"use client";
import { HourProps } from "@/lib/interfaces";
import {
  Box,
  ButtonGroup,
  HStack,
  Heading,
  Image,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { DeleteDrawer } from "./DeleteDrawer";
import { EditDrawer } from "./EditDrawer";
import { Interval } from "./Interval";

interface PanelContentItemProps {
  hour: HourProps;
}
export function PanelContentItem({ hour }: PanelContentItemProps) {
  const formatedDay = new Date(hour.day as Date);

  return (
    <Box
      maxW={"320px"}
      minW={"320px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"lg"}
      rounded={"md"}
      borderColor="purple.400"
      border="1px"
      overflowY="auto"
      maxH={{ base: "auto", md: "480" }}
      minH={{ base: "auto", md: "480" }}
    >
      <Image
        h={"80px"}
        w={"full"}
        src={"https://imageipsum.com/634x951"}
        objectFit="cover"
        alt="background image of professional card"
      />
      <Box p={2} textAlign="left" w="full">
        <HStack w="full" justifyContent="space-between" mb="2">
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            {formatedDay.toLocaleDateString("pt-BR", {
              timeZone: "UTC",
            })}
          </Heading>
          <ButtonGroup variant="outline" isAttached colorScheme="purple">
            <EditDrawer {...hour} />
            <DeleteDrawer {...hour} />
          </ButtonGroup>
        </HStack>

        <VStack
          w="full"
          spacing="2"
          overflowY="auto"
          _first={{
            marginTop: "2",
          }}
        >
          {hour?.interval?.map((interval) => (
            <Interval
              key={interval._id}
              interval={interval}
              serviceName={hour.service?.name}
              professional={hour.professional}
            />
          ))}
        </VStack>
      </Box>
    </Box>
  );
}
