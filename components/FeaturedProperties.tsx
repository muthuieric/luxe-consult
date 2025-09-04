// components/FeaturedProperties.tsx
import { mockProperties } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FeaturedProperties() {
  const featured = mockProperties.filter((p) => p.featured);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Properties
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
             {"Discover our handpicked selection of premium properties in Nairobi's most sought-after locations."}
        </p>

        </div>


        {/* Properties Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {featured.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              href={`/properties/${property.id}`}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/properties">
            <Button
              variant="outline"
              size="lg"
              className="border-[hsl(var(--luxury-gold))] text-[hsl(var(--luxury-gold))] hover:bg-[hsl(var(--luxury-gold))] hover:text-black transition-colors duration-300"
            >
              View All Properties
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
