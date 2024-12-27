"use client";

import { Code2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NavLinks } from "@/components/clients/navigation/nav-links";
import { MobileNav } from "@/components/clients/navigation/mobile-nav";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-0">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Code2 className="h-6 w-6" />
          <span className="inline-block font-semibold text-2xl md:text-3xl font-bilbo">
            Ahmed
          </span>
        </Link>

        {/* Navigation Links - Centered */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <NavLinks />
        </div>

        {/* Contact Button & Mobile Menu */}
        <div className="flex items-center gap-4">
          <Button asChild className="hidden md:inline-flex font-semibold">
            <Link href="/contact">Contact Us</Link>
          </Button>
          <div className="flex items-center">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
