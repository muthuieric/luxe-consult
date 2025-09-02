import Link from "next/link";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Properties', href: '/properties' },
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const locations = [
    'Kilimani',
    'Kileleshwa', 
    'Lavington',
    'Karen',
    'Westlands'
  ];

  const propertyTypes = [
    'Apartments',
    'Villas',
    'Townhouses',
    'Commercial',
    'Land'
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-luxury rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-lg">L</span>
              </div>
              <span className="font-serif text-2xl font-bold">Luxe Consult</span>
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Your premier real estate partner in Kenya, connecting you with luxury properties 
              in Nairobi's most prestigious locations.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="p-2 hover:bg-luxury-gold/10">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-luxury-gold/10">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-luxury-gold/10">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-luxury-gold/10">
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-luxury-gold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-luxury-gold transition-luxury text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-luxury-gold">Locations</h3>
            <ul className="space-y-2">
              {locations.map((location) => (
                <li key={location}>
                  <Link 
                    href={`/properties?location=${location.toLowerCase()}`}
                    className="text-primary-foreground/80 hover:text-luxury-gold transition-luxury text-sm"
                  >
                    {location}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-luxury-gold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-primary-foreground/80">
                <MapPin className="w-4 h-4 text-luxury-gold" />
                <span className="text-sm">Westlands, Nairobi Kenya</span>
              </div>
              <div className="flex items-center space-x-2 text-primary-foreground/80">
                <Phone className="w-4 h-4 text-luxury-gold" />
                <span className="text-sm">+254 700 123 456</span>
              </div>
              <div className="flex items-center space-x-2 text-primary-foreground/80">
                <Mail className="w-4 h-4 text-luxury-gold" />
                <span className="text-sm">info@luxeconsult.com</span>
              </div>
              <Button 
                className="w-full bg-success hover:bg-success/90 text-success-foreground mt-4"
                onClick={() => window.open('https://wa.me/254700123456', '_blank')}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Us
              </Button>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-luxury-gold/20">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold text-luxury-gold mb-2">Stay Updated</h3>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Get the latest property listings and market insights delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <Input 
                placeholder="Enter your email" 
                className="flex-1 bg-primary-foreground/10 border-luxury-gold/20 text-primary-foreground"
              />
              <Button className="bg-gradient-luxury hover:opacity-90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-luxury-gold/20 bg-primary/80 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-foreground/60 text-sm">
              © 2025 Luxe Consult. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-primary-foreground/60 hover:text-luxury-gold transition-luxury">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-primary-foreground/60 hover:text-luxury-gold transition-luxury">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;