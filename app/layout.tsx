import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/lib/scroll/lenis-provider";
import Navigation from "@/components/ui/Navigation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "On Da Rocks | East India's Biggest Sunset Bar & Grill",
  description: "Come for the view. Stay till the lights over the dam come on. Experience golden hour at Kanke Dam, Ranchi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-wine text-wasabi selection:bg-algae selection:text-wine overflow-x-hidden">
        <LenisProvider>
          <Navigation />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
