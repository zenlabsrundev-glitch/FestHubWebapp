import { useState, useEffect } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToEvents = () => {
    document.getElementById("events")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Decorative shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-fest-purple/20 blur-3xl animate-float" />
      <div className="absolute bottom-32 right-16 w-40 h-40 rounded-full bg-fest-orange/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-fest-pink/15 blur-2xl animate-pulse-glow" />
      <div className="absolute bottom-20 left-1/4 w-20 h-20 rounded-full bg-fest-blue/20 blur-2xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <p className="text-sm sm:text-base font-semibold tracking-widest uppercase text-fest-purple mb-4">
          Welcome to
        </p>
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold gradient-text leading-tight mb-6">
          TechFest 2025
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-2">
          📅 March 15-17, 2025 &nbsp;|&nbsp; 📍 Your College Campus
        </p>
        <p className="text-base text-muted-foreground mb-10 max-w-2xl mx-auto">
          The ultimate celebration of technology, innovation, and creativity. Compete, collaborate, and conquer!
        </p>

    

        <Button
          onClick={scrollToEvents}
          size="lg"
          className="gradient-bg text-primary-foreground text-lg px-10 py-6 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-0"
        >
          🚀 Register Now
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
