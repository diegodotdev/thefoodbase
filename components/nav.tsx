import { NAV_LINKS, SIGNED_IN_LINKS } from "@/constants";
import Menu from "./menu";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import ThemeButton from "./theme-button";

export default function Nav() {
  return (
    <header className="w-full h-[15vh] grid place-items-center">
      <div className="w-[90vw] flex justify-between items-center border-b border-gray-200 h-full">
        <Link href="/">
          <span className="text-3xl font-[600]">The Foodbase</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link href={link.href} key={link.id}>
              <span>{link.title}</span>
            </Link>
          ))}
          <SignedIn>
            {SIGNED_IN_LINKS.map((link) => (
              <Link href={link.href} key={link.id}>
                <span>{link.title}</span>
              </Link>
            ))}
            <ThemeButton />
            <SignOutButton>
              <Button>Sign Out</Button>
            </SignOutButton>
          </SignedIn>
          <SignedOut>
            <ThemeButton />
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
        </nav>
        <Menu />
      </div>
    </header>
  );
}
