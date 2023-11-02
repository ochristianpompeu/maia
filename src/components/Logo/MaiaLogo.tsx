import { Button, Image, ImageProps, Link } from "@chakra-ui/react";
import NextLink from "next/link";

interface MaiaLogoProps extends ImageProps {}

export default function MaiaLogo({ ...props }: MaiaLogoProps) {
  return (
    <Link href="/" as={NextLink}>
      <Button
        variant="ghost"
        p={0}
        m={props.mb}
      >
        <Image
          p={0}
          m={0}
          src="https://firebasestorage.googleapis.com/v0/b/maia-1286a.appspot.com/o/logos%2Flogo.ico?alt=media&token=4599adb0-2fb5-40d9-8ea5-7d4d5e4c4d11&_gl=1*yn8194*_ga*MTc3MTAyMTk3OC4xNjkzODQ2MTg0*_ga_CW55HF8NVT*MTY5ODk0MzAzOS4yLjEuMTY5ODk0MzQwNy42MC4wLjA."
          // src="https://firebasestorage.googleapis.com/v0/b/maia-1286a.appspot.com/o/logos%2Fmustache_eyglasses.png?alt=media&token=947a4ef2-a5f6-41f2-bfb1-8881f8d2435f"
          // src="https://firebasestorage.googleapis.com/v0/b/maia-1286a.appspot.com/o/logos%2Fmustache_eyglasses_white_2.png?alt=media&token=bb1603bc-25d4-4c7b-9193-1ecfb9a6c75e"
          alt="Maia Logo"
          boxSize={props.boxSize}
          fallbackSrc="https://via.placeholder.com/100"
          fit="cover"
          rounded={props.rounded}
          objectFit="fill"
        />
      </Button>
    </Link>
  );
}
