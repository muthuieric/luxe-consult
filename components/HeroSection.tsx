import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-[80vh] sm:h-[70vh] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/p3.jpg" 
          alt="Luxury Home"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/50" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-snug">
            Find Your
            <span className="block text-luxury-gold">Dream Home</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-xl mx-auto">
            {"Discover luxury properties in Nairobi's most prestigious locations with Kenya's premier real estate consultancy."}
          </p>

          {/* CTA Button using Next.js Link */}
          <Link
            href="/properties"
            className="inline-block mt-4 sm:mt-6 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Explore Properties
          </Link>
        </div>
      </div>
    </section>
  );
}
