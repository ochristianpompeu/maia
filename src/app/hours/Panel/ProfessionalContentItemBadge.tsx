import { Badge, WrapItem } from "@chakra-ui/react";
interface ProfessionalContentItemBadgeProps {
  name: string;
}
export function ProfessionalContentItemBadge({
  name,
}: ProfessionalContentItemBadgeProps) {
  return (
    <WrapItem mx="auto">
      <Badge
        px={2}
        py={1}
        fontWeight={"400"}
        colorScheme="purple"
      >
        #{name}
      </Badge>
    </WrapItem>
  );
}
