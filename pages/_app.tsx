import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Nav from "@/components/nav";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

export default function App({ Component, pageProps, session }: any) {
  return (
    <SessionProvider session={session}>
      <Nav />
      <main className={cn("w-[90vw] sm:w-[85vw] mx-auto", poppins.className)}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}
