// app/api/upload/route.ts
import { NextResponse } from "next/server";
import ImageKit from "imagekit";
import prisma from "@/lib/prisma";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!, // only on server
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const propertyId = Number(formData.get("propertyId"));

    if (!files.length || !propertyId) {
      return NextResponse.json(
        { error: "Files or propertyId missing" },
        { status: 400 }
      );
    }

    const uploadedImages = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const uploadRes = await imagekit.upload({
        file: buffer,
        fileName: file.name,
        folder: "/properties",
      });

      // Save each image in Prisma
      const savedImage = await prisma.image.create({
        data: {
          url: uploadRes.url,
          propertyId,
        },
      });

      uploadedImages.push(savedImage);
    }

    return NextResponse.json({ images: uploadedImages });
  } catch (error) {
    console.error("Image upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
