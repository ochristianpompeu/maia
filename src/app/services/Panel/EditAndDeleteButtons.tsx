import { ServiceProps } from "@/lib/interfaces";
import { ButtonGroup } from "@chakra-ui/react";
import { Fragment } from "react";
import { DeleteDrawer } from "./DeleteDrawer";
import { EditDrawer } from "./EditDrawer";

interface EditAndDeleteButtonsProps {
  service: ServiceProps;
}

export function EditAndDeleteButtons(props: EditAndDeleteButtonsProps) {
  return (
    <Fragment>
      <ButtonGroup variant="outline" isAttached size={["sm", "xs"]}>
        <EditDrawer
          name={props.service.name}
          description={props.service.description}
          _id={props.service._id as string}
          org={props.service.org}
        />
        <DeleteDrawer
          name={props.service.name}
          description={props.service.description}
          _id={props.service._id as string}
          org={props.service.org}
        />
      </ButtonGroup>
    </Fragment>
  );
}
