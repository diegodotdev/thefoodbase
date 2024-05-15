"use client";

import Link from "next/link";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Lobster } from "next/font/google";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/constants";
import { usePathname } from "next/navigation";
import { Home, Menu as MenuIcon } from "lucide-react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";

const lobster = Lobster({ subsets: ["latin"], weight: ["400"] });

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="w-full h-[10vh] flex justify-between items-center">
      <div className="w-1/2 md:w-1/3 flex justify-start items-center">
        <Link href="/">
          <span className={cn(lobster.className, "text-3xl md:text-4xl")}>
            The Foodbase
          </span>
        </Link>
      </div>

      <div className="w-1/3 hidden md:flex justify-evenly items-center">
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
      <nav className="w-1/3 hidden md:flex justify-end items-center gap-5">
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
      <div className="w-1/2 flex md:hidden justify-end items-center">
        <Menu>
          <MenuButton className="bg-black text-white p-2 rounded-lg">
            <MenuIcon size="15px" />
          </MenuButton>
          <MenuItems
            anchor="bottom end"
            className="z-50 flex flex-col gap-2 bg-black text-white rounded-lg p-1 w-52 text-sm/6"
          >
            <MenuItem>
              <Link href="/" className="w-full p-3">
                <button className="w-full h-full flex items-center justify-start">
                  Home
                </button>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="/categories" className="w-full p-3">
                <button className="w-full h-full flex items-cenetr justify-start">
                  Categories
                </button>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="/recipes" className="w-full p-3">
                <button className="w-full h-full flex items-cenetr justify-start">
                  Recipes
                </button>
              </Link>
            </MenuItem>
            <SignedIn>
              <MenuItem>
                <Link href="/add-recipe" className="w-full p-3">
                  <button className="w-full h-full flex items-cenetr justify-start">
                    Add Recipe
                  </button>
                </Link>
              </MenuItem>
              <MenuItem>
                <SignOutButton>
                  <button className="w-full h-full flex p-3 items-cenetr justify-start">
                    Sign Out
                  </button>
                </SignOutButton>
              </MenuItem>
            </SignedIn>
            <SignedOut>
              <MenuItem>
                <SignInButton>
                  <button className="w-full h-full flex p-3 items-cenetr justify-start">
                    Sign In
                  </button>
                </SignInButton>
              </MenuItem>
            </SignedOut>
          </MenuItems>
        </Menu>
      </div>
    </header>
  );
}
