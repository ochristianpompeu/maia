import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { OrgTableItem } from "./OrgTableItem";

export function OrgTable() {
  const bgColor = useColorModeValue("white", "gray.800");
  const tableBorderColoor = useColorModeValue("gray.100", "black");

  return (
    <TableContainer
      p={0}
      m={0}
      bgColor={bgColor}
      borderRadius="lg"
      border="1px"
      borderColor="purple.200"
    >
      <Table
        variant="simple"
        overflowY="scroll"
        maxW="full"
        colorScheme="purple"
      >
        <TableCaption>Empresa</TableCaption>
        <Thead>
          <Tr>
            <Th p={{ base: "2" }}>Nome</Th>
            <Th p={{ base: "2" }}>{""}</Th>
          </Tr>
        </Thead>
        <Tbody>
          <OrgTableItem />
        </Tbody>
        <Tfoot>
          <Tr>
            <Th p={{ base: "2" }}>Nome</Th>
            <Th p={{ base: "2" }}>{""}</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
