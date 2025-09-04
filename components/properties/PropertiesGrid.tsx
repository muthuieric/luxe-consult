import { Button } from "@/components/ui/button";
import { GitCompare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import PropertyCard from "@/components/PropertyCard";
import Link from "next/link";

const PropertiesGrid = ({
  filteredProperties,
  comparisonList,
  setShowComparison,
  clearFilters,
}: any) => {
  return (
    <section className="py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <h2 className="text-lg md:text-2xl font-semibold text-foreground">
            {filteredProperties.length} Properties Found
          </h2>

          {comparisonList.length > 0 && (
            <Button
              variant="outline"
              onClick={() => setShowComparison(true)}
              className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-primary"
            >
              <GitCompare className="w-4 h-4 mr-2" />
              Compare
              <Badge className="ml-2 bg-luxury-gold text-primary">
                {comparisonList.length}
              </Badge>
            </Button>
          )}
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProperties.map((property: any) => (
              <Link key={property.id} href={`/properties/${property.id}`}>
                <PropertyCard property={property} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🏠</div>
            <h3 className="text-xl md:text-2xl font-semibold mb-2">
              No Properties Found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search criteria or filters to see more results.
            </p>
            <Button
              onClick={clearFilters}
              className="bg-gradient-luxury hover:opacity-90"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesGrid;
