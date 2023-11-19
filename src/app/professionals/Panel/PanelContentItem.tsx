"use client";
import { ProfessionalProps } from "@/lib/interfaces";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
  Wrap,
  WrapItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { DeleteDrawer } from "./DeleteDrawer";
import { EditDrawer } from "./EditDrawer";
import { ProfessionalContentItemBadge } from "./ProfessionalContentItemBadge";

interface PanelContentItemProps {
  professional: ProfessionalProps;
}
export function PanelContentItem({ professional }: PanelContentItemProps) {
  return (
    <WrapItem mx={{ base: "auto", md: "0" }}>
      <Box
        maxW={"320px"}
        minW={"320px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"lg"}
        rounded={"md"}
        overflow={"hidden"}
        borderColor="purple.400"
        border="1px"
      >
        <Image
          h={"120px"}
          w={"full"}
          src={"https://imageipsum.com/634x951"}
          objectFit="cover"
          alt="background image of professional card"
        />
        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={"xl"}
            src={professional?.image || "https://i.pravatar.cc/300"}
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>
        <Box p={6} textAlign="center" w="full">
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            {professional?.name}
          </Heading>
          <VStack spacing={0} m={0} p={0}>
            <Text fontWeight="600" color={"gray.500"} m={0}>
              {professional.email}
            </Text>
            <Text fontWeight="400" color={"gray.500"} mb={4}>
              {professional.org?.name}
            </Text>
          </VStack>

          <Text
            textAlign={"center"}
            color={useColorModeValue("gray.700", "gray.400")}
            px={3}
          >
            {professional.bio?.substring(0, 80)}...
          </Text>

          <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
            <Wrap>
              {professional.completeServices?.map((service) => (
                <ProfessionalContentItemBadge
                  key={service._id}
                  name={service.name as string}
                />
              ))}
            </Wrap>
          </Stack>
          <Stack
            mt={4}
            direction={"row"}
            spacing={4}
            w="full"
            justifyContent="center"
          >
            <ButtonGroup
              w="full"
              variant="outline"
              isAttached
              colorScheme="purple"
            >
              <EditDrawer {...professional} />
              <Button disabled w="full">
                Visualizar
              </Button>
              <DeleteDrawer {...professional} />
            </ButtonGroup>
          </Stack>
        </Box>
      </Box>
    </WrapItem>
  );
}
