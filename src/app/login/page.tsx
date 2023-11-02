import Footer from "@/components/Footer/Footer";
import { Routes } from "@/lib/Links";
import { authOptions } from "@/lib/auth";
import { Container, Flex } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import NavBar from "../../components/NavBar/NavBar";
import NewLoginForm from "./NewLoginForm";
export default async function Login() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect(Routes.dashboard.link);
  }

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
