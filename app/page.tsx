import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { HERO_COMPONENTS } from "@/constants";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function App() {
  return (
    <div className="py-10 flex flex-col gap-40">
      <div className="w-full flex flex-col gap-4 justify-center items-center">
        <p className="text-4xl sm:text-6xl font-[600] text-center">
          Unleash Your Inner Chef
        </p>
        <p className="text-sm text-muted-foreground text-center sm:w-1/2">
          Welcome to The FoodBase, where culinary creativity meets community!
          Say goodbye to bland meals and uninspiring recipes; we&#39;re here to
          elevate your cooking experience to a whole new level.
        </p>
        <SignedIn>
          <Button>Start Posting</Button>
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <Button>Get Started &rarr;</Button>
          </SignInButton>
        </SignedOut>
      </div>
      {HERO_COMPONENTS.map((i) => (
        <div
          key={i.id}
          className={cn(
            "w-full flex gap-4",
            i.id % 2 === 0 ? "flex-row-reverse" : "flex-row"
          )}
        >
          <div className="w-1/2 grid place-items-center">
            <div className="w-4/5 flex flex-col gap-4">
              <p className="text-3xl font-[600]">{i.title}</p>
              <p className="text-muted-foreground text-sm">{i.sub}</p>
            </div>
          </div>
          <div className="w-1/2 grid place-items-center">
            <div className="relative w-60 h-60">
              <Image src={i.image} alt="component image" fill />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
