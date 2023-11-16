import { IconType } from "react-icons";
import { BsPersonAdd, BsPersonBadge } from "react-icons/bs";
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

export const PanelAndMenuIcons = {
  dashboard: MdOutlineSpaceDashboard,
  org: GoOrganization,
  services: RiServiceLine,
  professionals: BsPersonBadge,
  proessionalsAdd: BsPersonAdd,
  hours: Ri24HoursLine,
  hours_services: TbTimeDuration30,
  blog: MdOutlineRssFeed,
  login: SlLogin,
};
export const Links: Array<LinkItemProps> = [
  { text: "Serviços", link: "/services", icon: PanelAndMenuIcons.services },
  { text: "Dashboard", link: "/panel", icon: PanelAndMenuIcons.dashboard },
  { text: "Blog", link: "/blog", icon: PanelAndMenuIcons.blog },
  { text: "Login", link: "/login", icon: PanelAndMenuIcons.login },
  { text: "Empresa", link: "/organization", icon: PanelAndMenuIcons.org },
  {
    text: "Profissional",
    link: "/professional",
    icon: PanelAndMenuIcons.professionals,
  },
  { text: "Horários", link: "/hours", icon: PanelAndMenuIcons.hours },
  {
    text: "Horários/Serviços",
    link: "hours-services",
    icon: PanelAndMenuIcons.hours_services,
  },
];

export const PanelLinks: Array<LinkItemProps> = [
  { text: "Dashboard", link: "/panel", icon: PanelAndMenuIcons.dashboard },
  { text: "Empresa", link: "/organization", icon: PanelAndMenuIcons.org },
  { text: "Serviços", link: "/services", icon: PanelAndMenuIcons.services },
  {
    text: "Profissional",
    link: "/professionals",
    icon: PanelAndMenuIcons.professionals,
  },
  { text: "Horários", link: "/hours", icon: PanelAndMenuIcons.hours },
  {
    text: "Horários/Serviços",
    link: "/hours-services",
    icon: PanelAndMenuIcons.hours_services,
  },
  { text: "Blog", link: "/blog", icon: PanelAndMenuIcons.blog },
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
