import { prisma } from "@/lib/prisma";
import PropertiesClient from "./PropertiesClient";

// ✅ Cache indefinitely - only revalidate when triggered manually
export const revalidate = false; // or you can omit this line

export default async function PropertiesPage() {
  // Fetch properties server-side with images relation
  const properties = await prisma.property.findMany({
    orderBy: { createdAt: "desc" },
    include: { images: true },
  });

  // Transform each property so that `images` is just an array of URLs
  const transformed = properties.map((p) => ({
    ...p,
    images: p.images?.map((img) => img.url) ?? [],
  }));

  return <PropertiesClient properties={transformed} />;
}
