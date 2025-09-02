"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Search, Phone, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqs = [
    {
      category: 'General',
      questions: [
        {
          question: 'What areas do you serve in Nairobi?',
          answer: 'We specialize in premium locations including Kilimani, Kileleshwa, Lavington, Karen, and Westlands. These are some of Nairobi\'s most prestigious and sought-after neighborhoods.'
        },
        {
          question: 'How long have you been in business?',
          answer: 'Luxe Consult has been serving clients for over 15 years, establishing ourselves as one of Kenya\'s most trusted real estate consultancies with a proven track record of successful transactions.'
        },
        {
          question: 'Do you only deal with luxury properties?',
          answer: 'While we specialize in luxury and premium properties, we also handle mid-range properties in our coverage areas. Our focus is on quality properties that meet our high standards.'
        }
      ]
    },
    {
      category: 'Buying',
      questions: [
        {
          question: 'What is the typical buying process?',
          answer: 'Our buying process includes: 1) Initial consultation to understand your needs, 2) Property search and viewing, 3) Due diligence and valuation, 4) Negotiation and offer submission, 5) Legal documentation and transfer, 6) Handover and after-sale support.'
        },
        {
          question: 'What documents do I need to buy a property?',
          answer: 'You\'ll need: Valid ID or passport, KRA PIN certificate, proof of income (payslips/bank statements), pre-approval letter from your bank (if financing), and deposit funds. Our team will guide you through the complete documentation process.'
        },
        {
          question: 'Can foreigners buy property in Kenya?',
          answer: 'Yes, foreigners can buy property in Kenya, but there are restrictions. Foreigners cannot own land but can acquire leasehold properties. We provide specialized guidance for international clients on the legal requirements and processes.'
        },
        {
          question: 'Do you assist with financing options?',
          answer: 'Yes, we work with various financial institutions and can help connect you with mortgage providers. We also assist with understanding financing options, calculating affordability, and preparing loan applications.'
        }
      ]
    },
    {
      category: 'Selling',
      questions: [
        {
          question: 'How do you determine property value?',
          answer: 'We conduct comprehensive market analysis considering recent comparable sales, current market conditions, property condition, location factors, and unique features. Our experienced team provides accurate valuations based on 15+ years of market expertise.'
        },
        {
          question: 'What are your commission rates?',
          answer: 'Our commission rates are competitive and depend on the property type, value, and complexity of the transaction. We provide transparent pricing with no hidden fees. Contact us for a personalized quote based on your specific property.'
        },
        {
          question: 'How long does it take to sell a property?',
          answer: 'The timeline varies based on property type, pricing, market conditions, and location. On average, well-priced properties in our coverage areas sell within 2-6 months. Luxury properties may take longer but we have extensive networks to reach qualified buyers.'
        },
        {
          question: 'Do you provide marketing services?',
          answer: 'Yes, we offer comprehensive marketing including professional photography, virtual tours, online listings on major platforms, social media marketing, print advertising, and our extensive network of agents and clients.'
        }
      ]
    },
    {
      category: 'Renting',
      questions: [
        {
          question: 'What is included in your rental services?',
          answer: 'Our rental services include property search based on your criteria, viewing arrangements, lease negotiation, background checks, documentation assistance, and ongoing support throughout your tenancy.'
        },
        {
          question: 'What are the typical rental requirements?',
          answer: 'Standard requirements include: 2-3 months rent as deposit, 1 month rent in advance, copy of ID, KRA PIN, proof of income, employment letter, and references. Some landlords may have additional specific requirements.'
        },
        {
          question: 'Do you manage rental properties?',
          answer: 'Yes, we offer comprehensive property management services including tenant screening, rent collection, maintenance coordination, legal compliance, and regular property inspections. Our management ensures maximum returns for property owners.'
        }
      ]
    },
    {
      category: 'Investment',
      questions: [
        {
          question: 'What makes a good investment property?',
          answer: 'Good investment properties typically have: prime location with growth potential, strong rental demand, good infrastructure and amenities, potential for capital appreciation, and solid rental yields. We analyze all these factors for our investment clients.'
        },
        {
          question: 'What returns can I expect from rental properties?',
          answer: 'Rental yields in our coverage areas typically range from 6-10% annually, depending on location, property type, and market conditions. Premium locations like Karen and Lavington often provide stable long-term returns with capital appreciation.'
        },
        {
          question: 'Do you provide investment consultation?',
          answer: 'Yes, we offer comprehensive investment consultation including market analysis, ROI calculations, portfolio diversification advice, tax implications guidance, and long-term investment strategy development tailored to your financial goals.'
        }
      ]
    }
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Find answers to common questions about our real estate services and processes.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 bg-background"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* FAQ Categories */}
          <div className="lg:col-span-1">
            <Card className="shadow-card sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Categories</h3>
                <div className="space-y-2">
                  {faqs.map((category, index) => (
                    <button
                      key={index}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-luxury-gold hover:bg-luxury-gold/10 transition-luxury"
                      onClick={() => {
                        const element = document.getElementById(`category-${index}`);
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {category.category}
                    </button>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Still have questions?</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Us
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-xs"
                      onClick={() => window.open('https://wa.me/254700123456', '_blank')}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            {filteredFaqs.length > 0 ? (
              <div className="space-y-12">
                {filteredFaqs.map((category, categoryIndex) => (
                  <div key={categoryIndex} id={`category-${categoryIndex}`}>
                    <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                      <div className="w-8 h-8 bg-gradient-luxury rounded-lg flex items-center justify-center mr-3">
                        <span className="text-primary font-bold text-sm">{category.category[0]}</span>
                      </div>
                      {category.category}
                    </h2>
                    
                    <div className="space-y-4">
                      {category.questions.map((faq, questionIndex) => {
                        const globalIndex = categoryIndex * 100 + questionIndex;
                        const isOpen = openItems.includes(globalIndex);
                        
                        return (
                          <Card key={questionIndex} className="shadow-card">
                            <Collapsible open={isOpen} onOpenChange={() => toggleItem(globalIndex)}>
                              <CollapsibleTrigger asChild>
                                <button className="w-full p-6 text-left hover:bg-muted/50 transition-luxury">
                                  <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-foreground pr-4">
                                      {faq.question}
                                    </h3>
                                    <ChevronDown 
                                      className={`w-5 h-5 text-luxury-gold transition-transform ${
                                        isOpen ? 'transform rotate-180' : ''
                                      }`}
                                    />
                                  </div>
                                </button>
                              </CollapsibleTrigger>
                              <CollapsibleContent>
                                <div className="px-6 pb-6 pt-0">
                                  <p className="text-muted-foreground leading-relaxed">
                                    {faq.answer}
                                  </p>
                                </div>
                              </CollapsibleContent>
                            </Collapsible>
                          </Card>
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
                <Button onClick={() => setSearchTerm('')} className="bg-gradient-luxury hover:opacity-90">
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              Didn't Find Your Answer?
            </h2>
            <p className="text-muted-foreground">
              Our expert team is here to help. Contact us directly for personalized assistance with your real estate needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-luxury hover:opacity-90">
                Contact Us
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.open('https://wa.me/254700123456', '_blank')}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Chat
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default  FAQ;