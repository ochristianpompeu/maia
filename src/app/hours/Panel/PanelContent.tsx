import { useHours } from "@/app/hooks/useHours";
import { HourProps } from "@/lib/interfaces";
import { HStack, Skeleton, Wrap } from "@chakra-ui/react";
import { PanelContentItem } from "./PanelContentItem";

interface PanelContentProps {
  orgId?: string;
}
export function PanelContent({ orgId }: PanelContentProps) {
  const { hours } = useHours();

  if (hours) {
    return (
      <HStack overflowX="auto" spacing="0" alignItems="start">
        {hours
          ?.filter((hour) => hour?.orgId === orgId)
          .map((hour: HourProps) => (
            <PanelContentItem key={hour?._id} hour={hour} />
          ))}
      </HStack>
    );
  } else {
    return (
      <Wrap>
        <Skeleton height="20" />
        <Skeleton height="20" />
        <Skeleton height="20" />
      </Wrap>
    );
  }
}
