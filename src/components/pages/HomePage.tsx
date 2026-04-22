import { useState } from "react";
import HeroSection from "@/components/pages/HeroSection";
import EventsSection from "@/components/pages/EventsSection";
import SponsorsAbout from "@/components/pages/SponsorsAbout";

import RegistrationDialog from "@/components/pages/RegistrationDialog";
import type { FestEvent } from "@/data/events";

const HomePage = () => {
  const [selectedEvent, setSelectedEvent] = useState<FestEvent | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleRegister = (event: FestEvent) => {
    setSelectedEvent(event);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <EventsSection onRegister={handleRegister} />
      <SponsorsAbout />
  
      <RegistrationDialog event={selectedEvent} open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
};

export default HomePage;
