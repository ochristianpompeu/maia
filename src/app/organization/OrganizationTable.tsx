import {
  ButtonGroup,
  Hide,
  IconButton,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { TbEdit, TbTrash } from "react-icons/tb";

export function OrganizationTable() {
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
        // w="full"
        overflowY="scroll"
        // width="xs"
        maxW="full"
        colorScheme="purple"
      >
        <TableCaption>Empresa</TableCaption>
        <Thead>
          <Tr>
            <Th p={{ base: "2" }}>To convert</Th>
            <Hide below="md">
              <Th>into</Th>
            </Hide>
            <Hide below="md">
              <Th isNumeric>multiply by</Th>
            </Hide>
            <Th p={{ base: "2" }}>{""}</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td w="full" p={{ base: "2" }}>inches</Td>
            <Hide below="md">
              <Td>millimetres (mm)</Td>
            </Hide>
            <Hide below="md">
              <Td isNumeric>25.4</Td>
            </Hide>
            <Td w="full" alignItems="end" p={{ base: "2" }}>
              <ButtonGroup>
                <IconButton
                  size="sm"
                  variant="outline"
                  colorScheme="purple"
                  aria-label="Edit"
                  icon={<TbEdit />}
                />
                <IconButton
                  size="sm"
                  variant="outline"
                  colorScheme="orange"
                  aria-label="Delete"
                  icon={<TbTrash />}
                />
              </ButtonGroup>
            </Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Th p={{ base: "2" }}>To convert</Th>
            <Hide below="md">
              <Th>into</Th>
            </Hide>
            <Hide below="md">
              <Th isNumeric>multiply by</Th>
            </Hide>
            <Th p={{ base: "2" }}>{""}</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
