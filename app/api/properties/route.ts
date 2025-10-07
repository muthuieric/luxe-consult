// app/api/properties/route.ts
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

// CREATE Property
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      title,
      location,
      price,
      type,
      status,
      bedrooms,
      bathrooms,
      area,
      description,
      amenities,
      imageUrls, // Array of uploaded ImageKit URLs
    } = body;

    // Validate required fields
    if (!title || !location || !price || !type || !status || !bedrooms || !bathrooms) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!imageUrls || !Array.isArray(imageUrls) || imageUrls.length === 0) {
      return NextResponse.json(
        { error: "At least one image is required" },
        { status: 400 }
      );
    }

    // Step 1: Create property with transaction to ensure atomicity
    // Increase timeout for larger uploads (10 seconds)
    const result = await prisma.$transaction(
      async (tx) => {
        // Create the property
        const property = await tx.property.create({
          data: {
            title,
            location,
            price,
            type,
            status,
            bedrooms,
            bathrooms,
            area,
            description,
            amenities,
          },
        });

        // Create all image records linked to the property
        const images = await tx.image.createMany({
          data: imageUrls.map((url: string) => ({
            url,
            propertyId: property.id,
          })),
        });

        // Fetch the created images to return them
        const createdImages = await tx.image.findMany({
          where: { propertyId: property.id },
        });

        return { property, images: createdImages };
      },
      {
        maxWait: 60000, // Wait up to 10 seconds to start transaction
        timeout: 85000, // Transaction timeout of 15 seconds
      }
    );

    // ✅ Revalidate the properties pages so new data shows immediately
    revalidatePath('/properties');
    revalidatePath('/admin');

    return NextResponse.json({
      success: true,
      property: result.property,
      images: result.images,
    });
  } catch (error) {
    console.error("Property creation error:", error);
    return NextResponse.json(
      { error: "Failed to create property" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      orderBy: { createdAt: "desc" },
      include: { images: true },
    });

    return NextResponse.json({ properties });
  } catch (error) {
    console.error("Failed to fetch properties:", error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}

// DELETE Property
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const propertyId = searchParams.get("id");

    if (!propertyId) {
      return NextResponse.json(
        { error: "Property ID is required" },
        { status: 400 }
      );
    }

    // Delete property and related images (cascade delete if configured in schema)
    await prisma.property.delete({
      where: { id: Number(propertyId) },
    });

    // ✅ Revalidate after deleting
    revalidatePath('/properties');
    revalidatePath('/admin');

    return NextResponse.json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete property:", error);
    return NextResponse.json(
      { error: "Failed to delete property" },
      { status: 500 }
    );
  }
}
