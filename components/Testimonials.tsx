// components/Testimonials.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Kimani",
      role: "Property Investor",
      content:
        "Luxe Consult helped me find the perfect investment property in Karen. Their expertise and professionalism are unmatched.",
      rating: 5,
    },
    {
      name: "John Mwangi",
      role: "First-time Buyer",
      content:
        "The team made my first property purchase seamless. They guided me through every step of the process.",
      rating: 5,
    },
    {
      name: "Grace Achieng",
      role: "Commercial Client",
      content:
        "Found the ideal office space for our growing business. Luxe Consult delivered beyond our expectations.",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-secondary relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-[url('/luxury-pattern.png')] opacity-5 pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don’t just take our word for it — here’s what our satisfied clients
            have to say.
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[Autoplay({ delay: 5000 })]}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3 px-4"
              >
                <Card className="shadow-card border border-border hover:border-luxury-gold transition-all duration-300 bg-background/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-luxury-gold fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 italic">
                      “{testimonial.content}”
                    </p>
                    <div>
                      <div className="font-semibold text-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Arrows */}
          <CarouselPrevious className="left-2 bg-background/70 hover:bg-background border border-border shadow-md" />
          <CarouselNext className="right-2 bg-background/70 hover:bg-background border border-border shadow-md" />
        </Carousel>
      </div>
    </section>
  );
}
