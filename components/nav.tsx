"use client";

import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Lobster } from "next/font/google";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/constants";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

const lobster = Lobster({ subsets: ["latin"], weight: ["400"] });

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="w-full h-[10vh] flex justify-between items-center">
      <div className="w-1/3 flex justify-start items-center">
        <Link href="/">
          <span className={cn(lobster.className, "text-4xl")}>
            The Foodbase
          </span>
        </Link>
      </div>

      <div className="w-1/3 flex justify-evenly items-center">
        {NAV_LINKS.map((i) => (
          <Link href={i.href} key={i.id}>
            <span
              className={cn(i.href === pathname ? "font-[600]" : "font-[400]")}
            >
              {i.label}
            </span>
          </Link>
        ))}
        <SignedIn>
          <Link href="/add-recipe">
            <span
              className={cn(
                "/add-recipe" === pathname ? "font-[600]" : "font-[400]"
              )}
            >
              Add Recipe
            </span>
          </Link>
        </SignedIn>
      </div>
      <nav className="w-1/3 flex justify-end items-center gap-5">
        <Search size="15px" />
        <SignedOut>
          <SignInButton>
            <button className="px-5 p-2 bg-black rounded-lg text-white">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </nav>
    </header>
  );
}
