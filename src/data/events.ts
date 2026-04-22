export interface FestEvent {
  id: string;
  name: string;
  emoji: string;
  description: string;
  teamSize?: string;
  color?: string;
  team_size?: string;
  color_theme?: string;
  is_active?: boolean;
  is_featured?: boolean;
  sort_order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export const events: FestEvent[] = [
  {
    id: "hackathon",
    name: "Hackathon",
    emoji: "💻",
    description: "Build an innovative project in 24 hours. Push your coding limits and create something amazing.",
    teamSize: "2-4 members",
    color: "from-fest-purple to-fest-blue",
  },
  {
    id: "code-golf",
    name: "Code Golf",
    emoji: "⛳",
    description: "Solve problems with the shortest code possible. Every character counts!",
    teamSize: "1-2 members",
    color: "from-fest-blue to-fest-purple",
  },
  {
    id: "robotics",
    name: "Robotics Challenge",
    emoji: "🤖",
    description: "Design and program robots to complete exciting obstacle courses and challenges.",
    teamSize: "3-5 members",
    color: "from-fest-orange to-fest-pink",
  },
  {
    id: "quiz",
    name: "Tech Quiz",
    emoji: "🧠",
    description: "Test your tech knowledge across multiple rounds of brain-teasing questions.",
    teamSize: "2-3 members",
    color: "from-fest-pink to-fest-purple",
  },
  {
    id: "ctf",
    name: "Capture The Flag",
    emoji: "🏴",
    description: "Dive into cybersecurity challenges. Crack codes, find vulnerabilities, and capture flags.",
    teamSize: "2-4 members",
    color: "from-fest-purple to-fest-orange",
  },
  {
    id: "ui-design",
    name: "UI/UX Showdown",
    emoji: "🎨",
    description: "Design stunning user interfaces and experiences for real-world problem statements.",
    teamSize: "1-3 members",
    color: "from-fest-blue to-fest-orange",
  },
];
