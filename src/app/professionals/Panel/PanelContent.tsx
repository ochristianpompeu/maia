import { Wrap } from "@chakra-ui/react";
import { useState } from "react";
import { PanelContentItem } from "./PanelContentItem";
// import { OrgPanelContentItem } from "./ServicesPanelContentItem";
interface PanelContentProps {
  handleDisplayDetail: (display: string) => void;
}

export function PanelContent({ handleDisplayDetail }: PanelContentProps) {
  const [displayDetail, setDisplayDetail] = useState("block");

  return (
    <Wrap spacing="4">
      <PanelContentItem handleDisplayDetail={handleDisplayDetail} />
      <PanelContentItem handleDisplayDetail={handleDisplayDetail} />
      <PanelContentItem handleDisplayDetail={handleDisplayDetail} />
      <PanelContentItem handleDisplayDetail={handleDisplayDetail} />
    </Wrap>
  );
}
