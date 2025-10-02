// app/api/properties/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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
        maxWait: 10000, // Wait up to 10 seconds to start transaction
        timeout: 15000, // Transaction timeout of 15 seconds
      }
    );

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
// // app/api/properties/route.ts
// import { NextResponse } from "next/server";
// import ImageKit from "imagekit";
// import prisma from "@/lib/prisma";

// const imagekit = new ImageKit({
//   publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
//   privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
//   urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
// });

// export async function POST(req: Request) {
//   try {
//     const formData = await req.formData();

//     const files = formData.getAll("files") as File[];
//     const title = formData.get("title") as string;
//     const location = formData.get("location") as string;
//     const price = Number(formData.get("price"));
//     const type = formData.get("type") as string;
//     const status = formData.get("status") as string;
//     const bedrooms = Number(formData.get("bedrooms"));
//     const bathrooms = Number(formData.get("bathrooms"));
//     const area = formData.get("area") ? Number(formData.get("area")) : null;
//     const description = formData.get("description") as string | null;
//     const amenities = formData.get("amenities")
//       ? JSON.parse(formData.get("amenities") as string)
//       : [];

//     // Step 1: Create property
//     const property = await prisma.property.create({
//       data: {
//         title,
//         location,
//         price,
//         type,
//         status,
//         bedrooms,
//         bathrooms,
//         area,
//         description,
//         amenities,
//       },
//     });

//     // Step 2: Upload images to ImageKit + store in Prisma
//     const uploadedImages = [];
//     for (const file of files) {
//       const buffer = Buffer.from(await file.arrayBuffer());

//       const uploadRes = await imagekit.upload({
//         file: buffer,
//         fileName: file.name,
//         folder: "/properties",
//       });

//       const savedImage = await prisma.image.create({
//         data: {
//           url: uploadRes.url,
//           propertyId: property.id,
//         },
//       });

//       uploadedImages.push(savedImage);
//     }

//     return NextResponse.json({ property, images: uploadedImages });
//   } catch (error) {
//     console.error("Property creation error:", error);
//     return NextResponse.json({ error: "Failed to create property" }, { status: 500 });
//   }
// }
