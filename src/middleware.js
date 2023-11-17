export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/perfil",
    "/dashboard",
    "/checkout",
    "/organization",
    "/professionals",
    "/services",
    "/panel",
    "/hours",
    "/hours-services"
  ],
};
