import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google"; // Import the font
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";

// Configure the font
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mongolytics - Open-Source Traffic Tracking for Next.js",
  description:
    "Effortless traffic tracking with full data ownership. Free, open-source, and built for Next.js.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          spaceGrotesk.className
        )}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
