import Image from "next/image";
import { Handshake, ShieldCheck, LifeBuoy, Users } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: Handshake,
      title: "Trusted Network",
      description:
        "Strong relationships with banks, developers, and legal partners ensure smooth, reliable transactions.",
    },
    {
      icon: ShieldCheck,
      title: "Transparency & Integrity",
      description:
        "Clear contracts, no hidden fees — your trust is our top priority.",
    },
    {
      icon: LifeBuoy,
      title: "Ongoing Support",
      description:
        "We’re here before, during, and after your property purchase or rental.",
    },
    {
      icon: Users,
      title: "Personalized Service",
      description:
        "Dedicated consultants who tailor solutions to your unique lifestyle and needs.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-primary via-primary/95 to-primary/90 text-primary-foreground relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-[url('/luxury-pattern.png')] opacity-5 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          {/* Left - Text */}
          <div className="space-y-6 sm:space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold leading-tight">
              Why Choose{" "}
              <span className="text-luxury-gold">Luxe Consult?</span>
            </h2>
            <p className="text-base sm:text-lg text-primary-foreground/80 max-w-xl">
              We go beyond just transactions — we build trusted relationships and deliver
              experiences that make luxury real estate seamless and rewarding.
            </p>

            <div className="grid gap-4 sm:gap-6">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-luxury-gold transition-all duration-300"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-luxury-gold/90 to-yellow-500/80 shadow-md flex-shrink-0">
                    <item.icon className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-luxury-gold">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-primary-foreground/70">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Luxury Images */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 relative">
            <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500">
              <Image
                src="/6.jpeg"
                alt="Luxury property"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-full h-56 sm:h-72 mt-6 sm:mt-12 rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500">
              <Image
                src="/5.jpeg"
                alt="Premium location"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
