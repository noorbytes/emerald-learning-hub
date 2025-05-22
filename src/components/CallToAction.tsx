
import React from 'react';
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-primary/20 to-accent/20">
      <div className="container mx-auto container-padding">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Learning Experience?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already using our platform to achieve better grades and deeper understanding of their subjects.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-primary hover:bg-primary-600 text-white px-8 py-6 text-lg rounded-xl button-transition">
              Get Started for Free
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary-100 px-8 py-6 text-lg rounded-xl button-transition">
              Schedule a Demo
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            No credit card required for free tier. Upgrade anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
