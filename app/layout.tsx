import type { Metadata } from "next";
import { Geist, Cormorant_Garamond } from "next/font/google";
import { Toaster } from "sonner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import "./globals.css";

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://timetravel-agency.vercel.app"),
  title: {
    default: "TimeTravel Agency — L'art du voyage temporel",
    template: "%s · TimeTravel Agency",
  },
  description:
    "Agence de voyages temporels d'exception. Trois destinations : Paris 1889, Crétacé -65 Ma, Florence 1504.",
  keywords: [
    "voyage temporel",
    "time travel",
    "Paris 1889",
    "Crétacé",
    "Florence Renaissance",
    "agence de voyage",
  ],
  openGraph: {
    title: "TimeTravel Agency",
    description:
      "Trois époques sublimes, une expérience sur mesure. Paris 1889, Crétacé, Florence 1504.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${sans.variable} ${serif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-ink text-ivory selection:bg-gold/30 selection:text-ivory">
        <Navbar />
        <main className="flex flex-col">{children}</main>
        <Footer />
        <ChatWidget />
        <Toaster
          position="bottom-center"
          theme="dark"
          toastOptions={{
            style: {
              background: "rgba(20, 17, 13, 0.95)",
              border: "1px solid rgba(201, 165, 91, 0.2)",
              color: "#f5efe6",
            },
          }}
        />
      </body>
    </html>
  );
}
