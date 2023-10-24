import { Button, Image, Link } from "@chakra-ui/react";
import NextLink from "next/link";

export default function MaiaLogo() {
  return (
    <Link href="/" as={NextLink}>
      <Button colorScheme="gray" shadow="md" variant="ghost">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/maia-1286a.appspot.com/o/logos%2Fmustache_eyglasses.png?alt=media&token=947a4ef2-a5f6-41f2-bfb1-8881f8d2435f"
          // src="https://firebasestorage.googleapis.com/v0/b/maia-1286a.appspot.com/o/logos%2Fmustache_eyglasses_white_2.png?alt=media&token=bb1603bc-25d4-4c7b-9193-1ecfb9a6c75e"
          alt="Maia Logo"
          boxSize="8"
          fallbackSrc="https://via.placeholder.com/100"
          fit="cover"
        />
      </Button>
    </Link>
  );
}
