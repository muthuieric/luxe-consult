"use client";

import { useState } from "react";
import properties from "@/data/properties.json"; // ✅ Import JSON instead of mockProperties
import { usePropertyComparison } from "@/hooks/usePropertyComparison";
import SearchFilters from "@/components/properties/SearchFilters";
import PropertiesGrid from "@/components/properties/PropertiesGrid";
import PropertyComparisonModal from "@/components/properties/PropertyComparisonModal";

const PropertiesPage = () => {
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

  // ✅ Filter properties from JSON
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

  return (
    <div className="min-h-screen bg-background">
      {/* ✅ Hero Section */}
      <section className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">
            Find Your Perfect Property
          </h1>
          <p className="text-base md:text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Browse our curated collection of premium properties in Nairobi’s most
            desirable locations.
          </p>
        </div>
      </section>

      {/* ✅ Filters */}
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

      {/* ✅ Properties Grid */}
      <PropertiesGrid
        filteredProperties={filteredProperties}
        comparisonList={comparisonList}
        setShowComparison={setShowComparison}
        clearFilters={clearFilters}
      />

      {/* ✅ Comparison Modal */}
      <PropertyComparisonModal
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
      />
    </div>
  );
};

export default PropertiesPage;
