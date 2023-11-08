export interface OrgProps {
  _id: string | undefined;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  __v: Number;
  userAdmin: String;
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
  initialRef?: React.LegacyRef<HTMLInputElement> | undefined;
  onClose?: () => void;
}
