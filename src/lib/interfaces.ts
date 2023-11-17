export interface UserProps {
  _id?: string;
  email?: string;
  name?: string;
  user?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: 0;
}
export interface OrgProps {
  _id?: string | undefined;
  name?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: Number;
  userAdmin?: string;
}

export interface OrgEditDrawerContentProps {
  name?: string;
  description?: string;
  id?: string;
  initialRef?: React.LegacyRef<HTMLInputElement> | undefined;
  onClose: () => void;
}

export interface OrgAddDrawerContentProps extends OrgEditDrawerContentProps {}

export interface ServiceProps {
  _id?: string;
  name?: string;
  description?: string;
  orgId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  org?: OrgProps;
  professionals?: ProfessionalProps[];
  initialRef?: React.LegacyRef<HTMLInputElement> | undefined;
  onClose?: () => void;
}

export interface ProfessionalProps {
  _id?: string;
  orgId?: string;
  org?: OrgProps;
  name?: string;
  bio?: string;
  email?: string;
  function?: string;
  image?: string;
  services?: string[];
  localServices?: ServiceProps[];
  completeServices?: ServiceProps[];
  createdAt?: Date;
  updatedAt?: Date;
  initialRef?: React.LegacyRef<HTMLInputElement> | undefined;
  onClose?: () => void;
}

export interface LocalServices extends ServiceProps {
  userAdmin: string;
  org: OrgProps;
}
export interface LocalProfessionals extends ProfessionalProps {
  org: OrgProps;
  localServices: ServiceProps[];
}
