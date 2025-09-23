"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { SlidersHorizontal } from "lucide-react";
import { locations, propertyTypes } from "@/public/data/properties";

const SearchFilters = ({
  searchTerm,
  setSearchTerm,
  selectedLocation,
  setSelectedLocation,
  selectedType,
  setSelectedType,
  selectedStatus,
  setSelectedStatus,
  selectedBedrooms,
  setSelectedBedrooms,
  selectedBathrooms,
  setSelectedBathrooms,
  priceRange,
  setPriceRange,
  showFilters,
  setShowFilters,
  clearFilters,
}: any) => {
  return (
    <section className="container mx-auto px-4 -mt-10 relative z-10">
      <Card className="bg-background shadow-lg rounded-2xl">
        <CardContent className="p-4 md:p-6">
          <div className="space-y-4">
            {/* Search + main filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <Input
                placeholder="Search properties, locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 sm:col-span-2"
              />

              <Select
                value={selectedLocation}
                onValueChange={setSelectedLocation}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-locations">All Locations</SelectItem>
                  {locations.map((location) => (
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
                  {propertyTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                className="h-12 bg-gradient-luxury hover:opacity-90 hover:cursor-pointer"
                style={{ background: "var(--gradient-luxury)" }}
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                {/* <span className="hidden sm:inline">Filters</span> */}
                <span className="inline">More Filters</span>

              </Button>
            </div>

                    {/* Advanced Filters */}
            {showFilters && (
            <div className="pt-6 border-t border-border space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Status */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-foreground">Status</label>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all-status">All Status</SelectItem>
                        <SelectItem value="For Sale">For Sale</SelectItem>
                        <SelectItem value="For Rent">For Rent</SelectItem>
                    </SelectContent>
                    </Select>
                </div>

                {/* Bedrooms */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-foreground">Bedrooms</label>
                    <Select value={selectedBedrooms} onValueChange={setSelectedBedrooms}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Bedrooms" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all-bedrooms">Any</SelectItem>
                        {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                            {num}+
                        </SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                </div>

                {/* Bathrooms */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-foreground">Bathrooms</label>
                    <Select value={selectedBathrooms} onValueChange={setSelectedBathrooms}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Bathrooms" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all-bathrooms">Any</SelectItem>
                        {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                            {num}+
                        </SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                </div>

                </div>
            


                <div>
                  <label className="text-sm font-medium block mb-2">
                    Price Range: KSH {priceRange[0].toLocaleString()} -{" "}
                    {priceRange[1].toLocaleString()}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={50000000}
                    step={1000000}
                    className="w-full"
                  />
                </div>

                <div className="flex justify-end ">
                  <Button 
                    variant="outline" 
                    className="hover:cursor-pointer"
                    onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default SearchFilters;
