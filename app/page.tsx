import Image from "next/image";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PropertyCard from '@/components/PropertyCard';
import { Search, ShieldCheck, Users, Award, Star, MessageCircle, Handshake, LifeBuoy } from 'lucide-react';
import { mockProperties, locations, propertyTypes } from '@/data/properties';

export default function Home() {
  const featuredProperties = mockProperties.filter(p => p.featured);

  const stats = [
    { icon: Users, label: 'Happy Clients', value: '500+' },
    { icon: Award, label: 'Properties Sold', value: '1,200+' },
    { icon: Star, label: 'Client Satisfaction', value: '98%' },
    { icon: MessageCircle, label: 'Client Interactions', value: '2000+' }
  ];

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
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/4.jpeg')" }}

        />
        <div className="absolute inset-0 bg-gradient-overlay" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary-foreground leading-tight">
              Find Your
              <span className="block text-luxury-gold">Dream Home</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto">
              Discover luxury properties in Nairobi's most prestigious locations with Kenya's premier real estate consultancy.
            </p>
            
            {/* Search Bar */}
            <Card className="bg-background/95 backdrop-blur-sm shadow-luxury max-w-4xl mx-auto">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <Input 
                      placeholder="Search properties, locations..." 
                      className="h-12"
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map(location => (
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

      {/* Stats Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-slide-up">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                style={{ background: "var(--gradient-luxury)" }} // gradient background
              >
                <stat.icon
                  className="w-8 h-8"        // increase icon size
                  stroke="currentColor"         // ensures it uses color
                  style={{ color: "hsl(var(--primary))" }} // set icon color
                />
              </div>

                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
              Featured Properties
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of premium properties in Nairobi's most sought-after locations.
            </p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProperties.map((property) => (
              <PropertyCard 
              key={property.id}
              property={property} 
              href={`/properties/${property.id}`}
              />
            ))}
          </div>


          <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-[hsl(var(--luxury-gold))] text-[hsl(var(--luxury-gold))] hover:bg-[hsl(var(--luxury-gold))] hover:text-black transition-colors duration-300"
          >
            View All Properties
          </Button>


          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-serif font-bold">
                Why Choose Luxe Consult?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-luxury rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                          style={{ background: "var(--gradient-luxury)" }} // gradient background
                  >
              <Handshake className="w-4 h-4 text-primary"
                              />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-luxury-gold">Trusted Network</h3>
                  <p className="text-primary-foreground/80">
                    Strong relationships with financial institutions, developers, and legal partners ensure smooth transactions.
                  </p>
                </div>
              </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-luxury rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                                          style={{ background: "var(--gradient-luxury)" }} // gradient background
                >
                    <ShieldCheck className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-luxury-gold">Transparency & Integrity</h3>
                    <p className="text-primary-foreground/80">
                      Honest guidance, clear contracts, and no hidden fees — your trust is our top priority.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-luxury rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                                          style={{ background: "var(--gradient-luxury)" }} // gradient background
                >
                    <LifeBuoy className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-luxury-gold">Ongoing Support</h3>
                    <p className="text-primary-foreground/80">
                      Assistance before, during, and after the sale or rental to ensure a seamless experience.
                    </p>
                  </div>
                </div>


{/*                 
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-luxury rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                         style={{ background: "var(--gradient-luxury)" }} // gradient background
                         > 
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-luxury-gold">Prime Locations</h3>
                    <p className="text-primary-foreground/80">
                      Exclusive access to properties in Kilimani, Karen, Westlands, and other premium areas.
                    </p>
                  </div>
                </div> */}

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-luxury rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                         style={{ background: "var(--gradient-luxury)" }} // gradient background
                         >
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-luxury-gold">Personalized Service</h3>
                    <p className="text-primary-foreground/80">
                      Dedicated consultants who understand your unique requirements and preferences.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Image
                src="/src/assets/property1.jpg" 
                alt="Luxury property"
                className="rounded-lg shadow-luxury w-full h-64 object-cover"
                fill
              />
              <Image
                src="/src/assets/property2.jpg" 
                alt="Premium location"
                className="rounded-lg shadow-luxury w-full h-64 object-cover mt-8"
                fill
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients have to say.
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
                    "{testimonial.content}"
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
              Let our expert team help you discover the perfect property that matches your lifestyle and investment goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-luxury hover:opacity-90"
              >
                Browse Properties
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-primary"
              >
                Contact Us Today
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

