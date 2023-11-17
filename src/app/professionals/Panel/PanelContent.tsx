import { useProfessionals } from "@/app/hooks/useProfessionals";
import { ProfessionalProps } from "@/lib/interfaces";
import { Skeleton, SkeletonCircle, SkeletonText, Wrap } from "@chakra-ui/react";
import { PanelContentItem } from "./PanelContentItem";

export function PanelContent() {
  const { professionals } = useProfessionals();

  if (professionals) {
    return (
      <Wrap spacing="4" w="full">
        {professionals.map((professional: ProfessionalProps) => (
          <PanelContentItem
            key={professional._id}
            professional={professional}
          />
        ))}
      </Wrap>
    );
  } else {
    return (
      <Wrap>
        <SkeletonCircle />
        <Skeleton />
        <SkeletonText />
      </Wrap>
    );
  }
}
