import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "./Layout/Header/Header.jsx";
import Footer from "./Layout/Footer/Footer.jsx";

export const metadata = {
  title: "mettā muse — Handcrafted Fashion & Artisan Products",
  description:
    "Discover unique handcrafted fashion, artisan clothing, and curated products at mettā muse. Shop sustainable, story-driven collections made by skilled artisans worldwide.",
  keywords: ["metta muse", "handcrafted fashion", "artisan products", "sustainable clothing", "stories", "boutiques"],
  icons: {
    icon: "/Logos/HeaderLogo.png",
    shortcut: "/Logos/HeaderLogo.png",
    apple: "/Logos/HeaderLogo.png",
  },
  openGraph: {
    title: "mettā muse — Handcrafted Fashion & Artisan Products",
    description:
      "Discover unique handcrafted fashion and artisan products at mettā muse. Curated collections made by skilled makers worldwide.",
    type: "website",
  },
};

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.variable} style={{ colorScheme: "light" }}>
      <body suppressHydrationWarning>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
