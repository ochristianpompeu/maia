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
}

export interface OrgAddDrawerContentProps extends OrgEditDrawerContentProps {}
