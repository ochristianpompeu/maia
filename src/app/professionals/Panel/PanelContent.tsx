import { useProfessionals } from "@/app/hooks/useProfessionals";
import { Skeleton, SkeletonCircle, SkeletonText, Wrap } from "@chakra-ui/react";
import { useState } from "react";
import { PanelContentItem } from "./PanelContentItem";
// import { OrgPanelContentItem } from "./ServicesPanelContentItem";
interface PanelContentProps {
  handleDisplayDetail: (display: string) => void;
}

export function PanelContent({ handleDisplayDetail }: PanelContentProps) {
  const [displayDetail, setDisplayDetail] = useState("block");
  const { professionals } = useProfessionals();

  if (professionals) {
    return (
      <Wrap spacing="4">
        {professionals.map((professional) => (
          <PanelContentItem
            key={professional._id}
            handleDisplayDetail={handleDisplayDetail}
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
