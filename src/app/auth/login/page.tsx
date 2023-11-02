import Footer from "@/components/Footer/Footer";
import { Container, Flex } from "@chakra-ui/react";
import NavBar from "../../../components/NavBar/NavBar";
import NewLoginForm from "./NewLoginForm";

export default function Login() {
  return (
    <Container
      maxW={"full"}
      p={0}
      h={{
        base: "auto",
        md: "100vh",
      }}
    >
      <Flex
        direction="column"
        w={"full"}
        h={"full"}
        justifyContent="space-between"
      >
        <NavBar />
        <Flex
          h={{
            base: "auto",
            md: "100vh",
          }}
          // py={[0, 10, 20]}
          direction={{
            base: "column-reverse",
            md: "row",
          }}
        >
          <NewLoginForm />
        </Flex>
        <Footer />
      </Flex>
    </Container>
  );
}
