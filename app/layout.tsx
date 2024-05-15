import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Nav from "@/components/nav";
import { Toaster } from "sonner";
import Footer from "@/components/footer";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

export const metadata: Metadata = {
  title: "The Foodbase",
  description:
    "Learn and share recipes with other cooks, with our easy to use platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.className}>
          <MaxWidthWrapper>
            <Nav />
            {children}
            <Footer />
            <Toaster />
          </MaxWidthWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
