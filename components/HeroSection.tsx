// components/HeroSection.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { locations } from '@/data/properties';


export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/4.jpeg')" }}
      />
      <div className="absolute inset-0 bg-gradient-overlay" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary-foreground leading-tight">
            Find Your
            <span className="block text-luxury-gold">Dream Home</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto">
            {"Discover luxury properties in Nairobi's most prestigious locations with Kenya's premier real estate consultancy."}
          </p>
            
          {/* Search Bar */}
          <Card className="bg-background/95 backdrop-blur-sm shadow-luxury max-w-4xl mx-auto">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <Input placeholder="Search properties, locations..." className="h-12" />
                </div>
                <Select>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location.toLowerCase()}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  className="h-12 flex items-center justify-center px-4 rounded-lg text-white transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ background: "var(--gradient-luxury)" }}
                >
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
