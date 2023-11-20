import { IntervalProps, ProfessionalProps } from "@/lib/interfaces";
import {
  Avatar,
  HStack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

interface IntervalItemProps {
  interval?: IntervalProps;
  serviceName?: string;
  professional?: ProfessionalProps;
}

export function Interval({
  interval,
  serviceName,
  professional,
}: IntervalItemProps) {
  const formatedStart = new Date(interval?.start as Date);
  const formatedEnd = new Date(interval?.end as Date);

  return (
    <VStack
      w="full"
      bgColor={useColorModeValue("gray.100", "gray.900")}
      borderRadius="md"
      p="2"
    >
      <HStack w="full" justifyContent="space-between">
        <HStack>
          <Text fontWeight="600" color={"gray.500"}>
            Início:
          </Text>
          <Text fontWeight="800" color={"gray.500"}>
            {formatedStart.toLocaleTimeString("pt-BR", {
              timeZone: "UTC",
            })}
          </Text>
        </HStack>
        <HStack>
          <Text fontWeight="600" color={"gray.500"}>
            Fim:
          </Text>

          <Text fontWeight="800" color={"gray.500"}>
            {formatedEnd.toLocaleTimeString("pt-BR", {
              timeZone: "UTC",
            })}
          </Text>
        </HStack>
      </HStack>

      <Text
        textAlign="left"
        w="full"
        color={useColorModeValue("gray.700", "gray.400")}
        borderRadius="md"
        bgColor={useColorModeValue("purple.200", "purple.600")}
        fontWeight="semibold"
        textColor={useColorModeValue("gray.600", "white")}
        p="2"
      >
        {serviceName}
      </Text>
      <HStack
        spacing="0"
        w="full"
        justifyContent="space-between"
        alignItems="center"
      >
        <Avatar
          size="sm"
          src={professional?.image || "https://i.pravatar.cc/300"}
          css={{
            border: "2px solid white",
          }}
        />
        <Text
          textAlign="left"
          color={useColorModeValue("gray.700", "gray.400")}
          fontWeight="bold"
          borderRadius="md"
          w="full"
          p="2"
        >
          {professional?.name}
        </Text>
      </HStack>
      <HStack justifyContent="flex-start" w="full">
        <Text fontWeight="600" color={"gray.500"}>
          Status
        </Text>
        <Text
          fontWeight="600"
          bgColor="green.400"
          textColor="white"
          px="1"
          borderRadius="md"
        >
          {interval?.status}
        </Text>
      </HStack>
    </VStack>
  );
}
