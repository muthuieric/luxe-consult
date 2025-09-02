// components/Providers.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ComparisonProvider } from "@/hooks/usePropertyComparison";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  // Ensure QueryClient instance is created only on client
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ComparisonProvider>
          <Toaster />
          <Sonner />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ComparisonProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
