/* eslint-disable react-hooks/exhaustive-deps */
import { useUser } from "@/app/hooks/useUser";
import { applicationConfig } from "@/lib/config";
import { query } from "@/lib/genericFunctions";
import { OrgProps, UserProps } from "@/lib/interfaces";
import { Box, Divider, HStack, Heading, Text } from "@chakra-ui/react";
import { use } from "react";
import { EditAndDeleteButtons } from "./EditAndDeleteButtons";

export function OrgPanelContentItem({ _id, email, name }: UserProps) {
  // const user = useContext(UserContext);
  const user = useUser();
  // const { data: session, status, update } = useSession();
  // const [user, setUser] = useState<UserProps>({});

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     try {
  //       const localUser = use(
  //         query("user", () =>
  //           fetch(
  //             applicationConfig.baseUrl + "/api/user/" + session?.user?.email,
  //             {
  //               method: "GET",
  //               headers: {
  //                 "Content-Type": "application/json",
  //               },
  //             }
  //           ).then((res) => res.json())
  //         )
  //       );
  //       console.log("Local user: ", localUser);
  //       setUser(localUser);
  //       console.log("User: ", user);
  //     } catch (error) {
  //       console.log("erro no fetch de dados: ", error);
  //     }
  //   }
  // }, [status]);
  // const orgs: any = [];
  const { orgs } = use(
    query("orgs", () =>
      fetch(
        `${applicationConfig.baseUrl}/api/organization/byUser/6543f7feb31c7cbd35d04ab4`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json())
    )
  );

  return (
    <>
      {orgs?.map((org: OrgProps) => (
        <Box pt="2" key={org._id}>
          <HStack justifyContent="space-between">
            <Heading size="xs" textTransform="uppercase">
              {org.name}
            </Heading>
            <EditAndDeleteButtons org={org} />
          </HStack>
          <Text pt="2" fontSize="sm">
            {org.description}
          </Text>
          <Divider pb="4" />
        </Box>
      ))}
      {JSON.stringify(user)}
    </>
  );
}
