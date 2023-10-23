import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";

export default function Details() {
  const colSpan = useBreakpointValue({
    base: 2,
    md: 1,
  });
  return (
    <VStack w={"full"} h={"full"} p={10} spacing={10} alignItems={"flex-start"}>
      <VStack spacing={3} alignItems={"flex-start"}>
        <Heading size={"2xl"}>Your Details</Heading>
        <Text>Texto par ser apresentado abaixo do cabeçalho da seção</Text>
      </VStack>
      <SimpleGrid columns={2} columnGap={3} rowGap={6} w={"full"}>
        <GridItem colSpan={colSpan}>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input placeholder="Primeiro nome" />
          </FormControl>
        </GridItem>
        <GridItem colSpan={colSpan}>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input placeholder="Último nome" />
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ base: 2 }}>
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input placeholder="Rua do bobos, 0" />
          </FormControl>
        </GridItem>
        <GridItem colSpan={colSpan}>
          <FormControl>
            <FormLabel>City</FormLabel>
            <Input placeholder="Caucaia" />
          </FormControl>
        </GridItem>
        <GridItem colSpan={colSpan}>
          <FormControl>
            <FormLabel>Country</FormLabel>
            <Select defaultValue={"nr"}>
              <option value={"br"}>Brasil</option>
              <option value={"nr"}>Noruega</option>
              <option value={"ue"}>União Européia</option>
              <option value={"dn"}>Dinamarca</option>
              <option value={"jp"}>Japão</option>
            </Select>
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ base: 2 }}>
          <Checkbox defaultChecked>Ship to billing address</Checkbox>
        </GridItem>
        <GridItem colSpan={{ base: 2 }}>
          <Button size={"lg"} w={"full"} colorScheme="purple">
            Place Order
          </Button>
        </GridItem>
      </SimpleGrid>
    </VStack>
  );
}
