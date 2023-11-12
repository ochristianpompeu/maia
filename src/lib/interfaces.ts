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
  onClose?: () => void;
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
  initialRef?: React.LegacyRef<HTMLInputElement> | undefined;
  onClose?: () => void;
}
