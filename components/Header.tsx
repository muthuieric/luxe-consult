"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone, Mail } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Properties", href: "/properties" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  const isActivePath = (path: string) => pathname === path;

  return (
    <header className="bg-primary/95 backdrop-blur-md border-b border-luxury-gold/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-luxury rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold text-lg">L</span>
            </div>
            <span className="font-serif text-2xl font-bold text-primary-foreground">
              Luxe Consult
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-luxury ${
                  isActivePath(item.href)
                    ? "text-luxury-gold border-b-2 border-luxury-gold"
                    : "text-primary-foreground/80 hover:text-luxury-gold"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-primary-foreground/80 text-sm">
              <Phone className="w-4 h-4" />
              <span>+254 700 123 456</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-primary"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm" className="text-primary-foreground">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-primary border-luxury-gold/20">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-base font-medium transition-luxury py-2 px-4 rounded-lg ${
                      isActivePath(item.href)
                        ? "text-luxury-gold bg-luxury-gold/10"
                        : "text-primary-foreground/80 hover:text-luxury-gold hover:bg-luxury-gold/5"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-luxury-gold/20">
                  <div className="flex items-center space-x-2 text-primary-foreground/80 text-sm mb-4">
                    <Phone className="w-4 h-4" />
                    <span>+254 700 123 456</span>
                  </div>
                  <div className="flex items-center space-x-2 text-primary-foreground/80 text-sm mb-4">
                    <Mail className="w-4 h-4" />
                    <span>info@luxeconsult.com</span>
                  </div>
                  <Button className="w-full bg-gradient-luxury hover:opacity-90">
                    Get Started
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
