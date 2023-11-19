import { OrgProps } from "@/lib/interfaces";
import {
  ButtonGroup
} from "@chakra-ui/react";
import { DeleteDrawer } from "./DeleteDrawer";
import { EditDrawer } from "./EditDrawer";

interface EditAndDeleteButtonsProps {
  org: OrgProps;
}

export function EditAndDeleteButtons(props: EditAndDeleteButtonsProps) {
  return (
    <>
      <ButtonGroup variant="outline" isAttached size={["sm", "xs"]}>
        <EditDrawer
          name={props.org.name}
          description={props.org.description}
          id={props.org._id as string}
        />
        <DeleteDrawer
          name={props.org.name}
          description={props.org.description}
          id={props.org._id as string}
        />
      </ButtonGroup>
    </>
  );
}
