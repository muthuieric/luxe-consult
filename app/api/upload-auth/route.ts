
import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {
  try {
    // Generate upload credentials
    const { token, expire, signature } = getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
    });

    // Return them as JSON
    return Response.json({
      token,
      expire,
      signature,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
    });
  } catch (err) {
    console.error("Auth route error:", err);
    return new Response("Failed to generate upload params", { status: 500 });
  }
}


