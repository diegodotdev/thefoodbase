import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu as Icon } from "lucide-react";
import { Button } from "./ui/button";
import { NAV_LINKS, SIGNED_IN_LINKS } from "@/constants";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Menu() {
  const { data: session } = useSession();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="md:hidden">
          <Icon size="15px" />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:hidden">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-8 justify-start items-start py-8 w-full">
          {NAV_LINKS.map((link) => (
            <SheetTrigger asChild key={link.id} className="w-full">
              <Link href={link.href} className="w-full flex flex-start">
                <span>{link.title}</span>
              </Link>
            </SheetTrigger>
          ))}
          {session ? (
            <>
              {SIGNED_IN_LINKS.map((link) => (
                <SheetTrigger asChild key={link.id} className="w-full">
                  <Link href={link.href} className="w-full flex flex-start">
                    <span>{link.title}</span>
                  </Link>
                </SheetTrigger>
              ))}
              <Button onClick={() => signOut()} className="w-full">
                Sign Out
              </Button>
            </>
          ) : (
            <Button onClick={() => signIn()} className="w-full">
              Sign In
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
