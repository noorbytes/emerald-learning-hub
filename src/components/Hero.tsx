
import React from 'react';
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="hero-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 md:py-24 lg:py-32 flex flex-col lg:flex-row items-center">
          {/* Left Side - Text Content */}
          <div className="w-full lg:w-1/2 lg:pr-16 mb-10 lg:mb-0">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
              <span className="block">Master the UK Curriculum</span>
              <span className="block text-primary">Ace Your Exams</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
              An intelligent learning platform designed for UK students. Access comprehensive notes, interactive flashcards, and AI-powered practice exams to stay ahead in your studies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-primary hover:bg-primary-600 text-white px-8 py-6 text-lg rounded-xl button-transition">
                Start Learning Now
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary-100 px-8 py-6 text-lg rounded-xl button-transition">
                Explore Subjects
              </Button>
            </div>
            <div className="mt-6 text-sm text-muted-foreground">
              Already a student? <a href="/login" className="text-primary hover:underline">Log in</a>
            </div>
          </div>
          
          {/* Right Side - Image/Illustration */}
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-20 h-20 md:w-32 md:h-32 bg-accent/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-6 -right-6 w-20 h-20 md:w-32 md:h-32 bg-primary/20 rounded-full blur-2xl"></div>
              
              <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-soft overflow-hidden border border-border">
                <div className="p-2">
                  <div className="flex space-x-2 mb-4">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <div className="p-4 md:p-8 text-center">
                      <h3 className="text-xl md:text-2xl font-semibold mb-4">Dashboard Preview</h3>
                      <div className="space-y-4">
                        <div className="h-4 bg-primary/20 rounded w-3/4 mx-auto"></div>
                        <div className="h-4 bg-primary/20 rounded w-5/6 mx-auto"></div>
                        <div className="h-4 bg-primary/20 rounded w-4/6 mx-auto"></div>
                        <div className="grid grid-cols-2 gap-4 mt-6">
                          <div className="h-16 bg-primary/10 rounded flex items-center justify-center">
                            <div className="h-4 bg-primary/30 rounded w-1/2"></div>
                          </div>
                          <div className="h-16 bg-accent/10 rounded flex items-center justify-center">
                            <div className="h-4 bg-accent/30 rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
