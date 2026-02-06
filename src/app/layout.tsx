import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Oppr.ai | The Digital Operator Platform for Manufacturing",
    template: "%s | Oppr.ai",
  },
  description:
    "The human data layer for manufacturing. Capture operator knowledge, connect it to machine data, preserve expertise. Start with Oppr Insights to discover where your biggest opportunities are.",
  icons: {
    icon: "/images/oppr_favicon.png",
  },
  other: {
    "theme-color": "#1E3A5F",
    "color-scheme": "light",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ colorScheme: "light" }}>
      <body
        className={`${plusJakarta.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <a href="#main" className="skip-to-content">
          Skip to main content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
