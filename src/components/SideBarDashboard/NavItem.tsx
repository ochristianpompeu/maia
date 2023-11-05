import {
  Box,
  Flex,
  FlexProps,
  Icon,
  useColorModeValue
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";

interface NavItemProps extends FlexProps {
  href?: string;
  icon: IconType | undefined;
  children: React.ReactNode;
}
export default function NavItem({
  href = "#",
  icon,
  children,
  ...rest
}: NavItemProps) {
  const pathName = usePathname();
  const bgColor = useColorModeValue("white", "gray.800");
  const activePathColor = useColorModeValue("purple.100", "purple.600");
  return (
    <Box
      as="a"
      href={href}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bgColor={href === pathName ? activePathColor : bgColor}
        _hover={{
          bg: "orange.400",
          color: "white",
        }}
        {...rest}
        fontWeight={href === pathName ? "bold" : "normal"}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            fontWeight={href === pathName ? "bold" : "normal"}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
}
