import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { FestEvent } from "@/data/events";

interface EventCardProps {
  event: FestEvent;
  onRegister: (event: FestEvent) => void;
}

const EventCard = ({ event, onRegister }: EventCardProps) => {
  const colorMap: Record<string, string> = {
    blue: "from-fest-purple to-fest-blue",
    orange: "from-fest-orange to-fest-pink",
    pink: "from-fest-pink to-fest-purple",
    purple: "from-fest-purple to-fest-orange"
  };
  
  const bgGradient = event.color || (event.color_theme ? colorMap[event.color_theme] : "from-fest-purple to-fest-blue") || "from-fest-purple to-fest-blue";

  return (
    <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
      <CardContent className="relative p-6 flex flex-col h-full">
        <div className="text-5xl mb-4">{event.emoji}</div>
        <h3 className="text-xl font-bold text-foreground mb-2">{event.name}</h3>
        <p className="text-sm text-muted-foreground mb-4 flex-1">{event.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs font-medium text-fest-purple bg-fest-purple/10 px-3 py-1 rounded-full">
            👥 {event.team_size || event.teamSize}
          </span>
          <Button
            onClick={() => onRegister(event)}
            size="sm"
            className="gradient-bg text-primary-foreground border-0 rounded-full hover:scale-105 transition-transform"
          >
            Register
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
