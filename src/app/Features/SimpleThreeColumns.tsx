"use client";

import {
    Box,
    Flex,
    Icon,
    SimpleGrid,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import { BsPersonBadge } from "react-icons/bs";
import { Ri24HoursLine, RiServiceLine } from "react-icons/ri";
import { poppins } from "../fonts";

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack alignItems={{ base: "center", md: "start" }}>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={useColorModeValue("purple", "white")}
        rounded={"full"}
        bg={useColorModeValue("gray.200", "gray.700")}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={"gray.600"}>{text}</Text>
    </Stack>
  );
};

export default function SimpleThreeColumns() {
  return (
    <Box p={4} className={poppins.className}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          icon={<Icon as={BsPersonBadge} w={10} h={10} />}
          title={"Profissionais"}
          text={
            "Mantenha os dados dos seus profissionais e os serviços prestados disponíveis para agendamento..."
          }
        />
        <Feature
          icon={<Icon as={RiServiceLine} w={10} h={10} />}
          title={"Serviços"}
          text={
            "Crie um catálogo de serviços para que seus clientes possam saber o que podem agendar e com quem..."
          }
        />
        <Feature
          icon={<Icon as={Ri24HoursLine} w={10} h={10} />}
          title={"Horários"}
          text={
            "Disponibilize horários de acordo com a agenda de seus profissionais..."
          }
        />
      </SimpleGrid>
    </Box>
  );
}
