import { Container } from "@chakra-ui/react";
import NavBar from "../../../components/NavBar/NavBar";
import SignInForm from "./SignInForm";

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
      <SignInForm />
    </Container>
  );
}
