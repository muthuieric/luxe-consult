"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Share2,
  Mail,
  MessageCircle,
  Car,
  Wifi,
  Dumbbell,
  ShieldCheck,
  Waves,
  Trees,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { mockProperties } from "@/data/properties";

const PropertyDetails = () => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const propertyId = Array.isArray(params.id) ? params.id[0] : params.id;
  const property = mockProperties.find((p) => p.id === propertyId);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Property Not Found
          </h1>
          <p className="text-muted-foreground">
            The property you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  // ✅ Images
  const galleryImages = [
    property.image,
    "/property1.jpg",
    "/property2.jpg",
    "/property3.jpg",
  ];

  const amenities = [
    { icon: Car, label: "Parking" },
    { icon: Wifi, label: "High Speed Internet" },
    { icon: Dumbbell, label: "Gym" },
    { icon: ShieldCheck, label: "24/7 Security" },
    { icon: Waves, label: "Swimming Pool" },
    { icon: Trees, label: "Garden" },
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this ${property.type} in ${property.location}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Property link copied to clipboard!",
      });
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  // ✅ Swipe support (mobile)
  let touchStartX = 0;
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 50) nextImage();
    if (touchEndX - touchStartX > 50) prevImage();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ✅ Image Gallery */}
      <section
        className="relative w-full h-[320px] sm:h-[420px] md:h-[550px] bg-black"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Main Image */}
        <div className="relative w-full h-full">
          <Image
            src={galleryImages[currentImageIndex]}
            alt={`${property.title} - image ${currentImageIndex + 1}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs sm:text-sm px-3 py-1 rounded-full">
          {currentImageIndex + 1} / {galleryImages.length}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-black/80 transition"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-black/80 transition"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Thumbnails (desktop only) */}
        <div className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 gap-2 bg-black/30 px-3 py-2 rounded-lg">
          {galleryImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative w-16 h-12 rounded overflow-hidden border-2 ${
                index === currentImageIndex
                  ? "border-luxury-gold"
                  : "border-transparent"
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {/* Status Badge */}
        <Badge
          className={`absolute top-4 left-4 ${
            property.status === "For Sale"
              ? "bg-success text-success-foreground"
              : "bg-luxury-gold text-primary"
          }`}
        >
          {property.status}
        </Badge>

        {/* Actions */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className={`p-2 bg-background/80 backdrop-blur-sm hover:bg-background/90 ${
              isLiked ? "text-destructive" : "text-foreground"
            }`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 bg-background/80 backdrop-blur-sm hover:bg-background/90 text-foreground"
            onClick={handleShare}
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* ✅ Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl font-bold text-luxury-gold">
                  {property.price}
                </div>
                <Badge variant="outline">{property.type}</Badge>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                {property.title}
              </h1>
              <div className="flex items-center space-x-2 text-muted-foreground mb-6">
                <MapPin className="w-5 h-5" />
                <span>{property.location}</span>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center space-x-8 text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Bed className="w-5 h-5" />
                  <span>{property.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bath className="w-5 h-5" />
                  <span>{property.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Square className="w-5 h-5" />
                  <span>{property.area}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Description
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  This exceptional {property.type.toLowerCase()} represents the
                  pinnacle of luxury living in {property.location}. Meticulously
                  designed with the finest materials and attention to detail.
                </p>
                <p>
                  The spacious {property.bedrooms}-bedroom layout maximizes
                  natural light and creates a seamless flow between indoor and
                  outdoor living spaces. Premium finishes throughout include
                  marble countertops, hardwood flooring, and high-end fixtures.
                </p>
                <p>
                  Located in the heart of {property.location}, residents enjoy
                  easy access to shopping, dining, schools, and business
                  districts, while maintaining privacy and security.
                </p>
              </div>
            </div>

            <Separator />

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-secondary rounded-lg"
                  >
                    <div className="w-8 h-8 bg-gradient-luxury rounded-full flex items-center justify-center">
                      <amenity.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm text-foreground">
                      {amenity.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-luxury sticky top-24">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-luxury rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">LC</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Luxe Consult Team
                  </h3>
                  <p className="text-muted-foreground">Property Agent</p>
                </div>

                <div className="space-y-4">
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push("/contact")}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Schedule Viewing
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      window.open("https://wa.me/254700123456", "_blank")
                    }
                  >
                    <FaWhatsapp className="w-4 h-4 mr-2 text-green-500" />
                    WhatsApp
                  </Button>

                
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Quick Facts</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Property ID:</span>
                      <span className="text-foreground font-medium">
                        LC-{property.id}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="text-foreground font-medium">
                        {property.type}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="text-foreground font-medium">
                        {property.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Area:</span>
                      <span className="text-foreground font-medium">
                        {property.area}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
