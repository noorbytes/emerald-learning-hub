
import React from 'react';
import { Book, Check, Code, Layout, Search, Star } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Book className="h-6 w-6 text-primary" />,
      title: 'Interactive Study Notes',
      description: 'Access comprehensive study materials aligned with the UK curriculum, organized by subject and topic.'
    },
    {
      icon: <Layout className="h-6 w-6 text-primary" />,
      title: 'Flashcard Learning',
      description: 'Master key concepts with interactive flashcards that adapt to your learning pace.'
    },
    {
      icon: <Check className="h-6 w-6 text-primary" />,
      title: 'Past Paper Practice',
      description: 'Practice with real past papers and get instant feedback on your performance.'
    },
    {
      icon: <Search className="h-6 w-6 text-primary" />,
      title: 'AI Question Finder',
      description: 'Type the first few words of a question, and our AI will find similar past paper questions.'
    },
    {
      icon: <Code className="h-6 w-6 text-primary" />,
      title: 'AI Tutor',
      description: 'Get personalized explanations and help with difficult topics from our AI tutor.'
    },
    {
      icon: <Star className="h-6 w-6 text-primary" />,
      title: 'Syllabus Tracker',
      description: 'Track your progress through the syllabus and identify areas that need more attention.'
    }
  ];

  return (
    <section id="features" className="section-padding bg-secondary/30">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Features Designed for Academic Success</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive platform is built to help students excel in their studies with innovative tools and resources.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-background p-6 rounded-2xl shadow-soft hover:shadow-hover card-hover border border-border"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-primary/10">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
