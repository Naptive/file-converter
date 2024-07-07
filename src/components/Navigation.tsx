"use client";
import { redirect, usePathname, useRouter } from "next/navigation";
import React from "react";
import NavButton from "./NavButton";
import { useMedia } from "react-use";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Pricing from "./Pricing";
import {
  ClerkLoaded,
  ClerkLoading,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { User } from "@clerk/nextjs/server";
import { userInfo } from "os";

const routes = [
  { href: "/", label: "Overview" },
  { href: "/pricing", label: "Pricing" },
  { href: "/help", label: "Help" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, isLoaded } = useUser();
  const isMobile = useMedia("(max-width: 1024px)", false);
  const path = usePathname();
  const router = useRouter();

  if (!user) {
    redirect("/sign-in");
  }

  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Button
            variant="outline"
            size="sm"
            className="font-normal outline-none text-white focus:bg-white/30 transition bg-white/10 focus-visible:ring-offset-0 focus-visible:ring-transparent hover:bg-white/20 hover:text-white border-none"
          >
            <Menu size={16} />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="px-2">
          <header className="h-min text-sm flex items-center gap-x-2 p-4">
            <ClerkLoaded>
              <UserButton afterSignOutUrl="/" />
            </ClerkLoaded>
            <ClerkLoading>
              <Loader2 className="size-8 animate-spin text-slate-400" />
            </ClerkLoading>
            <div>
              <h2>{user?.fullName}</h2>
              <h5>{`${user?.primaryEmailAddress}`}</h5>
            </div>
          </header>
          <nav className="flex flex-col gap-y-2 pt-6">
            {routes.map((route, index) => (
              <>
                {route.label === "Pricing" ? (
                  <Pricing>
                    <Button
                      key={index}
                      variant={route.href === path ? "secondary" : "ghost"}
                      className="w-full justify-start"
                    >
                      {route.label}
                    </Button>
                  </Pricing>
                ) : (
                  <Button
                    onClick={() => onClick(route.href)}
                    key={index}
                    variant={route.href === path ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    {route.label}
                  </Button>
                )}
              </>
            ))}
          </nav>
          <footer>
            <SignOutButton redirectUrl="/sign-in">
              <Button className="absolute inset-x-4 bottom-4">Sign Out</Button>
            </SignOutButton>
          </footer>
        </SheetContent>
      </Sheet>
    );
  }
  return (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
      {routes.map((route, index) => (
        <NavButton
          key={index}
          href={route.href}
          label={route.label}
          isActive={path === route.href}
        />
      ))}
    </nav>
  );
};

export default Navigation;
