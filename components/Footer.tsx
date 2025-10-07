import Link from "next/link";
import { Button } from '@/components/ui/button';
import { FaWhatsapp } from "react-icons/fa";
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { SiTiktok } from "react-icons/si";
import Image from "next/image";


const Footer = () => {
  const quickLinks = [
    { name: 'Properties', href: '/properties' },
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Company Info */}
          <div className="space-y-2">
              <Link href="/" className="flex flex-col items-center space-y-2">
             
              <span className="font-serif text-2xl font-bold text-luxury-gold text-center">
                Luxe Consult
              </span>
               {/* Logo Image */}
              {/* <Image
                src="/luxe-logo-2.png" // replace with your actual logo path
                alt="Luxe Consult Logo"
                width={150} // adjust size for visibility
                height={48}
                className="rounded-md object-cover "
              /> */}
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              {"Your premier real estate partner in Kenya, connecting you with luxury properties in Nairobi's most prestigious locations."}
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="p-2 backdrop-blur-sm hover:cursor-pointer"
                onClick={() => window.open('https://www.facebook.com/people/Luxe-Consult/61559186923576/?rdid=0U4aj3MYXu3Y3dbl&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16G8qa8oxD%2F', '_blank')}
              >
                <Facebook className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 backdrop-blur-sm hover:cursor-pointer"
                onClick={() => window.open('https://x.com/LuxeConsult?t=GjE4pvoY3ndYuoBx5DCneQ&s=09', '_blank')}
              >
                <Twitter className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 backdrop-blur-sm hover:cursor-pointer"
                onClick={() => window.open('https://www.instagram.com/luxeconsult_ke/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D#', '_blank')}
              >
                <Instagram className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 backdrop-blur-sm hover:cursor-pointer"
                onClick={() => window.open('https://www.tiktok.com/@luxe.consult?_t=ZM-8u0qipgX7mI&_r=1', '_blank')}
              >
                <SiTiktok className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 backdrop-blur-sm hover:cursor-pointer" 
                onClick={() => window.open('https://www.linkedin.com/company/YourCompany', '_blank')}
              >
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
                    className="block py-1 text-primary-foreground/80 hover:text-luxury-gold transition-luxury text-sm"
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
                    className="block py-1 text-primary-foreground/80 hover:text-luxury-gold transition-luxury text-sm"
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
                <span className="text-sm">Riverside Square, Riverside Drive, Nairobi, Kenya</span>
              </div>
              <div className="flex items-center space-x-2 text-primary-foreground/80">
                <Phone className="w-4 h-4 text-luxury-gold" />
                <span className="text-sm">+254 768 096 084</span>
              </div>
              <div className="flex items-center space-x-2 text-primary-foreground/80">
                <Mail className="w-4 h-4 text-luxury-gold" />
                <span className="text-sm">hello@luxe-consult.com</span>
              </div>
              <Button
                className="w-full text-black font-semibold bg-success hover:bg-success/90 hover:cursor-pointer mt-4 rounded-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ background: "var(--gradient-luxury)" }}

                onClick={() => window.open('https://wa.me/254768096084', '_blank')}
              >
                <FaWhatsapp className="w-4 h-4 mr-2" />
                WhatsApp Us
              </Button>
            </div>
          </div>
        </div>

        {/* Newsletter (optional, uncomment if needed) */}
        {/* 
        <div className="mt-12 pt-8 border-t border-luxury-gold/20">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold text-luxury-gold mb-2">Stay Updated</h3>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Get the latest property listings and market insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
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
        */}
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-luxury-gold/20 bg-primary/80 backdrop-blur">
        <div className="container mx-auto px-4 py-6 flex justify-center">
          <p className="text-primary-foreground/60 text-sm text-center">
            © 2025 Luxe Consult. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
