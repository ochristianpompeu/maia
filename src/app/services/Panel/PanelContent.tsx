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
import { PanelContentItem } from "./PanelContentItem";
interface PanelContentProps {
  handleDisplayDetail: (display: string) => void;
}

export function PanelContent({ handleDisplayDetail }: PanelContentProps) {
  return (
    <TableContainer borderRadius="md" overflowY="auto">
      <Table size="sm" overflowY="auto">
        <TableCaption>
          Serviços relacionados às Empresas do usuário
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th display={{ base: "none", md: "inline-flex" }}>Empresa</Th>
            <Th textAlign="right">{""}</Th>
          </Tr>
        </Thead>
        <Tbody>
          <PanelContentItem handleDisplayDetail={handleDisplayDetail} />
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Nome</Th>
            <Th display={{ base: "none", md: "inline-flex" }}>Empresa</Th>
            <Th textAlign="right">{""}</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
