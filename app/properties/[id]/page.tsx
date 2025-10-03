import { prisma } from "@/lib/prisma";
import PropertyDetailsClient from "./PropertyDetailsClient";

interface PropertyPageProps {
  params: Promise<{ id: string }>; // 👈 must be Promise
}

export const revalidate = false; 


export default async function PropertyDetailsPage({ params }: PropertyPageProps) {
  const { id } = await params; // 👈 await params

  const property = await prisma.property.findUnique({
    where: { id: Number(id) },
    include: { images: true }, // if you want related images
  });

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Property Not Found</h1>
      </div>
    );
  }

  // transform relation into plain array of urls
  const transformed = {
    ...property,
    images: property.images?.map((img) => img.url) ?? [],
  };

  return <PropertyDetailsClient property={transformed} />;
}
