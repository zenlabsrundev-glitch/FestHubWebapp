import { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "@/components/pages/EventCard";
import type { FestEvent } from "@/data/events";

interface EventsSectionProps {
  onRegister: (event: FestEvent) => void;
}

const EventsSection = ({ onRegister }: EventsSectionProps) => {
  const [activeEvents, setActiveEvents] = useState<FestEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/registration/active`);
        if (response.data.success) {
          setActiveEvents(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <section id="events" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase text-fest-orange mb-2">Compete & Win</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold gradient-text">Events</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Choose your arena. Register your team. Show the world what you've got.
          </p>
        </div>
        
        {loading ? (
          <div className="text-center text-muted-foreground">Loading events...</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeEvents.map((event) => (
              <EventCard key={event.id} event={event} onRegister={onRegister} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;
