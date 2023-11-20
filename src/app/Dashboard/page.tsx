import SidebarDashboard from "@/components/SideBarDashboard/SidebarDashboard";
import { applicationConfig } from "@/lib/config";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { poppins } from "../fonts";

export default function Panel() {
  const bgBoxColor = useColorModeValue("gray.100", "gray.800");
  return (
    <Container margin={0} p={0} maxW="full" className={poppins.className}>
      <SidebarDashboard>
        <Stack
          p={[0, 2]}
          direction={{ base: "column", md: "row" }}
          spacing={[2, 8]}
          w="full"
        >
          <Flex flex={1} w="full" alignItems={["center", "flex-start"]}>
            <Stack
              direction={{ base: "column", md: "row" }}
              padding={2}
              borderRadius="lg"
              bgColor={bgBoxColor}
              w="full"
              maxW="full"
              height={{ base: "auto", md: applicationConfig.staticHeightPanel }}
            >
              <Card
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="elevated"
              >
                <Image
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "200px" }}
                  src="https://imageipsum.com/600x400"
                  alt="Link Dashboard image"
                />

                <Stack>
                  <CardBody>
                    <Heading size="md">Empresa</Heading>

                    <Text py="2">
                      Acesse os dados da sua Empresa
                    </Text>
                  </CardBody>

                  <CardFooter>
                    <Button variant="solid" colorScheme="blue">
                      Buy Latte
                    </Button>
                  </CardFooter>
                </Stack>
              </Card>
            </Stack>
          </Flex>
        </Stack>
      </SidebarDashboard>
    </Container>
  );
}
