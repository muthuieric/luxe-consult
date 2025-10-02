"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import SearchFilters from "@/components/properties/SearchFilters";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  type: string;
  status: string;
  bedrooms: number;
  bathrooms: number;
  area?: number;
  images: string[];
}

interface AdminPropertiesTableProps {
  properties: Property[];
}

export default function AdminPropertiesTable({ properties }: AdminPropertiesTableProps) {
  const [propsList, setPropsList] = useState(properties);

  // ✅ Filter + sort states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all-locations");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedStatus, setSelectedStatus] = useState("all-status");
  const [selectedBedrooms, setSelectedBedrooms] = useState("all-bedrooms");
  const [selectedBathrooms, setSelectedBathrooms] = useState("all-bathrooms");
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("newest"); // 👈 sorting state

  // ✅ Delete handler
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this property?")) return;

    try {
      const res = await fetch(`/api/delete/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPropsList((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert("Failed to delete property");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting property");
    }
  };

  // ✅ Apply filters
  const filteredProperties = propsList
    .filter((property) => {
      const matchesSearch =
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.id.toString().includes(searchTerm);

      const matchesLocation =
        selectedLocation === "all-locations" ||
        property.location.toLowerCase() === selectedLocation.toLowerCase();

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

      const matchesPrice =
        property.price >= priceRange[0] && property.price <= priceRange[1];

      return (
        matchesSearch &&
        matchesLocation &&
        matchesType &&
        matchesStatus &&
        matchesBedrooms &&
        matchesBathrooms &&
        matchesPrice
      );
    })
    // ✅ Apply sorting
    .sort((a, b) => {
      if (sortBy === "newest") return b.id - a.id;
      if (sortBy === "oldest") return a.id - b.id;
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });

  // ✅ Clear filters
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
    <div className="space-y-6">
      {/* 🔹 Filters + Sorting (compact row) */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
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
        </div>

        {/* Sorting dropdown */}
        <div className="w-full lg:w-48">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 🔹 Properties List */}
      {filteredProperties.length === 0 ? (
        <p className="text-gray-500">No properties match your filters.</p>
      ) : (
        filteredProperties.map((prop) => (
          <div
            key={prop.id}
            className="bg-white shadow rounded-lg overflow-hidden border md:flex md:items-center md:justify-between"
          >
            {/* Images */}
            <div className="flex gap-2 p-2 overflow-x-auto md:flex-wrap md:w-64">
              {prop.images.slice(0, 10).map((url, i) => (
                <div
                  key={i}
                  className="relative w-20 h-20 rounded overflow-hidden border flex-shrink-0"
                >
                  <Image
                    src={url}
                    alt={prop.title}
                    fill
                    className="object-cover"
                
                  />
                </div>
              ))}
            </div>

            {/* Details */}
            <div className="p-4 flex-1">
              <h2 className="font-bold text-lg">{prop.title}</h2>
              <p className="text-sm text-gray-600">ID: {prop.id}</p>
              <p className="text-sm text-gray-600">{prop.location}</p>
              <p className="text-sm text-gray-600">Type: {prop.type}</p>
              <p className="text-sm text-gray-600">Status: {prop.status}</p>
              <p className="text-sm text-gray-600">
                Price: Ksh {prop.price} | Bedrooms: {prop.bedrooms} | Bathrooms:{" "}
                {prop.bathrooms} | Area: {prop.area ?? "-"} sqft
              </p>
            </div>

            {/* Actions */}
            <div className="p-4 flex md:flex-col gap-2 md:gap-2 items-center md:items-start">
              <Button
                className="bg-red-500 hover:bg-red-600 text-white w-full md:w-auto"
                onClick={() => handleDelete(prop.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
