import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import WhyChooseUs from "@/components/WhyChooseUs";
import Link from "next/link";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';


export const dynamic = 'force-dynamic';

export default function Home() {

  const testimonials = [
    {
      name: 'Sarah Kimani',
      role: 'Property Investor',
      content: 'Luxe Consult helped me find the perfect investment property in Karen. Their expertise and professionalism are unmatched.',
      rating: 5
    },
    {
      name: 'John Mwangi', 
      role: 'First-time Buyer',
      content: 'The team made my first property purchase seamless. They guided me through every step of the process.',
      rating: 5
    },
    {
      name: 'Grace Achieng',
      role: 'Commercial Client',
      content: 'Found the ideal office space for our growing business. Luxe Consult delivered beyond our expectations.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      <HeroSection/>
      <FeaturedProperties />
      <WhyChooseUs />
      <StatsSection />



       {/* Testimonials */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {"Don't just take our word for it. Here's what our satisfied clients have to say."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-luxury-gold fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">
                    {`"${testimonial.content}"`}
                  </p>

                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl font-serif font-bold">
              Ready to Find Your Dream Property?
            </h2>
            <p className="text-xl text-primary-foreground/90">
            Whether you’re looking to buy, rent, or invest — we’re here to guide
          you every step of the way with trusted expertise and a luxury
          experience.            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
    
          {/* Browse Properties */}
          <Link href="/properties">
            <Button
              size="lg"
              className="bg-[hsl(var(--luxury-gold))] text-black hover:bg-[hsl(var(--luxury-gold-dark))] transition-all duration-300 hover:cursor-pointer"
            >
              Browse Properties
            </Button>
          </Link>

          {/* Contact Us */}
          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              className="border-white bg-white text-black hover:bg-gray-200 transition-all duration-300 hover:cursor-pointer"
            >
              Contact Us
            </Button>
          </Link>
            </div>
          </div>
        </div>
      </section>
      {/* <CtaSection /> */}

    </div>
  );
};

