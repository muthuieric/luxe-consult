"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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

  return (
    <div className="space-y-4">
      {propsList.map((prop) => (
        <div key={prop.id} className="bg-white shadow rounded-lg overflow-hidden border md:flex md:items-center md:justify-between">
          {/* Images */}
          <div className="flex gap-2 p-2 overflow-x-auto md:flex-wrap md:w-64">
            {prop.images.slice(0, 3).map((url, i) => (
              <div key={i} className="relative w-20 h-20 rounded overflow-hidden border flex-shrink-0">
                <Image src={url} alt={prop.title} fill className="object-cover" />
              </div>
            ))}
          </div>

          {/* Details */}
          <div className="p-4 flex-1">
            <h2 className="font-bold text-lg">{prop.title}</h2>
            <p className="text-sm text-gray-600">{prop.location}</p>
            <p className="text-sm text-gray-600">Type: {prop.type}</p>
            <p className="text-sm text-gray-600">Status: {prop.status}</p>
            <p className="text-sm text-gray-600">
              Price: Ksh {prop.price} | Bedrooms: {prop.bedrooms} | Bathrooms: {prop.bathrooms} | Area: {prop.area ?? "-"} sqft
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
      ))}
    </div>
  );
}
