"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
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
  Phone,
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
import { mockProperties } from "@/data/properties";

const PropertyDetails = () => {
  const params = useParams();
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // ✅ Handle dynamic route param
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

  // ✅ Images from /public (not /src/assets)
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

  const handleContactAgent = () => {
    toast({
      title: "Contact Request Sent",
      description: "Our agent will contact you within 24 hours.",
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ✅ Image Gallery */}
      <section className="relative h-96 md:h-[500px]">
        <img
          src={galleryImages[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-overlay" />

        {/* Navigation */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 p-2 rounded-full transition-luxury"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 p-2 rounded-full transition-luxury"
        >
          <ChevronRight className="w-6 h-6 text-foreground" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-luxury ${
                index === currentImageIndex
                  ? "bg-luxury-gold"
                  : "bg-background/50"
              }`}
            />
          ))}
        </div>

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

        {/* Status */}
        <Badge
          className={`absolute top-4 left-4 ${
            property.status === "For Sale"
              ? "bg-success text-success-foreground"
              : "bg-luxury-gold text-primary"
          }`}
        >
          {property.status}
        </Badge>
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
                  designed with the finest materials and attention to detail,
                  this property offers an unparalleled lifestyle experience in
                  one of Nairobi&apos;s most prestigious neighborhoods.
                </p>
                <p>
                  The spacious {property.bedrooms}-bedroom layout maximizes
                  natural light and creates a seamless flow between indoor and
                  outdoor living spaces. Premium finishes throughout include
                  marble countertops, hardwood flooring, and high-end fixtures
                  that exemplify modern luxury.
                </p>
                <p>
                  Located in the heart of {property.location}, residents enjoy
                  easy access to premium shopping, fine dining, international
                  schools, and business districts, while maintaining the
                  tranquility and security of an exclusive residential
                  community.
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

            <Separator />

            {/* Location */}
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Location
              </h2>
              <Card className="shadow-card overflow-hidden">
                <div className="bg-muted h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-luxury-gold mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Interactive Map
                    </h3>
                    <p className="text-muted-foreground">{property.location}</p>
                  </div>
                </div>
              </Card>
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
                    Property Agent
                  </h3>
                  <p className="text-muted-foreground">Luxe Consult Team</p>
                </div>

                <div className="space-y-4">
                  <Button
                    className="w-full bg-gradient-luxury hover:opacity-90"
                    onClick={handleContactAgent}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Agent
                  </Button>

                  <Button variant="outline" className="w-full">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      window.open("https://wa.me/254700123456", "_blank")
                    }
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
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

                <Separator className="my-6" />

                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-4">
                    Schedule a viewing or request more information
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Schedule Viewing
                  </Button>
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
