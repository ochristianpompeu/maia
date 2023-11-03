import { Box, Flex, FlexProps, Icon } from "@chakra-ui/react";
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
        _hover={{
          bg: "orange.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
}
