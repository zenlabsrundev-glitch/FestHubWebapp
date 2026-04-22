import { useState, useEffect } from "react";
import axios from "axios";
import type { FestEvent } from "@/data/events";

const sponsors = [
  { name: "TechCorp", emoji: "🏢" },
  { name: "InnovateLabs", emoji: "🔬" },
  { name: "CodeBase", emoji: "💾" },
  { name: "FutureAI", emoji: "🤖" },
  { name: "CloudSync", emoji: "☁️" },
  { name: "DevStack", emoji: "🛠️" },
];

const SponsorsAbout = () => {
  const [featuredEvents, setFeaturedEvents] = useState<FestEvent[]>([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/v1/registration/featured");
        if (response.data.success) {
          setFeaturedEvents(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch featured events:", error);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section className="py-20 px-4 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        {/* About */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-fest-pink mb-2">About Us</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold gradient-text mb-6">What is TechFest?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            TechFest is the flagship technical festival bringing together the brightest minds for three days of
            innovation, competition, and learning. From hackathons to robotics, coding challenges to design
            showdowns — there's something for every tech enthusiast.
          </p>
        </div>

        {/* Featured Events */}
        {featuredEvents.length > 0 && (
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase text-fest-orange mb-2">Spotlight</p>
            <h3 className="text-3xl font-bold text-foreground mb-10">Featured Events</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-background rounded-xl p-6 shadow-sm flex flex-col items-center gap-4 border"
                >
                  <span className="text-5xl">{event.emoji}</span>
                  <div>
                    <h4 className="text-xl font-bold">{event.name}</h4>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sponsors */}
        <div className="text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-fest-blue mb-2">Our Partners</p>
          <h3 className="text-3xl font-bold text-foreground mb-10">Sponsors</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {sponsors.map((s) => (
              <div
                key={s.name}
                className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center gap-2"
              >
                <span className="text-4xl">{s.emoji}</span>
                <span className="text-sm font-medium text-muted-foreground">{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorsAbout;
