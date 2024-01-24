import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import Providers from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Directv",
    template: `%s - Directv`,
  },
  description: "Sistema de gestión de Informes de Directv",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <Providers attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Toaster />
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  );
}
