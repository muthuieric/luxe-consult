"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, Phone, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Properties", href: "/properties" },
    { name: "About", href: "/about" },
    // { name: "Blog", href: "/blog" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  const isActivePath = (path: string) => pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-3 md:px-6">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          {/* <Image
            src="/luxe-logo-2.png"
            alt="Luxe Consult Logo"
            width={120}  // small but visible
            height={60} // adjust as needed
            className="rounded-md object-cover"
          /> */}
          <span className="font-serif text-2xl md:text-xl font-extrabold text-[hsl(var(--luxury-gold))]">
            Luxe Consult
          </span>
        </Link>

        

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => {
              const active = isActivePath(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative text-sm font-medium transition-colors ${
                    active
                      ? "text-[hsl(var(--luxury-gold))] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-[hsl(var(--luxury-gold))]"
                      : "text-gray-700 hover:text-[hsl(var(--luxury-gold))]"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Contact & CTA (desktop) */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* <div className="flex items-center space-x-1 text-gray-600 text-xs md:text-sm">
              <Phone className="w-4 h-4 text-[hsl(var(--luxury-gold))]" />
              <span>+254 768 096 084</span>
            </div> */}
            <Button 
              variant="ghost"
              className="flex items-center space-x-1 text-gray-600 text-xs md:text-sm"
               asChild>
                  <a href="tel:+254700000000">
                    <Phone className="w-4 h-4 mr-2 " />
                    +254 768 096 084
                  </a>
            </Button>
            <Button
  asChild
  // removed variant="ghost" to avoid hover conflicts
  className="bg-[hsl(var(--luxury-gold))] hover:bg-[hsl(var(--luxury-gold))]/90 text-black font-semibold flex items-center px-3 md:px-4 py-2 text-sm md:text-base transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
>
  <a
    href="https://wa.me/254768096084"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaWhatsapp className="w-4 h-4 mr-2" />
    WhatsApp
  </a>
</Button> 
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-gray-800">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[260px] bg-white border-luxury-gold/20"
            >
                {/* ✅ Accessible but hidden title */}
    <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>

              <div className="flex flex-col space-y-3 mt-8">
                {navigation.map((item) => {
                  const active = isActivePath(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-base font-medium rounded-lg px-4 py-2 transition ${
                        active
                          ? "bg-[hsl(var(--luxury-gold))/10] text-[hsl(var(--luxury-gold))]"
                          : "text-gray-700 hover:text-[hsl(var(--luxury-gold))] hover:bg-gray-50"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}

<div className="pt-5 border-t border-gray-200 space-y-3">
  {/* Email CTA */}
  <Button
    variant="ghost"
    className="w-full flex items-center justify-start text-gray-700 "
    asChild
  >
    <a href="mailto:info@luxeconsult.com">
      <Mail className="w-4 h-4 mr-2 " />
      info@luxeconsult.com
    </a>
  </Button>

  {/* Phone CTA */}
  <Button
    variant="ghost"
    className="w-full flex items-center justify-start text-gray-700 "
    asChild
  >
    <a href="tel:+254768096084">
      <Phone className="w-4 h-4 mr-2 " />
      +254 768 096 084
    </a>
  </Button>

  {/* WhatsApp CTA */}
  <Button
    variant="ghost"
    onClick={() => window.open("https://wa.me/254768096084", "_blank")}
    className="w-full bg-[hsl(var(--luxury-gold))] text-black font-semibold flex items-center justify-center transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
  >
    <FaWhatsapp className="w-4 h-4 mr-2" />
    WhatsApp
  </Button>
</div>

              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
