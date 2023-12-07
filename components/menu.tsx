import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu as Icon } from "lucide-react";
import { NAV_LINKS, SIGNED_IN_LINKS } from "@/constants";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Menu() {
  return (
    <Sheet>
      <SheetTrigger className="sm:hidden bg-foreground p-2 rounded-lg text-background">
        <Icon size="15px" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-8 py-4">
          {NAV_LINKS.map((link) => (
            <SheetTrigger key={link.id} asChild>
              <Link href={link.href}>
                <span>{link.title}</span>
              </Link>
            </SheetTrigger>
          ))}
          <SignedIn>
            {SIGNED_IN_LINKS.map((link) => (
              <SheetTrigger key={link.id} asChild>
                <Link href={link.href}>
                  <span>{link.title}</span>
                </Link>
              </SheetTrigger>
            ))}
            <SignOutButton>
              <Button>Sign Out</Button>
            </SignOutButton>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
}
