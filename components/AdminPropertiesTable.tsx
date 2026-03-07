"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import SearchFilters from "@/components/properties/SearchFilters";
import PropertyForm from "@/components/PropertyForm"; 
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Edit Modal State
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Filter + sort states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all-locations");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedStatus, setSelectedStatus] = useState("all-status");
  const [selectedBedrooms, setSelectedBedrooms] = useState("all-bedrooms");
  const [selectedBathrooms, setSelectedBathrooms] = useState("all-bathrooms");
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  // Delete Handler
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this property?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/properties?id=${id}`, { 
        method: "DELETE" 
      });
      
      const data = await res.json();

      if (res.ok) {
        setPropsList((prev) => prev.filter((p) => p.id !== id));
        alert("Property deleted successfully!");
      } else {
        alert(`Failed to delete property: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting property. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  // Apply filters
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
    .sort((a, b) => {
      if (sortBy === "newest") return b.id - a.id;
      if (sortBy === "oldest") return a.id - b.id;
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });

  // Clear filters
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
      {/* Filters + Sorting */}
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

      {/* Properties List */}
      {filteredProperties.length === 0 ? (
        <p className="text-gray-500">No properties match your filters.</p>
      ) : (
        filteredProperties.map((prop) => (
          <div
            key={prop.id}
            className="bg-white shadow rounded-lg overflow-hidden border md:flex md:items-center md:justify-between p-4"
          >
            {/* Images - Horizontal Scroll */}
            <div className="flex gap-2 overflow-x-auto w-full md:w-64 pb-2 md:pb-0 mb-4 md:mb-0 scrollbar-hide">
              {prop.images.slice(0, 10).map((imageObj: any, i: number) => {
                // Handle image object or string
                const url = typeof imageObj === 'string' ? imageObj : imageObj.url;
                return (
                  <div
                    key={i}
                    className="relative w-20 h-20 rounded-md overflow-hidden border flex-shrink-0"
                  >
                    <Image
                      src={url}
                      alt={prop.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                );
              })}
            </div>

            {/* Details */}
            <div className="flex-1 md:px-6 space-y-1">
              <h2 className="font-bold text-lg">{prop.title}</h2>
              <div className="text-sm text-gray-500 flex flex-wrap gap-x-4 gap-y-1">
                <span>ID: {prop.id}</span>
                <span>{prop.location}</span>
                <span className="font-medium text-black">{prop.status}</span>
                <span>{prop.type}</span>
              </div>
              <p className="text-sm font-semibold mt-1">
                Ksh {prop.price.toLocaleString()} 
                <span className="font-normal text-gray-500 ml-2">
                  {prop.bedrooms} Bed | {prop.bathrooms} Bath | {prop.area ?? "-"} sqft
                </span>
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 w-full md:w-32 mt-4 md:mt-0">
              
              {/* EDIT DIALOG */}
              <Dialog 
                open={isEditOpen && editingProperty?.id === prop.id} 
                onOpenChange={(open) => {
                  setIsEditOpen(open);
                  if (!open) setEditingProperty(null);
                }}
              >
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full hover:bg-gray-100"
                    onClick={() => {
                      setEditingProperty(prop);
                      setIsEditOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                </DialogTrigger>
                
                <DialogContent className="max-w-5xl h-[90vh] md:h-[85vh] overflow-y-auto w-[98%] p-4 md:p-6">
                  {/* Pass the property data to the form */}
                  <PropertyForm 
                    initialData={editingProperty} 
                    onSuccess={() => {
                      setIsEditOpen(false);
                      setEditingProperty(null);
                      // Trigger a manual refresh of the list if needed or rely on router.refresh() inside form
                      setPropsList(prev => prev.map(p => p.id === editingProperty?.id ? { ...p, ...editingProperty } : p)); 
                      window.location.reload(); // Hard reload to ensure data is fresh
                    }} 
                  />
                </DialogContent>
              </Dialog>

              <Button
                className="bg-red-500 hover:bg-red-600 text-white w-full"
                onClick={() => handleDelete(prop.id)}
                disabled={deletingId === prop.id}
              >
                {deletingId === prop.id ? "..." : "Delete"}
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}