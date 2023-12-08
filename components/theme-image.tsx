"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

export default function ThemeImage({
  dark,
  light,
}: {
  dark: string;
  light: string;
}) {
  const { theme } = useTheme();

  return (
    <>
      {theme === "dark" ? (
        <Image src={light} alt="component image" fill />
      ) : (
        <Image src={dark} alt="component image" fill />
      )}
    </>
  );
}
