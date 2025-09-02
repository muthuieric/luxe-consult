"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation'; // App Router version of useParams
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { mockProperties } from '@/data/properties';
import { MapPin, Bed, Bath, Square, Heart, Share2, Phone, Mail, MessageCircle, Car, Wifi, Dumbbell, ShieldCheck, Waves, Trees, ChevronLeft, ChevronRight } from 'lucide-react';

const PropertyDetails = () => {
  const params = useParams();
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const property = mockProperties.find(p => p.id === params.id);

  if (!property) return <div>Property Not Found</div>;

  const galleryImages = [property.image]; // Add more images if needed
  const amenities = [
    { icon: Car, label: 'Parking' },
    { icon: Wifi, label: 'High Speed Internet' },
    { icon: Dumbbell, label: 'Gym' },
    { icon: ShieldCheck, label: '24/7 Security' },
    { icon: Waves, label: 'Swimming Pool' },
    { icon: Trees, label: 'Garden' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Image Gallery */}
      <section className="relative h-96 md:h-[500px]">
        <Image src={galleryImages[currentImageIndex]} alt={property.title} fill className="object-cover"/>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Property Info + Sidebar */}
      </div>
    </div>
  );
};

export default PropertyDetails;
