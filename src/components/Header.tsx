import React from "react";
import HeaderLogo from "./HeaderLogo";
import Navigation from "./Navigation";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import WelcomeMessage from "./WelcomeMessage";

const Header = () => {
  return (
    <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-32">
      <div className="max-w-screen-2xl mx-auto ">
        <div className="flex items-center w-full md:justify-between mb-14">
          <div className="flex items-center justify-between lg:justify-start w-full lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <ClerkLoaded>
            <UserButton
              afterSignOutUrl="/sign-in"
              appearance={{
                elements: {
                  rootBox: "hidden lg:block",
                },
              }}
            />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="size-8 animate-spin text-slate-400 hidden md:block" />
          </ClerkLoading>
        </div>
        <WelcomeMessage />
      </div>
    </header>
  );
};

export default Header;
