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
import { PanelContentItem } from "./PanelContentItem";
// import { OrgPanelContentItem } from "./ServicesPanelContentItem";
interface PanelContentProps {
  handleDisplayDetail: (display: string) => void;
}

export function PanelContent({ handleDisplayDetail }: PanelContentProps) {
  const [displayDetail, setDisplayDetail] = useState("block");

  return (
    <TableContainer borderRadius="md" overflowY="auto">
      <Table size="sm" overflowY="auto">
        <TableCaption>
          Serviços relacionados às Empresas do usuário
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Empresa</Th>
            <Th>Nome</Th>
            <Th textAlign="right">{""}</Th>
          </Tr>
        </Thead>
        <Tbody>
          <PanelContentItem handleDisplayDetail={handleDisplayDetail} />
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
