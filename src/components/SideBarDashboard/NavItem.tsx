import {
  Box,
  Flex,
  FlexProps,
  Icon,
  useColorModeValue,
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
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const activePathColor = useColorModeValue("purple.100", "purple.600");
  const hoverColor = useColorModeValue("purple.200", "purple.700");
  return (
    <Box
      as="a"
      href={href}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        px="2"
        py="1"
        mx="4"
        borderRadius="md"
        role="group"
        cursor="pointer"
        bgColor={href === pathName ? activePathColor : bgColor}
        _hover={{
          bg: hoverColor,
        }}
        {...rest}
        fontWeight={href === pathName ? "bold" : "normal"}
        my="1"
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={
              {
                // color: "white",
              }
            }
            fontWeight={href === pathName ? "bold" : "normal"}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
}
