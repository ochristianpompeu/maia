import { IconType } from "react-icons";
import { BsPersonBadge } from "react-icons/bs";
import { GoOrganization } from "react-icons/go";
import { MdOutlineRssFeed, MdOutlineSpaceDashboard } from "react-icons/md";
import { Ri24HoursLine, RiServiceLine } from "react-icons/ri";
import { SlLogin } from "react-icons/sl";
import { TbTimeDuration30 } from "react-icons/tb";
interface LinkItemProps {
  text?: string;
  link?: string;
  icon?: IconType;
}

export const Links: Array<LinkItemProps> = [
  { text: "Serviços", link: "/services", icon: RiServiceLine },
  { text: "Dashboard", link: "/panel", icon: MdOutlineSpaceDashboard },
  { text: "Blog", link: "/blog", icon: MdOutlineRssFeed },
  { text: "Login", link: "/login", icon: SlLogin },
  { text: "Empresa", link: "/organization", icon: GoOrganization },
  { text: "Profissional", link: "/professional", icon: BsPersonBadge },
  { text: "Horários", link: "/hours", icon: Ri24HoursLine },
  { text: "Horários/Serviços", link: "hours-services", icon: TbTimeDuration30 },
];

export const PanelLinks: Array<LinkItemProps> = [
  { text: "Dashboard", link: "/panel", icon: MdOutlineSpaceDashboard },
  { text: "Empresa", link: "/organization", icon: GoOrganization },
  { text: "Serviços", link: "/services", icon: RiServiceLine },
  { text: "Profissional", link: "/professional", icon: BsPersonBadge },
  { text: "Horários", link: "/hours", icon: Ri24HoursLine },
  { text: "Horários/Serviços", link: "hours-services", icon: TbTimeDuration30 },
  { text: "Blog", link: "/blog", icon: MdOutlineRssFeed },
];

export const HomeLinks: Array<LinkItemProps> = [
  { text: "Serviços", link: "/services", icon: RiServiceLine },
  { text: "Dashboard", link: "/panel", icon: MdOutlineSpaceDashboard },
  { text: "Blog", link: "/blog", icon: MdOutlineRssFeed },
];

export const Routes = {
  home: { text: "Home", link: "/" },
  servicos: { text: "Serviços", link: "/servicos" },
  dashboard: { text: "Dashboard", link: "/panel" },
  blog: { text: "Blog", link: "/blog" },
  login: { text: "Login", link: "/login" as string },
  user: {
    create: {
      text: "create",
      link: "/api/user",
    },
  },
};
