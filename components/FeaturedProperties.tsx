// app/featured-properties/page.tsx
import { prisma } from "@/lib/prisma";
import PropertiesClient from "@/app/properties/PropertiesClient";
import Link from "next/link";

export default async function FeaturedPropertiesPage() {
  // Fetch properties server-side with images
  const properties = await prisma.property.findMany({
    orderBy: { createdAt: "desc" },
    include: { images: true }, // include related images
  });

  // Transform each property so that `images` is an array of URLs
  const transformed = properties.map((p) => ({
    ...p,
    images: p.images?.map((img) => img.url) ?? [],
  }));

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Properties
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties in Nairobi's most sought-after locations.
          </p>
        </div>

        {/* Render properties */}
        <PropertiesClient properties={transformed} />

              {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/properties" passHref>
            <button
              className="border-[hsl(var(--luxury-gold))] text-[hsl(var(--luxury-gold))] hover:bg-[hsl(var(--luxury-gold))] hover:text-black transition-colors duration-300 px-6 py-2 rounded-lg"
            >
              View All Properties
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
