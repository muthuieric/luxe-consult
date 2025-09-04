"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Share2,
  GitCompare,
} from "lucide-react";
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
  image: string;
  featured?: boolean;
}

interface PropertyCardProps {
  property: Property;
  href?: string;
  showCompare?: boolean;
}

const PropertyCard = ({ property, href, showCompare = true }: PropertyCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const { addToComparison, removeFromComparison, isInComparison } =
    usePropertyComparison();

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
      navigator.clipboard.writeText(
        `${window.location.origin}${href || `/property/${property.id}`}`
      );
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
    <Card className="group overflow-hidden shadow-card hover:shadow-luxury transition-luxury cursor-pointer rounded-xl">
      {/* IMAGE & ACTIONS */}
      <div className="relative">
        <Image
          src={property.image}
          alt={property.title}
          width={400}
          height={256}
          className="w-full h-48 sm:h-64 object-cover group-hover:scale-105 transition-luxury"
        />
        <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-100 transition-luxury" />

        {/* Status Badge */}
        <Badge
          className={`absolute top-3 left-3 text-xs px-2 py-0.5 ${
            property.status === "For Sale"
              ? "bg-success text-success-foreground"
              : "bg-luxury-gold text-primary"
          }`}
        >
          {property.status}
        </Badge>

        {/* Featured Badge */}
        {property.featured && (
          <Badge className="absolute top-3 right-16 bg-luxury-gold text-primary text-xs px-2 py-0.5">
            Featured
          </Badge>
        )}

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          <Button
            variant="ghost"
            size="sm"
            className={`p-2 bg-background/80 backdrop-blur-sm hover:bg-background/90 rounded-full ${
              isLiked ? "text-destructive" : "text-foreground"
            }`}
            onClick={handleLike}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 bg-background/80 backdrop-blur-sm hover:bg-background/90 rounded-full text-foreground"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4" />
          </Button>
          {showCompare && (
            <Button
              variant="ghost"
              size="sm"
              className={`p-2 bg-background/80 backdrop-blur-sm hover:bg-background/90 rounded-full ${
                isInComparison(property.id)
                  ? "text-luxury-gold"
                  : "text-foreground"
              }`}
              onClick={handleCompare}
            >
              <GitCompare className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* CARD CONTENT */}
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          <div className="text-lg sm:text-2xl font-bold text-luxury-gold">
            {property.price}
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-luxury line-clamp-2">
            {property.title}
          </h3>
          <div className="flex items-center space-x-2 text-muted-foreground text-xs sm:text-sm">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>
          <div className="flex items-center space-x-4 text-xs sm:text-sm text-muted-foreground">
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
            <Badge variant="outline" className="text-[10px] sm:text-xs">
              {property.type}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-primary opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-luxury"
            >
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return href ? (
    <Link href={href} className="block">
      {CardContentWrapper}
    </Link>
  ) : (
    CardContentWrapper
  );
};

export default PropertyCard;
export type { Property };
