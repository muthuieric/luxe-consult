"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { locations, propertyTypes, amenitiesOptions } from "@/public/data/properties";
import { upload } from "@imagekit/next";

export default function PropertyForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [customAmenity, setCustomAmenity] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  // Authenticator for ImageKit
  const authenticator = async () => {
    try {
      const response = await fetch("/api/upload-auth");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }
      return await response.json();
    } catch (err) {
      console.error("Authentication error:", err);
      throw new Error("Authentication request failed");
    }
  };

  // Improved Parallel Upload Function
  const uploadImagesToImageKit = async (files: FileList): Promise<string[]> => {
    const fileArray = Array.from(files);
    const totalBytes = fileArray.reduce((acc, file) => acc + file.size, 0);
    let loadedBytes = 0;
    
    // Track individual file progress to prevent jumpy progress bars
    const fileProgress = new Map<string, number>();

    const updateGlobalProgress = (fileName: string, loaded: number) => {
      fileProgress.set(fileName, loaded);
      let totalLoaded = 0;
      fileProgress.forEach((val) => (totalLoaded += val));
      const percent = (totalLoaded / totalBytes) * 100;
      setUploadProgress(percent);
    };

    // Concurrency Helper: Run max 3 uploads at a time
    const CONCURRENCY_LIMIT = 3;
    const uploadedUrls: string[] = [];
    const errors: string[] = [];

    const uploadSingleFile = async (file: File) => {
      try {
        // Get fresh auth token for THIS specific file
        const authParams = await authenticator();
        
        const response = await upload({
          file,
          fileName: `${Date.now()}_${file.name}`,
          folder: "/properties",
          expire: authParams.expire,
          token: authParams.token,
          signature: authParams.signature,
          publicKey: authParams.publicKey,
          urlEndpoint: authParams.urlEndpoint,
          onProgress: (event) => {
             updateGlobalProgress(file.name, event.loaded);
          },
        });
        
        return response.url;
      } catch (err) {
        console.error(`Failed to upload ${file.name}`, err);
        errors.push(file.name);
        return null;
      }
    };

    // Execute uploads in batches
    const results = [];
    const executing: Promise<any>[] = [];

    for (const file of fileArray) {
      const p = uploadSingleFile(file);
      results.push(p);

      // Add to executing array
      const e: any = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);

      // If limit reached, wait for one to finish
      if (executing.length >= CONCURRENCY_LIMIT) {
        await Promise.race(executing);
      }
    }

    // Wait for all remaining
    const allResponses = await Promise.all(results);
    
    // Filter out failed uploads (nulls)
    const successfulUrls = allResponses.filter((url): url is string => url !== null);

    if (errors.length > 0) {
      alert(`Some files failed to upload: ${errors.join(", ")}`);
    }

    return successfulUrls;
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const addCustomAmenity = () => {
    const trimmed = customAmenity.trim();
    if (trimmed && !selectedAmenities.includes(trimmed)) {
      setSelectedAmenities([...selectedAmenities, trimmed]);
      setCustomAmenity("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setUploadProgress(0);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const fileInput = form.querySelector('input[type="file"]') as HTMLInputElement;
    
    try {
      let imageUrls: string[] = [];
      
      // Step 1: Upload images if files are selected
      if (fileInput?.files && fileInput.files.length > 0) {
        imageUrls = await uploadImagesToImageKit(fileInput.files);
        setUploadedImages(imageUrls);
        
        if (imageUrls.length === 0) {
           throw new Error("No images were successfully uploaded.");
        }
      }

      // Step 2: Create property with the URLs
      const propertyData = {
        title: formData.get("title") as string,
        location: formData.get("location") as string,
        price: Number(formData.get("price")),
        type: formData.get("type") as string,
        status: formData.get("status") as string,
        bedrooms: Number(formData.get("bedrooms")),
        bathrooms: Number(formData.get("bathrooms")),
        area: formData.get("area") ? Number(formData.get("area")) : null,
        description: formData.get("description") as string | null,
        amenities: selectedAmenities,
        imageUrls, 
      };

      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(propertyData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create property");
      }

      alert("Property created successfully!");
      
      form.reset();
      setSelectedAmenities([]);
      setUploadedImages([]);
      setUploadProgress(0);
      router.refresh();
      
    } catch (err) {
      console.error(err);
      alert(`Failed: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-luxury rounded-xl max-w-4xl mx-auto">
      <CardContent className="p-6 sm:p-8">
        <h2 className="text-2xl font-bold mb-4">Create Property</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input name="title" placeholder="Title *" required />

          <Select name="location" required>
            <SelectTrigger><SelectValue placeholder="Select Location" /></SelectTrigger>
            <SelectContent>
              {locations.map(loc => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}
            </SelectContent>
          </Select>

          <Select name="type" required>
            <SelectTrigger><SelectValue placeholder="Property Type" /></SelectTrigger>
            <SelectContent>
              {propertyTypes.slice(1).map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
            </SelectContent>
          </Select>

          <Select name="status" required>
            <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="For Sale">For Sale</SelectItem>
              <SelectItem value="For Rent">For Rent</SelectItem>
            </SelectContent>
          </Select>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input type="number" name="price" placeholder="Price (Ksh) *" required />
            <Input type="number" name="area" placeholder="Area (sqft)" />
            <Input type="number" name="bedrooms" placeholder="Bedrooms *" required />
          </div>
          
          <Input type="number" name="bathrooms" placeholder="Bathrooms *" required />

          <Textarea name="description" placeholder="Description" rows={4} />

          <div className="flex flex-col gap-2">
            <label className="font-medium">Amenities</label>
            <div className="flex flex-wrap gap-2">
              {amenitiesOptions.map((amenity) => {
                const selected = selectedAmenities.includes(amenity);
                return (
                  <Button
                    type="button"
                    key={amenity}
                    onClick={() => toggleAmenity(amenity)}
                    style={
                      selected
                        ? { background: "var(--gradient-luxury)", color: "white" }
                        : { background: "white", color: "black", border: "1px solid #D1D5DB" }
                    }
                    className="px-3 py-1 rounded transition hover:opacity-90 cursor-pointer"
                  >
                    {amenity}
                  </Button>
                );
              })}
            </div>
            <div className="flex gap-2 mt-2">
              <Input
                placeholder="Add custom amenity"
                value={customAmenity}
                onChange={e => setCustomAmenity(e.target.value)}
              />
              <Button
                type="button"
                onClick={addCustomAmenity}
                style={{ background: "var(--gradient-luxury)", color: "white" }}
              >
                Add
              </Button>
            </div>

            {selectedAmenities.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedAmenities.map((amenity, i) => (
                  <div key={i} className="bg-gray-100 px-3 py-1 rounded flex items-center gap-1 text-gray-800">
                    {amenity}
                    <button type="button" onClick={() => toggleAmenity(amenity)} className="text-red-500 font-bold">×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="font-medium block mb-2">Property Images *</label>
            <Input type="file" name="files" multiple accept="image/*" required />
            <p className="text-sm text-gray-500 mt-1">
              Supports bulk upload. Large files may take a moment.
            </p>
          </div>

          {loading && (
            <div className="w-full">
              <div className="flex justify-between text-sm mb-1">
                <span>Uploading...</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <progress value={uploadProgress} max={100} className="w-full h-2 rounded overflow-hidden"></progress>
            </div>
          )}

          {uploadedImages.length > 0 && (
            <div>
              <label className="font-medium block mb-2">Uploaded Images</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {uploadedImages.map((url, i) => (
                  <div key={i} className="relative w-full h-32 rounded overflow-hidden border">
                    <Image src={url} alt={`Uploaded ${i + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            style={{ background: "var(--gradient-luxury)" }}
            className="w-full text-black py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                Processing...
              </>
            ) : (
              "Create Property"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}