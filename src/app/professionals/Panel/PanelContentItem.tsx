"use client";
import { useServices } from "@/app/hooks/useServices";
import { ServiceProps } from "@/lib/interfaces";
import {
  Avatar,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
  WrapItem,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { TbEdit, TbTrash } from "react-icons/tb";

interface PanelContentItemProps {
  handleDisplayDetail: (display: string, service: ServiceProps) => void;
}

export function PanelContentItem({
  handleDisplayDetail,
}: PanelContentItemProps) {
  const { services } = useServices();
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
    <WrapItem>
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
          src={
            "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          }
          objectFit="cover"
          alt="#"
        />
        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={"xl"}
            src={"https://i.pravatar.cc/300"}
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>
        <Box p={6} textAlign="center" w="full">
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            Lindsey James
          </Heading>
          <Text fontWeight={600} color={"gray.500"} mb={4}>
            @lindsey_jam3s
          </Text>
          <Text
            textAlign={"center"}
            color={useColorModeValue("gray.700", "gray.400")}
            px={3}
          >
            Actress, musician, songwriter and artist. PM for work inquires...
          </Text>

          <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
            <Badge
              px={2}
              py={1}
              // bg={useColorModeValue("gray.50", "gray.800")}
              fontWeight={"400"}
              colorScheme="purple"
            >
              #art
            </Badge>
            <Badge
              px={2}
              py={1}
              // bg={useColorModeValue("gray.50", "gray.800")}
              fontWeight={"400"}
              colorScheme="purple"
            >
              #photography
            </Badge>
            <Badge
              px={2}
              py={1}
              // bg={useColorModeValue("gray.50", "gray.800")}
              fontWeight={"400"}
              colorScheme="purple"
            >
              #music
            </Badge>
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
              <IconButton
                icon={<TbEdit />}
                aria-label="Edit Professional"
                colorScheme="teal"
              />
              <Button w="full">Visualizar</Button>
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
