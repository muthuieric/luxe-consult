"use client";

import { useState, useEffect } from "react";
import { usePropertyComparison } from "@/hooks/usePropertyComparison";
import SearchFilters from "@/components/properties/SearchFilters";
import PropertiesGrid from "@/components/properties/PropertiesGrid";
import PropertyComparisonModal from "@/components/properties/PropertyComparisonModal";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all-locations");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedStatus, setSelectedStatus] = useState("all-status");
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [selectedBedrooms, setSelectedBedrooms] = useState("all-bedrooms");
  const [selectedBathrooms, setSelectedBathrooms] = useState("all-bathrooms");
  const [showFilters, setShowFilters] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  const { comparisonList } = usePropertyComparison();

  // Fetch properties from public folder
  useEffect(() => {
    fetch("/data/properties.json")
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((err) => console.error("Failed to load properties:", err));
  }, []);

  // Filter properties
  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
      selectedLocation === "all-locations" ||
      property.location.toLowerCase().includes(selectedLocation.toLowerCase());

    const matchesType =
      selectedType === "All Types" || property.type === selectedType;

    const matchesStatus =
      selectedStatus === "all-status" || property.status === selectedStatus;

    const matchesBedrooms =
      selectedBedrooms === "all-bedrooms" ||
      property.bedrooms.toString() === selectedBedrooms;

    const matchesBathrooms =
      selectedBathrooms === "all-bathrooms" ||
      property.bathrooms.toString() === selectedBathrooms;

    const priceValue = parseInt(property.price.replace(/[^\d]/g, ""));
    const matchesPrice =
      priceValue >= priceRange[0] && priceValue <= priceRange[1];

    return (
      matchesSearch &&
      matchesLocation &&
      matchesType &&
      matchesStatus &&
      matchesBedrooms &&
      matchesBathrooms &&
      matchesPrice
    );
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedLocation("all-locations");
    setSelectedType("All Types");
    setSelectedStatus("all-status");
    setSelectedBedrooms("all-bedrooms");
    setSelectedBathrooms("all-bathrooms");
    setPriceRange([0, 50000000]);
  };

  if (!properties.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-primary-foreground">Loading properties...</p>
      </div>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Properties
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties in Nairobi's most sought-after locations.
          </p>
        </div>

        {/* Filters */}
        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          selectedBedrooms={selectedBedrooms}
          setSelectedBedrooms={setSelectedBedrooms}
          selectedBathrooms={selectedBathrooms}
          setSelectedBathrooms={setSelectedBathrooms}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          clearFilters={clearFilters}
        />

        {/* Properties Grid (Pagination Disabled) */}
        <PropertiesGrid
          filteredProperties={filteredProperties.slice(0, 6)}
          comparisonList={comparisonList}
          setShowComparison={setShowComparison}
          clearFilters={clearFilters}
          disablePagination={true}
        />

        {/* Comparison Modal */}
        <PropertyComparisonModal
          isOpen={showComparison}
          onClose={() => setShowComparison(false)}
        />

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/properties">
            <Button
              variant="outline"
              size="lg"
              className="border-[hsl(var(--luxury-gold))] text-[hsl(var(--luxury-gold))] hover:bg-[hsl(var(--luxury-gold))] hover:text-black transition-colors duration-300"
            >
              View All Properties
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
