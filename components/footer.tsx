import Link from "next/link";
import { Lobster } from "next/font/google";
import { cn } from "@/lib/utils";

const lobster = Lobster({ subsets: ["latin"], weight: ["400"] });

export default function Footer() {
  return (
    <div className="w-full border-t border-gray-400 h-[8vh] flex justify-between items-center">
      <Link href="/">
        <span className={cn(lobster.className, "text-xl")}>The Foodbase</span>
      </Link>
      <p>&copy; 2024</p>
    </div>
  );
}
