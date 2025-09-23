import { prisma } from "@/lib/prisma";
import PropertiesClient from "./PropertiesClient";

export default async function PropertiesPage() {
  // Fetch properties server-side with images relation
  const properties = await prisma.property.findMany({
    orderBy: { createdAt: "desc" },
    include: { images: true }, // 👈 include related images
  });

  // Transform each property so that `images` is just an array of URLs
  const transformed = properties.map((p) => ({
    ...p,
    images: p.images?.map((img) => img.url) ?? [],
  }));

  return <PropertiesClient properties={transformed} />;
}
