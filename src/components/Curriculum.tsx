
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const Curriculum = () => {
  const curriculumData = {
    gcse: {
      title: "GCSE",
      description: "Comprehensive materials for GCSE students covering all major exam boards.",
      subjects: [
        { name: "Mathematics", topics: 24, papers: 15 },
        { name: "Biology", topics: 18, papers: 12 },
        { name: "Chemistry", topics: 20, papers: 14 },
        { name: "Physics", topics: 19, papers: 13 },
        { name: "English Literature", topics: 15, papers: 10 },
        { name: "English Language", topics: 12, papers: 9 },
      ]
    },
    alevel: {
      title: "A-Level",
      description: "In-depth resources for A-Level students preparing for university entrance.",
      subjects: [
        { name: "Mathematics", topics: 36, papers: 20 },
        { name: "Further Mathematics", topics: 28, papers: 16 },
        { name: "Biology", topics: 24, papers: 18 },
        { name: "Chemistry", topics: 26, papers: 19 },
        { name: "Physics", topics: 25, papers: 17 },
        { name: "Economics", topics: 22, papers: 15 },
      ]
    },
    igcse: {
      title: "IGCSE",
      description: "Complete IGCSE materials aligned with Cambridge and Edexcel examination standards.",
      subjects: [
        { name: "Mathematics", topics: 26, papers: 16 },
        { name: "Biology", topics: 20, papers: 14 },
        { name: "Chemistry", topics: 22, papers: 15 },
        { name: "Physics", topics: 21, papers: 14 },
        { name: "English", topics: 14, papers: 10 },
        { name: "Computer Science", topics: 18, papers: 12 },
      ]
    }
  };

  return (
    <section id="curriculum" className="section-padding bg-primary/5">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive UK Curriculum</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We cover all major examination boards and subjects, providing you with everything you need to excel.
          </p>
        </div>
        
        <Tabs defaultValue="gcse" className="w-full max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 h-12">
              <TabsTrigger value="gcse" className="text-lg rounded-l-lg">GCSE</TabsTrigger>
              <TabsTrigger value="alevel" className="text-lg">A-Level</TabsTrigger>
              <TabsTrigger value="igcse" className="text-lg rounded-r-lg">IGCSE</TabsTrigger>
            </TabsList>
          </div>
          
          {Object.keys(curriculumData).map((key) => (
            <TabsContent key={key} value={key} className="mt-0">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold mb-2">{curriculumData[key].title}</h3>
                <p className="text-muted-foreground">{curriculumData[key].description}</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {curriculumData[key].subjects.map((subject, index) => (
                  <div
                    key={index}
                    className="bg-background rounded-xl p-5 shadow-soft hover:shadow-hover transition-all duration-300 border border-border"
                  >
                    <h4 className="font-semibold mb-3 text-primary">{subject.name}</h4>
                    <div className="flex justify-between text-sm">
                      <span>{subject.topics} Topics</span>
                      <span>{subject.papers} Past Papers</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="flex justify-center mt-12">
          <a href="/subjects">
            <Button className="bg-primary hover:bg-primary-600 px-6">
              Explore All Subjects
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Curriculum;
