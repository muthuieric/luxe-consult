// app/api/properties/route.ts
import { NextResponse } from "next/server";
import ImageKit from "imagekit";
import prisma from "@/lib/prisma";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const files = formData.getAll("files") as File[];
    const title = formData.get("title") as string;
    const location = formData.get("location") as string;
    const price = Number(formData.get("price"));
    const type = formData.get("type") as string;
    const status = formData.get("status") as string;
    const bedrooms = Number(formData.get("bedrooms"));
    const bathrooms = Number(formData.get("bathrooms"));
    const area = formData.get("area") ? Number(formData.get("area")) : null;
    const description = formData.get("description") as string | null;
    const amenities = formData.get("amenities")
      ? JSON.parse(formData.get("amenities") as string)
      : [];

    // Step 1: Create property
    const property = await prisma.property.create({
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

    // Step 2: Upload images to ImageKit + store in Prisma
    const uploadedImages = [];
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const uploadRes = await imagekit.upload({
        file: buffer,
        fileName: file.name,
        folder: "/properties",
      });

      const savedImage = await prisma.image.create({
        data: {
          url: uploadRes.url,
          propertyId: property.id,
        },
      });

      uploadedImages.push(savedImage);
    }

    return NextResponse.json({ property, images: uploadedImages });
  } catch (error) {
    console.error("Property creation error:", error);
    return NextResponse.json({ error: "Failed to create property" }, { status: 500 });
  }
}
