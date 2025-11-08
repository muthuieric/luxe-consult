import { prisma } from "@/lib/prisma";
import AdminPropertiesTable from "@/components/AdminPropertiesTable";

export const dynamic = "force-dynamic";

export default async function AdminViewPage() {
  // Fetch all properties including images
  const properties = await prisma.property.findMany({
    orderBy: { createdAt: "desc" },
    include: { images: true },
  });

  // Transform images to array of URLs
  const transformed = properties.map((p) => ({
    ...p,
    images: p.images.map((img) => img.url),
  }));

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">All Properties</h1>
      <AdminPropertiesTable properties={transformed} />
    </div>
  );
}
