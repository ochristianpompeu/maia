import { applicationConfig } from "@/lib/config";
import { OrgProps } from "@/lib/interfaces";
import { ButtonGroup, IconButton, Td, Tr } from "@chakra-ui/react";
import { TbEdit, TbTrash } from "react-icons/tb";

async function getOrgs() {
  try {
    const res = await fetch(applicationConfig.baseUrl + "/api/organization", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch organization api.");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading orgs: ", error);
  }
}

export async function OrgTableItem() {
  const { orgs } = await getOrgs();
  return (
    <>
      {orgs.map((org: OrgProps) => (
        <Tr key={org._id}>
          <Td w="full" p={{ base: "2" }}>
            {org.name}
          </Td>
          <Td w="full" alignItems="end" p={{ base: "2" }}>
            <ButtonGroup>
              <IconButton
                size="sm"
                variant="outline"
                colorScheme="purple"
                aria-label="Edit"
                icon={<TbEdit />}
              />
              <IconButton
                size="sm"
                variant="outline"
                colorScheme="orange"
                aria-label="Delete"
                icon={<TbTrash />}
              />
            </ButtonGroup>
          </Td>
        </Tr>
      ))}
    </>
  );
}
