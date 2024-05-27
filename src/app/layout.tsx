import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Dosis } from "next/font/google";
import "./globals.css";

const dosis = Dosis({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UPC Adventure",
  description: "Aplicación de aprendizaje para la UPC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={dosis.className}>
        {children}
        <Toaster position="top-center" expand />
      </body>
    </html>
  );
}
