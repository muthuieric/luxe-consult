"use client";

import Image from "next/image";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, TrendingUp, Heart, Shield, Star, MessageCircle } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Trust & Integrity',
      description: 'We maintain the highest standards of honesty and transparency in all our dealings.'
    },
    {
      icon: Heart,
      title: 'Client-Centric',
      description: 'Your satisfaction is our top priority. We go above and beyond to exceed expectations.'
    },
    {
      icon: Star,
      title: 'Excellence',
      description: 'We strive for perfection in every aspect of our service delivery.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We work closely with our clients to understand and fulfill their unique requirements.'
    }
  ];

  const team = [
    {
      name: 'David Kimani',
      role: 'Founder & CEO',
      experience: '15+ years',
      description: 'Leading real estate expert with extensive knowledge of Nairobi\'s luxury market.',
      image: '/src/assets/property1.jpg'
    },
    {
      name: 'Sarah Wanjiku',
      role: 'Senior Property Consultant',
      experience: '10+ years',
      description: 'Specializes in residential properties in Karen, Lavington, and Westlands.',
      image: '/src/assets/property2.jpg'
    },
    {
      name: 'Michael Ochieng',
      role: 'Commercial Properties Head',
      experience: '12+ years',
      description: 'Expert in commercial real estate and investment opportunities.',
      image: '/src/assets/property3.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              About <span className="text-luxury-gold">Luxe Consult</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
            Luxe Consult is a leading luxury real estate firm specializing in high end properties and
             executive developments. Established in 2024, Luxe Consult has quickly emerged as a trusted name,
              delivering tailored property solutions and setting new benchmarks in the industry.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      {/* <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-serif font-bold text-foreground">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2009 with a vision to transform the real estate landscape in Kenya, 
                  Luxe Consult began as a boutique consultancy focused on luxury properties 
                  in Nairobi's most sought-after locations.
                </p>
                <p>
                  What started as a small team of passionate real estate professionals has grown 
                  into one of Kenya's most trusted and respected property consultancies. Our 
                  commitment to excellence, integrity, and personalized service has earned us 
                  the loyalty of hundreds of satisfied clients.
                </p>
                <p>
                  Today, we continue to set the standard for luxury real estate services, 
                  leveraging cutting-edge technology and deep market expertise to deliver 
                  exceptional results for our clients.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Image 
                src="/src/assets/property1.jpg" 
                alt="Luxury property"
                fill
                className="rounded-lg shadow-card w-full h-64 object-cover"
              />
              <Image
                src="/src/assets/property2.jpg" 
                alt="Premium location"
                fill
                className="rounded-lg shadow-card w-full h-64 object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section> */}

      {/* Mission & Vision */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card className="shadow-card">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-luxury rounded-full flex items-center justify-center mx-auto mb-4" 
                                                  style={{ background: "var(--gradient-luxury)" }} 
>
                    <TrendingUp className="w-8 h-8 text-primary" 
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Our Mission</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To provide exceptional real estate consultancy services that exceed client 
                  expectations while building lasting relationships based on trust, integrity, 
                  and unparalleled market expertise.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-luxury rounded-full flex items-center justify-center mx-auto mb-4"
                                      style={{ background: "var(--gradient-luxury)" }} 
>
                    <Star className="w-8 h-8 text-primary" 
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Our Vision</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To be East Africa's leading luxury real estate consultancy, renowned for 
                  our innovative approach, market leadership, and commitment to creating 
                  exceptional value for our clients and communities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do and shape our relationships with clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="shadow-card text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-luxury rounded-full flex items-center justify-center mx-auto mb-4"
                                                 style={{ background: "var(--gradient-luxury)" }} 
>
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our experienced professionals are dedicated to helping you achieve your real estate goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="shadow-card">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Image
                      src={member.image} 
                      alt={member.name}
                      fill
                      className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                    />
                    <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                    <p className="text-luxury-gold font-medium mb-2">{member.role}</p>
                    <p className="text-sm text-muted-foreground mb-4">{member.experience} Experience</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {member.description}
                    </p>
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
              Ready to Work With Us?
            </h2>
            <p className="text-xl text-primary-foreground/90">
              Experience the difference of working with Kenya's premier real estate consultancy. 
              Let us help you find your perfect property or achieve your investment goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-luxury hover:opacity-90"
              >
                View Properties
              </Button>
              <Button 
                variant="outline"
                className='transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg hover:text-white'
                style={{ background: "var(--gradient-luxury)" }} 
                onClick={() => window.open('https://wa.me/+254768096084', '_blank')}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Chat
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;