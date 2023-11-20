import { Bayon, Poppins, Roboto } from "next/font/google";

export const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const bayon = Bayon({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});
