import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function MaxWidthWrapper({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(className, "w-full max-w-screen-xl mx-auto px-5 md:px-0")}
    >
      {children}
    </div>
  );
}
