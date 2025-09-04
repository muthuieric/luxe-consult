"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { locations, propertyTypes } from "@/data/properties";
import PhoneInput from "react-phone-input-2";

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    propertyType: "",
    location: "",
    budget: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description:
          "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        propertyType: "",
        location: "",
        budget: "",
        message: "",
      });
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="shadow-luxury rounded-xl">
      <CardContent className="p-6 sm:p-8">
        <h2 className="text-2xl font-bold mb-2">Send us a Message</h2>
        <p className="text-muted-foreground mb-8">
          {"Fill out the form below and we'll get back to you as soon as possible."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Full Name *"
              required
            />
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Email Address *"
              required
            />
          </div>

          {/* Phone + Subject */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PhoneInput
              country={"ke"}
              value={formData.phone}
              onChange={(phone) => handleInputChange("phone", phone)}
              inputClass="!w-full !h-12 !text-black !rounded-lg !border !border-gray-300 px-3"
              containerClass="w-full"
            />
            <Select
              value={formData.subject}
              onValueChange={(value) => handleInputChange("subject", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Subject *" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="property-inquiry">Property Inquiry</SelectItem>
                <SelectItem value="property-valuation">Property Valuation</SelectItem>
                <SelectItem value="investment-consultation">Investment Consultation</SelectItem>
                <SelectItem value="general-inquiry">General Inquiry</SelectItem>
                <SelectItem value="partnership">Partnership Opportunity</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Property Type + Location + Budget */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Select
              value={formData.propertyType}
              onValueChange={(value) => handleInputChange("propertyType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                {propertyTypes.slice(1).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={formData.location}
              onValueChange={(value) => handleInputChange("location", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Preferred Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={formData.budget}
              onValueChange={(value) => handleInputChange("budget", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Budget Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under-10m">Under KSH 10M</SelectItem>
                <SelectItem value="10m-20m">KSH 10M - 20M</SelectItem>
                <SelectItem value="20m-30m">KSH 20M - 30M</SelectItem>
                <SelectItem value="30m-50m">KSH 30M - 50M</SelectItem>
                <SelectItem value="over-50m">Over KSH 50M</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Message */}
          <Textarea
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            placeholder="Tell us more about your requirements..."
            rows={6}
            required
          />

          {/* Submit */}
          <Button
            type="submit"
            className="w-full h-12 rounded-lg text-white font-semibold shadow-md"
            style={{ background: "var(--gradient-luxury)" }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
