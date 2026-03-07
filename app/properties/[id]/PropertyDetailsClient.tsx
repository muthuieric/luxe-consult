"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Heart, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  type: string;
  status: string;
  bedrooms: number;
  bathrooms: number;
  area?: string;
  description?: string;
  amenities: string[];
  images: string[];
}

interface PropertyDetailsClientProps {
  property: Property;
}

const PropertyDetailsClient = ({ property }: PropertyDetailsClientProps) => {
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Filter out empty image URLs and provide a fallback
  const images: string[] =
    Array.isArray(property.images) && property.images.length > 0
      ? property.images.filter((url) => url && url.trim() !== "")
      : ["/placeholder.png"]; // fallback image

  // Image navigation
  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  // Share functionality
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this ${property.type} in ${property.location}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link Copied", description: "Property link copied!" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Gallery */}
      <section className="container mx-auto px-4 pt-24 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
    
            {/* Main Image */}
          <div className="relative col-span-1 lg:col-span-3 h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-lg">
            {images[currentImageIndex] ? (
              <Image
                src={images[currentImageIndex]}
                alt={property.title || "Property Image"}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                quality={100}

              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}


            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none" />

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 bg-background/80 p-2 rounded-full shadow-md hover:bg-background transition"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 bg-background/80 p-2 rounded-full shadow-md hover:bg-background transition"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Status Badge */}
            <Badge
              className={`absolute top-4 left-4 text-xs md:text-sm px-2 md:px-3 py-1 rounded-full shadow-md ${
                property.status === "For Sale"
                  ? "bg-success text-success-foreground"
                  : "bg-luxury-gold text-primary"
              }`}
            >
              {property.status}
            </Badge>
          </div>

                  {/* Thumbnails */}
          <div className="lg:col-span-1 h-[100px] md:h-[400px] lg:h-[500px] overflow-x-auto lg:overflow-y-auto flex lg:flex-col space-x-3 lg:space-x-0 lg:space-y-3 custom-scrollbar">
            {images
              .filter((img) => img && img.trim() !== "") // remove empty or invalid URLs
              .map((img, i) => (
                <div
                  key={i}
                  className={`relative flex-shrink-0 w-32 h-20 md:w-full md:h-28 lg:h-32 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                    i === currentImageIndex
                      ? "border-luxury-gold scale-105 shadow-md"
                      : "border-transparent hover:scale-105 hover:shadow"
                  }`}
                  onClick={() => setCurrentImageIndex(i)}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                    quality={100}
                  />
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Property Info */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div className="text-2xl md:text-3xl font-bold text-luxury-gold">
                  {/* Ksh {property.price} */}
                  Ksh {Number(property.price).toLocaleString("en-KE")}
                </div>
                <Badge variant="outline" className="text-sm md:text-base">
                  {property.type}
                </Badge>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {property.title}
              </h1>
              <div className="flex items-center text-muted-foreground text-sm md:text-base">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                {property.location}, Nairobi
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-4">
                Description
              </h2>
              {/* <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {property.description}
              </p> */}
             
             <div className="mt-6 border-t pt-6">
  <h3 className="text-xl font-bold mb-4">Description</h3>
  {/* 1. 'ql-snow' and 'ql-editor' restore the editor's intended arrangement.
      2. 'prose-custom' (below) forces the vertical gaps you see in the editor.
  */}
 <div 
  className="prose max-w-none text-gray-800 
    /* 1. CRITICAL FOR MOBILE WRAPPING */
    break-words overflow-hidden whitespace-normal
    /* 2. SPACING AND ARRANGEMENT */
    [&_p]:mb-4 [&_p]:leading-relaxed 
    [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4
    [&_li]:mb-2 [&_li]:break-words
    /* 3. FONT SIZE SCALING */
    text-[15px] md:text-base"
  dangerouslySetInnerHTML={{ __html: property.description }} 
/>
</div>
</div>


            <Separator />

            {/* Amenities */}
            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-4">
                Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities.map((amenity, i) => (
                  <div
                    key={i}
                    className="p-2 bg-secondary rounded-md text-xs md:text-sm text-foreground"
                  >
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`${isLiked ? "text-destructive" : ""}`}
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart className={isLiked ? "fill-current" : ""} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleShare}>
                    <Share2 />
                  </Button>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => (window.location.href = "/contact")}
                >
                  Schedule Viewing
                </Button>
               <Button
                      variant="outline"
                      className="w-full" // 'flex' and 'items-center' are already built into the Button component
                      asChild
                    >
                      <a 
                        href="https://wa.me/254768096084" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <FaWhatsapp className="mr-2" /> WhatsApp
                      </a>
                 </Button>
                {/* <Button
                  variant="outline"
                  className="w-full flex items-center justify-center"
                  onClick={() =>
                    window.open("https://wa.me/254768096084", "_blank")
                  }
                >
                  <FaWhatsapp className="mr-2" /> WhatsApp
                </Button> */}

                <Separator />

                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>ID:</span>
                    <span>LC-{property.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span>{property.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price:</span>
                    <span>Ksh {Number(property.price).toLocaleString("en-KE")} </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bedrooms:</span>
                    <span>{property.bedrooms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bathrooms:</span>
                    <span>{property.bathrooms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Property Type:</span>
                    <span>{property.type}</span>
                  </div>
                  {/* <div className="flex justify-between">
                    <span>Area:</span>
                    <span>{property.area}sqft</span>
                  </div> */}
                   {/* <div className="flex justify-between">
                    <span>Title:</span>
                    <span>{property.title}</span>
                  </div> */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsClient;
