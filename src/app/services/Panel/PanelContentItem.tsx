import { useServices } from "@/app/hooks/useServices";
import { ServiceProps } from "@/lib/interfaces";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Td,
  Tr,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Fragment } from "react";
import { DetailDrawerContent } from "../DataPanel/DetailDrawer";
import { EditAndDeleteButtons } from "./EditAndDeleteButtons";

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
    <Fragment>
      {services?.map((service: ServiceProps) => (
        <Tr
          key={service._id}
          _hover={{
            bg: "purple.100",
          }}
          borderRadius="sm"
          p={0}
          m={0}
        > 
          <Td
            _hover={{
              cursor: "pointer",
            }}
            onClick={() => handdleLineClick("block", service)}
          >
            {service.name}
          </Td>
          <Td
            _hover={{
              cursor: "pointer",
            }}
            onClick={() => handdleLineClick("block", service)}
          >
            {service.org?.name}
          </Td>
          <Td textAlign="right">
            <EditAndDeleteButtons service={service} />
          </Td>
        </Tr>
      ))}
      <Drawer
        size={{ base: "xl", md: "md" }}
        isOpen={isOpenView}
        onClose={onCloseView}
        placement="bottom"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DetailDrawerContent onClose={handleOnClose} />
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}
