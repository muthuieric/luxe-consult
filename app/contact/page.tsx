"use client";

import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import MapSection from "@/components/contact/MapSection";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
         <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-5xl font-serif font-bold mb-4">
            Get In Touch
          </h1>
          <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            {"Ready to find your dream property? We're here to help. Contact our expert team today."}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <ContactInfo />
        <div className="lg:col-span-2">
          <ContactForm />
        </div>
      </div>
      <MapSection />
    </div>
  );
}
