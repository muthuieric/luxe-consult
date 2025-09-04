import Image from "next/image";
import { Card, CardContent } from '@/components/ui/card';
import { Users, TrendingUp, Heart, Shield, Star } from 'lucide-react';

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
      <section className="bg-primary text-primary-foreground py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
            About <span className="text-luxury-gold">Luxe Consult</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
            Luxe Consult is a leading luxury real estate firm specializing in high-end properties and
            executive developments. Established in 2024, Luxe Consult has quickly emerged as a trusted name,
            delivering tailored property solutions and setting new benchmarks in the industry.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-20 bg-secondary px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            <Card className="shadow-card">
              <CardContent className="p-6 md:p-8">
                <div className="text-center mb-6">
                  <div
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "var(--gradient-luxury)" }}
                  >
                    <TrendingUp className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">Our Mission</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  To provide exceptional real estate consultancy services that exceed client 
                  expectations while building lasting relationships based on trust, integrity, 
                  and unparalleled market expertise.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6 md:p-8">
                <div className="text-center mb-6">
                  <div
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "var(--gradient-luxury)" }}
                  >
                    <Star className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">Our Vision</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {"To be East Africa's leading luxury real estate consultancy, renowned for our innovative approach, market leadership, and commitment to creating exceptional value for our clients and communities."}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              The principles that guide everything we do and shape our relationships with clients.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="shadow-card text-center">
                  <CardContent className="p-6">
                    <div
                      className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ background: "var(--gradient-luxury)" }}
                    >
                      <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-20 bg-secondary px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Our experienced professionals are dedicated to helping you achieve your real estate goals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {team.map((member, index) => (
              <Card key={index} className="shadow-card">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-4">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                    <p className="text-luxury-gold font-medium mb-2">{member.role}</p>
                    <p className="text-xs md:text-sm text-muted-foreground mb-4">{member.experience} Experience</p>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
