import { UserProps } from "@/lib/interfaces";
import { createContext } from "react";

const localUser: UserProps = {
  _id: "",
  email: "",
  name: "",
  user: "",
};

export const UserContext = createContext<UserProps>(localUser);
