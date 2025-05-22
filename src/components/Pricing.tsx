
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  
  const pricingPlans = [
    {
      name: "Free",
      description: "Basic access to get started",
      price: {
        monthly: "£0",
        annually: "£0",
      },
      features: [
        "Limited study notes (select topics)",
        "Basic subject access",
        "Community forum access",
        "Mobile-friendly interface",
      ],
      buttonText: "Sign up for free",
      popular: false,
    },
    {
      name: "Basic",
      description: "For dedicated students",
      price: {
        monthly: "£5",
        annually: "£50",
      },
      features: [
        "Full access to study notes",
        "Interactive flashcards",
        "Solved topical past papers",
        "Progress tracking",
        "Ad-free experience",
      ],
      buttonText: "Get Basic",
      popular: true,
    },
    {
      name: "Premium",
      description: "For ambitious achievers",
      price: {
        monthly: "£7",
        annually: "£70",
      },
      features: [
        "Everything in Basic",
        "AI Exam Room with timed practice",
        "AI Tutor for personalized help",
        "Syllabus completion tracker",
        "AI CIE Question Finder",
        "Priority support"
      ],
      buttonText: "Get Premium",
      popular: false,
    }
  ];

  return (
    <section id="pricing" className="section-padding">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Choose the plan that best suits your needs and take your learning to the next level.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mt-8">
            <span className={`mr-4 ${isAnnual ? 'text-muted-foreground' : 'font-semibold'}`}>Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-12 items-center rounded-full bg-primary/20"
            >
              <span className="sr-only">Toggle billing period</span>
              <span 
                className={`${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-primary transition`}
              />
            </button>
            <span className={`ml-4 ${isAnnual ? 'font-semibold' : 'text-muted-foreground'}`}>
              Annual <span className="text-sm text-primary">(Save 20%)</span>
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-background rounded-2xl shadow-soft hover:shadow-hover transition-all duration-300 border ${
                plan.popular ? 'border-primary scale-105 md:scale-110' : 'border-border'
              }`}
            >
              {plan.popular && (
                <div className="bg-primary text-primary-foreground text-center py-1 rounded-t-2xl text-sm font-medium">
                  MOST POPULAR
                </div>
              )}
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="text-muted-foreground mt-2">{plan.description}</p>
                <div className="my-6">
                  <span className="text-4xl font-bold">{isAnnual ? plan.price.annually : plan.price.monthly}</span>
                  <span className="text-muted-foreground">/{isAnnual ? 'year' : 'month'}</span>
                </div>
                
                <Button 
                  className={`w-full mb-8 ${
                    plan.popular 
                      ? 'bg-primary hover:bg-primary-600' 
                      : 'bg-primary/90 hover:bg-primary'
                  }`}
                >
                  {plan.buttonText}
                </Button>
                
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center text-muted-foreground text-sm max-w-2xl mx-auto">
          <p>
            All plans include access to our web platform. Premium plan subscribers get priority support and early access to new features.
            VAT may be added depending on your region.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
