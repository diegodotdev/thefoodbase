import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { NAV_LINKS, SIGNED_IN_LINKS } from "@/constants";
import { Button } from "./ui/button";
import Menu from "./menu";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

export default function Nav() {
  const { data: session } = useSession();

  return (
    <header
      className={cn(
        poppins.className,
        "w-full h-[12vh] grid place-items-center"
      )}
    >
      <div className="w-[90vw] sm:w-[85vw] h-full flex justify-between items-center border-b border-gray-200">
        <Link href="/">
          <span className="text-3xl font-[600]">The Foodbase</span>
        </Link>
        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link href={link.href} key={link.id}>
              <span>{link.title}</span>
            </Link>
          ))}
          {session ? (
            <>
              {SIGNED_IN_LINKS.map((link) => (
                <Link href={link.href} key={link.id}>
                  <span>{link.title}</span>
                </Link>
              ))}
              <Button onClick={() => signOut()}>Sign Out</Button>
            </>
          ) : (
            <Button onClick={() => signIn()}>Sign In</Button>
          )}
        </nav>
        <Menu />
      </div>
    </header>
  );
}
