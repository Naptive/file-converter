import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Pricing from "./Pricing";

interface NavButtonTypes {
  key: number;
  href: string;
  label: string;
  isActive: boolean;
}
const NavButton = ({ href, label, isActive }: NavButtonTypes) => {
  if (label === "Pricing") {
    return (
      <Pricing>
        <Button
          size="sm"
          variant="outline"
          className={cn(
            "w-full lg:w-auto justify-between font-normal hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition",
            isActive ? "bg-white/10" : "bg-transparent"
          )}
        >
          {label}
        </Button>
      </Pricing>
    );
  } else {
    return (
      <Button
        asChild
        size="sm"
        variant="outline"
        className={cn(
          "w-full lg:w-auto justify-between font-normal hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition",
          isActive ? "bg-white/10" : "bg-transparent"
        )}
      >
        <Link href={href}>{label}</Link>
      </Button>
    );
  }
};

export default NavButton;
