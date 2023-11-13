import { applicationConfig } from "@/lib/config";
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
import { Fragment, use } from "react";
import { DetailDrawerContent } from "../ServicesDataPanel/ServiceDetailDrawer";
import { EditAndDeleteButtons } from "./EditAndDeleteButtons";
const fetchMap = new Map<string, Promise<any>>();

function queryClient(name: string, query: () => Promise<any>) {
  if (!fetchMap.has(name)) {
    fetchMap.set(name, query());
  }

  return fetchMap.get(name)!;
}

interface ServicesPanelContentItemProps {
  handleDisplayDetail: (display: string, service: ServiceProps) => void;
}

export function ServicesPanelContentItem({
  handleDisplayDetail,
}: ServicesPanelContentItemProps) {
  const { localServices } = use(
    queryClient("services", () =>
      fetch(applicationConfig.baseUrl + "/api/service", {
        method: "GET",
        cache: "no-store",
      }).then((res) => res.json())
    )
  );

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
      {localServices?.map((service: ServiceProps) => (
        <Tr
          key={service._id}
          _hover={{
            bg: "purple.100",
          }}
          borderRadius="sm"
        >
          <Td
            _hover={{
              cursor: "pointer",
            }}
            onClick={() => handdleLineClick("block", service)}
          >
            {service.org?.name}
          </Td>
          <Td
            _hover={{
              cursor: "pointer",
            }}
            onClick={() => handdleLineClick("block", service)}
          >
            {service.name}
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
