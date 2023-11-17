"use client";
import { LocalProfessionals, ServiceProps } from "@/lib/interfaces";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
  VStack,
  WrapItem,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { TbTrash } from "react-icons/tb";
import { EditDrawerContent } from "./EditDrawerContent";
import { ProfessionalContentItemBadge } from "./ProfessionalContentItemBadge";

interface PanelContentItemProps {
  professional: LocalProfessionals;
  handleDisplayDetail: (display: string, service: ServiceProps) => void;
}

export function PanelContentItem({
  professional,
  handleDisplayDetail,
}: PanelContentItemProps) {
  const dimension = useBreakpointValue(
    {
      base: "base",
      md: "md",
    },
    { fallback: "md" }
  );

  const {
    isOpen: isOpenView,
    onOpen: onOpenView,
    onClose: onCloseView,
  } = useDisclosure();

  function handdleLineClick(display: string, service: ServiceProps) {
    if (dimension === "base") {
      console.log("dimension: ", dimension);
      onOpenView;
    } else {
      handleDisplayDetail(display, service);
    }
  }

  function handleOnOpen() {
    onOpenView;
  }

  function handleOnClose() {
    onCloseView;
  }

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
            src={professional?.image}
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
            {/* {professional.services?.map((service) => service.name)} */}
            {/* Actress, musician, songwriter and artist. PM for work inquires... */}
          </Text>

          <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
            {professional.localServices?.map((service) => (
              <ProfessionalContentItemBadge
                key={service._id}
                name={service.name as string}
              />
            ))}
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
              {/* <IconButton
                icon={<TbEdit />}
                aria-label="Edit Professional"
                colorScheme="teal"
              /> */}
              <EditDrawerContent {...professional} />
              <Button disabled={true} w="full">
                Visualizar
              </Button>
              <IconButton
                icon={<TbTrash />}
                aria-label="Delete Professional"
                colorScheme="red"
              />
            </ButtonGroup>
          </Stack>
        </Box>
      </Box>
    </WrapItem>
  );
}
