"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      {theme === "dark" ? (
        <Button className="p-2" onClick={() => setTheme("light")}>
          <Sun />
        </Button>
      ) : (
        <Button className="p-2" onClick={() => setTheme("dark")}>
          <Moon />
        </Button>
      )}
    </>
  );
}
