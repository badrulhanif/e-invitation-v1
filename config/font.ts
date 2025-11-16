import { Playfair_Display, Parisienne, Marcellus } from "next/font/google";

export const playfairDisplay = Playfair_Display({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const parisienne = Parisienne({
  weight: ["400"],
  subsets: ["latin"],
  style: ["normal"],
  display: "swap",
});

export const marcellus = Marcellus({
  weight: ["400"],
  subsets: ["latin"],
  style: ["normal"],
  display: "swap",
});
