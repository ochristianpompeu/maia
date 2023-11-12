import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";
import { ServicesPanelContentItem } from "./ServicesPanelContentItem";
// import { OrgPanelContentItem } from "./ServicesPanelContentItem";
interface ServicesPanelContentProps {
  handleDisplayDetail: (display: string) => void;
}

export function ServicesPanelContent({
  handleDisplayDetail,
}: ServicesPanelContentProps) {
  const [displayDetail, setDisplayDetail] = useState("block");

  return (
    <TableContainer>
      <Table>
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>Empresa</Th>
            <Th>Nome</Th>
            <Th textAlign="right">{""}</Th>
          </Tr>
        </Thead>
        <Tbody>
          <ServicesPanelContentItem handleDisplayDetail={handleDisplayDetail} />
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Empresa</Th>
            <Th>Nome</Th>
            <Th textAlign="right">{""}</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
