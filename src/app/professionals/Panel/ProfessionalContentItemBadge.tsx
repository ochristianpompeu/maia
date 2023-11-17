import { Badge, WrapItem } from "@chakra-ui/react";
interface ProfessionalContentItemBadgeProps {
  name: string;
}
export function ProfessionalContentItemBadge({
  name,
}: ProfessionalContentItemBadgeProps) {
  return (
    <WrapItem>
      <Badge
        px={2}
        py={1}
        // bg={useColorModeValue("gray.50", "gray.800")}
        fontWeight={"400"}
        colorScheme="purple"
      >
        {name}
      </Badge>
    </WrapItem>
  );
}
