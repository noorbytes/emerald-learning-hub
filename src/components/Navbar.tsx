
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">KnowledgeHub</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-foreground hover:text-primary button-transition">Features</a>
            <a href="#pricing" className="text-foreground hover:text-primary button-transition">Pricing</a>
            <a href="#curriculum" className="text-foreground hover:text-primary button-transition">Curriculum</a>
            <div className="ml-4 flex items-center space-x-4">
              <a href="/login">
                <Button variant="outline" size="sm" className="hover:text-primary hover:border-primary button-transition">
                  Log in
                </Button>
              </a>
              <a href="/signup">
                <Button size="sm" className="bg-primary hover:bg-primary-600 button-transition">
                  Sign up
                </Button>
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-primary-100 dark:hover:bg-primary-900 button-transition"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border">
            <a
              href="#features"
              className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium button-transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium button-transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#curriculum"
              className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium button-transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Curriculum
            </a>
            <div className="mt-4 space-y-2 px-3">
              <a href="/login" className="w-full">
                <Button variant="outline" className="w-full hover:text-primary hover:border-primary">
                  Log in
                </Button>
              </a>
              <a href="/signup" className="w-full">
                <Button className="w-full bg-primary hover:bg-primary-600">
                  Sign up
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
