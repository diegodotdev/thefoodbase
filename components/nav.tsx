import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Lobster } from "next/font/google";
import { cn } from "@/lib/utils";

const lobster = Lobster({ subsets: ["latin"], weight: ["400"] });

export default function Nav() {
  return (
    <header className="w-full flex justify-between items-center">
      <Link href="/">
        <span className={cn(lobster.className, "text-4xl")}>The Foodbase</span>
      </Link>
      <nav>
        <SignedOut>
          <SignInButton>
            <button>Sign In</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </nav>
    </header>
  );
}
