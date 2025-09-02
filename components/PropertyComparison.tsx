import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePropertyComparison } from '@/hooks/usePropertyComparison';
import { MapPin, Bed, Bath, Square, X } from 'lucide-react';

interface PropertyComparisonProps {
  isOpen: boolean;
  onClose: () => void;
}

const PropertyComparison = ({ isOpen, onClose }: PropertyComparisonProps) => {
  const { comparisonList, removeFromComparison, clearComparison } = usePropertyComparison();

  if (comparisonList.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Property Comparison</DialogTitle>
          </DialogHeader>
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-2xl font-semibold text-foreground mb-2">No Properties to Compare</h3>
            <p className="text-muted-foreground">
              Add properties to comparison by clicking the compare button on property cards.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Property Comparison ({comparisonList.length}/2)</DialogTitle>
            <Button variant="outline" onClick={clearComparison} size="sm">
              Clear All
            </Button>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {comparisonList.map((property) => (
            <Card key={property.id} className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 z-10 bg-background/80 backdrop-blur-sm"
                onClick={() => removeFromComparison(property.id)}
              >
                <X className="w-4 h-4" />
              </Button>

              <div className="relative">
                <Image
                  src={property.image} 
                  alt={property.title}
                  fill
                  className="w-full h-48 object-cover"
                />
                <Badge 
                  className={`absolute top-4 left-4 ${
                    property.status === 'For Sale' 
                      ? 'bg-success text-success-foreground' 
                      : 'bg-luxury-gold text-primary'
                  }`}
                >
                  {property.status}
                </Badge>
                {property.featured && (
                  <Badge className="absolute top-4 right-14 bg-luxury-gold text-primary">
                    Featured
                  </Badge>
                )}
              </div>

              <CardContent className="p-6 space-y-4">
                {/* Price */}
                <div className="text-2xl font-bold text-luxury-gold">
                  {property.price}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-foreground">
                  {property.title}
                </h3>

                {/* Location */}
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{property.location}</span>
                </div>

                {/* Comparison Details */}
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Property Type:</span>
                      <p className="font-medium">{property.type}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Status:</span>
                      <p className="font-medium">{property.status}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Bed className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{property.bedrooms} beds</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Bath className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{property.bathrooms} baths</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Square className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{property.area}</span>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-luxury hover:opacity-90"
                  onClick={() => window.open(`/property/${property.id}`, '_blank')}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}

          {/* Add placeholder for second property if only one selected */}
          {comparisonList.length === 1 && (
            <Card className="border-2 border-dashed border-muted-foreground/30">
              <CardContent className="flex items-center justify-center h-full min-h-[400px]">
                <div className="text-center">
                  <div className="text-4xl mb-4 text-muted-foreground">+</div>
                  <p className="text-muted-foreground">
                    Add another property to compare
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyComparison;