import { Container } from "@chakra-ui/react";
import LoginForm from "./LoginForm";
import NavBar from "../NavBar/NavBar";

export default function Login() {
  return (
    <Container
      maxW="full"
      p={0}
      h={{
        base: "auto",
        md: "100vh",
      }}
    >
      <NavBar />
      <LoginForm />
    </Container>
  );
}
