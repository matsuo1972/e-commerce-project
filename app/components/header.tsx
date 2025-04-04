"use client";

import Link from "next/link";
import { MainNav } from "./navigation-menu";
import { Button } from "@/components/ui/button";
import { CartSheet } from "./cart-sheet";
import { UserNav } from "./user-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 max-w-7xl flex h-16 items-center">
        <Link href="/" className="mr-6">
          <span className="text-2xl font-dancing">Marino Atelier</span>
        </Link>
        <MainNav />
        <div className="ml-auto flex items-center space-x-4">
          <CartSheet cart={[]} updateQuantity={() => {}} removeFromCart={() => {}} />
          <UserNav />
        </div>
      </div>
    </header>
  );
}