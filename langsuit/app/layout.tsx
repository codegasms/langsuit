import { Toaster } from "@/components/ui/sonner";
import {
  ClerkProvider
} from "@clerk/nextjs";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Langsuit",
  description: "An easy way to become a Polyglot",
};

export default function RootLayout({
  children,
}: Readonly < {
  children: React.ReactNode;
} > ){
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
