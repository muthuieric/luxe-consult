"use client";

import { useState } from "react";
import FaqSearchBar from "@/components/faq/ FaqSearchBar";
import FaqCategories from "@/components/faq/FaqCategories";
import FaqItem from "@/components/faq/FaqItem";
import { Button } from "@/components/ui/button";

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const faqs = [
    {
      category: "General",
      questions: [
        {
          question: "What areas do you serve in Nairobi?",
          answer: "We specialize in Kilimani, Kileleshwa, Lavington, Karen, and Westlands.",
        },
      ],
    },
    {
      category: "Buying",
      questions: [
        {
          question: "What is the typical buying process?",
          answer: "Consultation → Search → Due diligence → Negotiation → Documentation → Handover.",
        },
      ],
    },
    {
      category: "Selling",
      questions: [
        {
          question: "How do you determine property value?",
          answer:
            "We use market analysis, comps, property condition, and location factors.",
        },
      ],
    },
    {
      category: "Renting",
      questions: [
        {
          question: "What is included in rental services?",
          answer:
            "We offer search, viewings, lease negotiation, background checks, and documentation.",
        },
      ],
    },
    {
      category: "Investment",
      questions: [
        {
          question: "What makes a good investment property?",
          answer:
            "Prime location, strong rental demand, growth potential, and solid yields.",
        },
      ],
    },
  ];

  const filteredFaqs = faqs
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  const totalResults = filteredFaqs.reduce(
    (sum, cat) => sum + cat.questions.length,
    0
  );

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Find answers to common questions about our real estate services.
          </p>
          <FaqSearchBar
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
            totalResults={totalResults}
          />
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-4 gap-12">
        <FaqCategories faqs={faqs} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

        <div className="lg:col-span-3">
          {filteredFaqs.length > 0 ? (
            <div className="space-y-12">
              {filteredFaqs.map((category, categoryIndex) => (
                <div key={categoryIndex} id={`category-${categoryIndex}`}>
                  <h2 className="text-2xl font-bold text-foreground mb-6">{category.category}</h2>
                  <div className="space-y-4">
                    {category.questions.map((faq, qIndex) => {
                      const globalIndex = categoryIndex * 100 + qIndex;
                      return (
                        <FaqItem
                          key={qIndex}
                          question={faq.question}
                          answer={faq.answer}
                          isOpen={openItems.includes(globalIndex)}
                          onToggle={() => toggleItem(globalIndex)}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">No Results Found</h3>
              <p className="text-muted-foreground mb-6">
                No FAQs match your search. Try different keywords or browse our categories.
              </p>
              <Button onClick={() => setSearchTerm("")} className="bg-gradient-luxury hover:opacity-90">
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
