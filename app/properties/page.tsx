"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import PropertyCard from '@/components/PropertyCard';
import PropertyComparison from '@/components/PropertyComparison';
import { usePropertyComparison } from '@/hooks/usePropertyComparison';
import { Search, Filter, SlidersHorizontal, GitCompare } from 'lucide-react';
import { mockProperties, locations, propertyTypes } from '@/data/properties';
import Link from 'next/link';

const PropertiesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all-locations');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedStatus, setSelectedStatus] = useState('all-status');
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [selectedBedrooms, setSelectedBedrooms] = useState('all-bedrooms');
  const [selectedBathrooms, setSelectedBathrooms] = useState('all-bathrooms');
  const [showFilters, setShowFilters] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  
  const { comparisonList } = usePropertyComparison();

  // Filter properties based on search criteria
  const filteredProperties = mockProperties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !selectedLocation || selectedLocation === 'all-locations' || property.location.includes(selectedLocation);
    const matchesType = !selectedType || selectedType === 'All Types' || property.type === selectedType;
    const matchesStatus = !selectedStatus || selectedStatus === 'all-status' || property.status === selectedStatus;
    const matchesBedrooms = selectedBedrooms === 'all-bedrooms' || property.bedrooms.toString() === selectedBedrooms;
    const matchesBathrooms = selectedBathrooms === 'all-bathrooms' || property.bathrooms.toString() === selectedBathrooms;
    
    // Simple price filtering (convert price strings to numbers for comparison)
    const priceValue = parseInt(property.price.replace(/[^\d]/g, ''));
    const matchesPrice = priceValue >= priceRange[0] && priceValue <= priceRange[1];
    
    return matchesSearch && matchesLocation && matchesType && matchesStatus && 
           matchesBedrooms && matchesBathrooms && matchesPrice;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLocation('all-locations');
    setSelectedType('All Types');
    setSelectedStatus('all-status');
    setSelectedBedrooms('all-bedrooms');
    setSelectedBathrooms('all-bathrooms');
    setPriceRange([0, 50000000]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Find Your Perfect Property
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Browse through our extensive collection of premium properties in Nairobi's most desirable locations.
            </p>
          </div>

          {/* Search and Filter Bar */}
          <Card className="bg-background shadow-luxury">
            <CardContent className="p-4 md:p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="sm:col-span-2 lg:col-span-2">
                    <Input
                      placeholder="Search properties, locations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="h-12"
                    />
                  </div>
                  
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-locations">All Locations</SelectItem>
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Property Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map(type => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button 
                    className="h-12 bg-gradient-luxury hover:opacity-90"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <SlidersHorizontal className="w-5 h-5 mr-2" />
                    <span className="hidden sm:inline">Filters</span>
                  </Button>
                </div>

                {/* Advanced Filters */}
                {showFilters && (
                  <div className="pt-6 border-t border-border space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Status
                        </label>
                        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                          <SelectTrigger>
                            <SelectValue placeholder="All Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all-status">All Status</SelectItem>
                            <SelectItem value="For Sale">For Sale</SelectItem>
                            <SelectItem value="For Rent">For Rent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Bedrooms
                        </label>
                        <Select value={selectedBedrooms} onValueChange={setSelectedBedrooms}>
                          <SelectTrigger>
                            <SelectValue placeholder="Any" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all-bedrooms">Any</SelectItem>
                            <SelectItem value="1">1+</SelectItem>
                            <SelectItem value="2">2+</SelectItem>
                            <SelectItem value="3">3+</SelectItem>
                            <SelectItem value="4">4+</SelectItem>
                            <SelectItem value="5">5+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Bathrooms
                        </label>
                        <Select value={selectedBathrooms} onValueChange={setSelectedBathrooms}>
                          <SelectTrigger>
                            <SelectValue placeholder="Any" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all-bathrooms">Any</SelectItem>
                            <SelectItem value="1">1+</SelectItem>
                            <SelectItem value="2">2+</SelectItem>
                            <SelectItem value="3">3+</SelectItem>
                            <SelectItem value="4">4+</SelectItem>
                            <SelectItem value="5">5+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Price Range: KSH {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()}
                        </label>
                        <Slider
                          value={priceRange}
                          onValueChange={setPriceRange}
                          max={50000000}
                          step={1000000}
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="outline" onClick={clearFilters}>
                        Clear Filters
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground">
              {filteredProperties.length} Properties Found
            </h2>
            <div className="flex items-center gap-4">
              {comparisonList.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => setShowComparison(true)}
                  className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-primary"
                >
                  <GitCompare className="w-4 h-4 mr-2" />
                  Compare ({comparisonList.length})
                  {comparisonList.length > 0 && (
                    <Badge className="ml-2 bg-luxury-gold text-primary">
                      {comparisonList.length}
                    </Badge>
                  )}
                </Button>
              )}
              <Select defaultValue="newest">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredProperties.map((property) => (
                <Link key={property.id} href={`/properties/${property.id}`}>
                  <PropertyCard property={property} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">No Properties Found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search criteria or filters to see more results.
              </p>
              <Button onClick={clearFilters} className="bg-gradient-luxury hover:opacity-90">
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Property Comparison Modal */}
      <PropertyComparison 
        isOpen={showComparison} 
        onClose={() => setShowComparison(false)} 
      />
    </div>
  );
};

export default PropertiesPage;