"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./theme-button";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/70 backdrop-blur-md shadow-sm border-b">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-primary hover:opacity-90 transition-opacity"
        >
          Blogify
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <NavItem href="/" label="Home" />
          <NavItem href="/blog" label="Blog" />
          <NavItem href="/about" label="About" />
          <NavItem href="/contact" label="Contact" />
          <div className="flex items-center space-x-2">
            <SignedOut>
              <SignInButton routing="/sign-in">
                <span>
                  <Button className="hover:bg-primary/90 transition cursor-pointer">
                    Sign In
                  </Button>
                </span>
              </SignInButton>
              <SignUpButton routing="/sign-up">
                <span>
                  <Button className="hover:bg-primary/90 transition cursor-pointer">
                    Sign Up
                  </Button>
                </span>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          <ModeToggle />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center space-x-2">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <button aria-label="Open menu">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-xl font-bold text-center">
                  Blogify
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col mt-6 space-y-4 text-center">
                <NavItem href="/" label="Home" />
                <NavItem href="/blog" label="Blog" />
                <NavItem href="/about" label="About" />
                <NavItem href="/contact" label="Contact" />
                <div className="flex justify-center gap-2">
                  <div className="flex items-center space-x-2">
                    <SignedOut>
                      <SignInButton routing="/sign-in">
                        <span>
                          <Button className="hover:bg-primary/90 transition cursor-pointer">
                            Sign In
                          </Button>
                        </span>
                      </SignInButton>
                      <SignUpButton routing="/sign-up">
                        <span>
                          <Button className="hover:bg-primary/90 transition cursor-pointer">
                            Sign Up
                          </Button>
                        </span>
                      </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                      <div className="fixed bottom-4 right-4 z-50 text-2xl scale-140">
                        <UserButton />
                      </div>
                    </SignedIn>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ href, label }) => (
  <Link
    href={href}
    className="text-muted-foreground hover:text-foreground font-medium transition-colors duration-200"
  >
    {label}
  </Link>
);

export default Navbar;
