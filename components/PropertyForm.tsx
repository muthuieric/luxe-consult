"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { locations, propertyTypes, amenitiesOptions } from "@/public/data/properties";
import { upload } from "@imagekit/next";

// Define props to support editing mode
type PropertyFormProps = {
  initialData?: any; // If present, we are in "Edit" mode
  onSuccess?: () => void; // Callback to close modal or redirect
};

export default function PropertyForm({ initialData, onSuccess }: PropertyFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [customAmenity, setCustomAmenity] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Holds ALL images (both pre-existing URLs and newly uploaded ones)
  const [images, setImages] = useState<string[]>([]);

  // Initialize form with data if in Edit Mode
  useEffect(() => {
    if (initialData) {
      // Set amenities
      setSelectedAmenities(Array.isArray(initialData.amenities) ? initialData.amenities : []);
      
      // Set images (handle object structure from prisma: { id, url, ... })
      if (initialData.images && Array.isArray(initialData.images)) {
        const urlList = initialData.images.map((img: any) => 
          typeof img === 'string' ? img : img.url
        );
        setImages(urlList);
      }
    }
  }, [initialData]);

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

  // Upload Logic (Parallel Uploads)
  const uploadImagesToImageKit = async (files: FileList): Promise<string[]> => {
    const fileArray = Array.from(files);
    const uploadedUrls: string[] = [];
    const errors: string[] = [];

    // Helper to upload a single file
    const uploadSingle = async (file: File, index: number) => {
      try {
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
            // Rough global progress estimation
            setUploadProgress(((index + event.loaded / event.total) / fileArray.length) * 100);
          },
        });
        return response.url;
      } catch (err) {
        console.error(`Failed to upload ${file.name}`, err);
        errors.push(file.name);
        return null;
      }
    };

    // Run uploads sequentially to avoid rate limits/browser crashes on huge batches
    // (You can also use Promise.all for small batches, but sequential is safer for "lots of MBs")
    for (let i = 0; i < fileArray.length; i++) {
      const url = await uploadSingle(fileArray[i], i);
      if (url) uploadedUrls.push(url);
    }

    if (errors.length > 0) {
      alert(`Some files failed to upload: ${errors.join(", ")}`);
    }

    return uploadedUrls;
  };

  const removeImage = (urlToRemove: string) => {
    setImages((prev) => prev.filter((url) => url !== urlToRemove));
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
      // Step 1: Upload ANY NEW files selected
      let newImageUrls: string[] = [];
      if (fileInput?.files && fileInput.files.length > 0) {
        newImageUrls = await uploadImagesToImageKit(fileInput.files);
      }

      // Step 2: Combine existing images with new uploads
      const finalImageList = [...images, ...newImageUrls];

      if (finalImageList.length === 0) {
        throw new Error("At least one image is required. Please upload an image.");
      }

      // Step 3: Prepare Payload
      const propertyData = {
        id: initialData?.id, // Important for updates!
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
        imageUrls: finalImageList, 
      };

      // Step 4: Send Request (POST for Create, PUT for Update)
      const method = initialData ? "PUT" : "POST";
      const res = await fetch("/api/properties", {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(propertyData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Operation failed");
      }

      alert(initialData ? "Property updated successfully!" : "Property created successfully!");
      
      // Cleanup
      if (!initialData) {
        form.reset();
        setSelectedAmenities([]);
        setImages([]);
        setUploadProgress(0);
      }
      
      router.refresh();
      if (onSuccess) onSuccess(); // Close modal if provided
      
    } catch (err) {
      console.error(err);
      alert(`Failed: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={`shadow-luxury rounded-xl w-full ${initialData ? 'border-none shadow-none' : 'max-w-4xl mx-auto'}`}>
      <CardContent className={initialData ? "p-0" : "p-6 sm:p-8"}>
        <h2 className="text-2xl font-bold mb-4">{initialData ? "Edit Property" : "Create Property"}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input name="title" placeholder="Title *" defaultValue={initialData?.title} required />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select name="location" defaultValue={initialData?.location} required>
              <SelectTrigger><SelectValue placeholder="Select Location" /></SelectTrigger>
              <SelectContent>
                {locations.map(loc => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}
              </SelectContent>
            </Select>

            <Select name="type" defaultValue={initialData?.type} required>
              <SelectTrigger><SelectValue placeholder="Property Type" /></SelectTrigger>
              <SelectContent>
                {propertyTypes.slice(1).map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <Select name="status" defaultValue={initialData?.status} required>
            <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="For Sale">For Sale</SelectItem>
              <SelectItem value="For Rent">For Rent</SelectItem>
            </SelectContent>
          </Select>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input type="number" name="price" placeholder="Price (Ksh) *" defaultValue={initialData?.price} required />
            <Input type="number" name="area" placeholder="Area (sqft)" defaultValue={initialData?.area || ""} />
            <Input type="number" name="bedrooms" placeholder="Bedrooms *" defaultValue={initialData?.bedrooms} required />
          </div>
          
          <Input type="number" name="bathrooms" placeholder="Bathrooms *" defaultValue={initialData?.bathrooms} required />

          <Textarea name="description" placeholder="Description" rows={4} defaultValue={initialData?.description || ""} />

          {/* Amenities */}
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
                    <button type="button" onClick={() => toggleAmenity(amenity)} className="text-red-500 font-bold ml-1">×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Image Management */}
          <div>
            <label className="font-medium block mb-2">Property Images *</label>
            
            {/* Show Current Images */}
            {images.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-4">
                {images.map((url, i) => (
                  <div key={i} className="relative aspect-square rounded-lg overflow-hidden border group">
                    <Image src={url} alt={`Property Image ${i + 1}`} fill className="object-cover" />
                    {/* Delete Button */}
                    <button
                      type="button"
                      onClick={() => removeImage(url)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      title="Remove image"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            <Input type="file" name="files" multiple accept="image/*" />
            <p className="text-xs text-gray-500 mt-1">
              {initialData ? "Upload new images to append to the list." : "Supports bulk upload. Large files may take a moment."}
            </p>
          </div>

          {/* Progress Bar */}
          {loading && uploadProgress > 0 && (
            <div className="w-full">
              <div className="flex justify-between text-sm mb-1">
                <span>Uploading...</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <progress value={uploadProgress} max={100} className="w-full h-2 rounded overflow-hidden"></progress>
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
              initialData ? "Update Property" : "Create Property"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}