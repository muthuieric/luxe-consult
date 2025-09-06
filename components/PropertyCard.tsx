"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bed, Bath, Square, Heart, Share2, GitCompare } from "lucide-react";
import { useState } from "react";
import { usePropertyComparison } from "@/hooks/usePropertyComparison";

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  type: string;
  status: "For Sale" | "For Rent";
  bedrooms: number;
  bathrooms: number;
  area: string;
  images: string[]; // ✅ multiple images
  featured?: boolean;
}

interface PropertyCardProps {
  property: Property;
  href?: string;
  showCompare?: boolean;
}

const PropertyCard = ({ property, href, showCompare = true }: PropertyCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const { addToComparison, removeFromComparison, isInComparison } = usePropertyComparison();

  const firstImage = property.images?.[0] ?? "/fallback.jpg"; // ✅ fallback if missing

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this ${property.type} in ${property.location}`,
        url: href || window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}${href || `/property/${property.id}`}`);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInComparison(property.id)) {
      removeFromComparison(property.id);
    } else {
      addToComparison(property);
    }
  };

  const CardContentWrapper = (
    <Card className="group overflow-hidden shadow-card hover:shadow-luxury transition cursor-pointer">
      {/* IMAGE */}
      <div className="relative">
        <Image
          src={firstImage}
          alt={property.title}
          width={400}
          height={256}
          className="w-full h-64 object-cover group-hover:scale-105 transition"
        />
        <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-100 transition" />

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

        {/* Featured Badge */}
        {property.featured && (
          <Badge className="absolute top-4 right-14 bg-luxury-gold text-primary">
            Featured
          </Badge>
        )}

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <Button
            variant="ghost"
            size="sm"
            className={`p-2 bg-background/80 backdrop-blur-sm hover:bg-background/90 ${
              isLiked ? "text-destructive" : "text-foreground"
            }`}
            onClick={handleLike}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 bg-background/80 backdrop-blur-sm hover:bg-background/90 text-foreground"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4" />
          </Button>
          {showCompare && (
            <Button
              variant="ghost"
              size="sm"
              className={`p-2 bg-background/80 backdrop-blur-sm hover:bg-background/90 ${
                isInComparison(property.id) ? "text-luxury-gold" : "text-foreground"
              }`}
              onClick={handleCompare}
            >
              <GitCompare className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="text-2xl font-bold text-luxury-gold">{property.price}</div>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition">
            {property.title}
          </h3>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{property.location}</span>
          </div>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Bed className="w-4 h-4" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Bath className="w-4 h-4" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Square className="w-4 h-4" />
              <span>{property.area}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">{property.type}</Badge>
            <Button
              variant="outline"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-primary"
            >
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return href ? <Link href={href} className="block">{CardContentWrapper}</Link> : CardContentWrapper;
};

export default PropertyCard;
export type { Property };
