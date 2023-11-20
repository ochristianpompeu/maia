"use client";
import SidebarDashboard from "@/components/SideBarDashboard/SidebarDashboard";
import { Routes } from "@/lib/Links";
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
import { useRouter } from "next/navigation";
import { poppins } from "../fonts";

export default function Panel() {
  const bgBoxColor = useColorModeValue("gray.100", "gray.800");
  const router = useRouter();
  function handleClick(link: string) {
    router.push(link);
  }
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
              direction={{ base: "column" }}
              padding={2}
              borderRadius="lg"
              bgColor={bgBoxColor}
              w="full"
              maxW="full"
              height={{ base: "auto", md: applicationConfig.staticHeightPanel }}
              overflowY="auto"
            >
              <Heading
                textColor={useColorModeValue("gray.200", "white")}
                p="2"
                borderRadius="md"
                size="md"
                className={poppins.className}
              >
                Acesse seus cadastros, aqui ou no menu lateral
              </Heading>
              
              <Card
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
                size="sm"
              >
                <Image
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "180px" }}
                  maxH={{ base: "100%", sm: "180px" }}
                  src="https://firebasestorage.googleapis.com/v0/b/maia-1286a.appspot.com/o/images%2F_a1968a4e-c007-4631-9478-6061edcf2982.jfif?alt=media&token=963f6281-fae2-4860-99a2-a932c6bdd120"
                  alt="Link Dashboard image"
                />

                <Stack>
                  <CardBody>
                    <Heading size="md">{Routes.orgs.text}</Heading>
                    <Text pt="2">Acesse os dados da sua Empresa</Text>
                  </CardBody>

                  <CardFooter>
                    <Button
                      variant="outline"
                      colorScheme="purple"
                      onClick={(e) => handleClick(Routes.orgs.link)}
                    >
                      Acesse
                    </Button>
                  </CardFooter>
                </Stack>
              </Card>

              <Card
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
                size="sm"
              >
                <Image
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "180px" }}
                  maxH={{ base: "100%", sm: "180px" }}
                  src="https://firebasestorage.googleapis.com/v0/b/maia-1286a.appspot.com/o/images%2F_c8f49651-550c-41a0-bd44-2fe5819b496f.jfif?alt=media&token=d1527a6f-5bd8-4b80-85d7-764406cf0bfb"
                  alt="Link Dashboard image"
                />

                <Stack>
                  <CardBody>
                    <Heading size="md">{Routes.servicos.text}</Heading>

                    <Text py="2">Acesse os dados dos serviços cadastrados</Text>
                  </CardBody>

                  <CardFooter>
                    <Button
                      variant="outline"
                      colorScheme="purple"
                      onClick={(e) => handleClick(Routes.servicos.link)}
                    >
                      Acesse
                    </Button>
                  </CardFooter>
                </Stack>
              </Card>
              <Card
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
                size="sm"
              >
                <Image
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "180px" }}
                  maxH={{ base: "100%", sm: "180px" }}
                  src="https://firebasestorage.googleapis.com/v0/b/maia-1286a.appspot.com/o/images%2F_ed57fdad-b2e2-4982-9ab4-296500753c24.jfif?alt=media&token=5c01d55b-367c-4ba1-b283-76f4ec795069"
                  alt="Link Dashboard image"
                />

                <Stack>
                  <CardBody>
                    <Heading size="md">{Routes.professionals.text}</Heading>

                    <Text py="2">
                      Acesse os dados dos profissionais cadastrados
                    </Text>
                  </CardBody>

                  <CardFooter>
                    <Button
                      variant="outline"
                      colorScheme="purple"
                      onClick={(e) => handleClick(Routes.professionals.link)}
                    >
                      Acesse
                    </Button>
                  </CardFooter>
                </Stack>
              </Card>

              <Card
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
                size="sm"
              >
                <Image
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "180px" }}
                  maxH={{ base: "100%", sm: "180px" }}
                  src="https://firebasestorage.googleapis.com/v0/b/maia-1286a.appspot.com/o/images%2F_f7c207af-8f0a-4497-a3ef-928577b9b6cd.jfif?alt=media&token=bd0da6aa-2423-49f8-803c-b4e9f0fddd31"
                  alt="Link Dashboard image"
                />

                <Stack>
                  <CardBody>
                    <Heading size="md">{Routes.hours.text}</Heading>

                    <Text py="2">Acesse os dados dos horários cadastrados</Text>
                  </CardBody>

                  <CardFooter>
                    <Button
                      variant="outline"
                      colorScheme="purple"
                      onClick={(e) => handleClick(Routes.hours.link)}
                    >
                      Acesse
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
