import { useState } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { FestEvent } from "@/data/events";

interface Member {
  name: string;
  email: string;
}

interface RegistrationDialogProps {
  event: FestEvent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const generateTicket = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let ticket = "TF25-";
  for (let i = 0; i < 8; i++) ticket += chars[Math.floor(Math.random() * chars.length)];
  return ticket;
};

const RegistrationDialog = ({ event, open, onOpenChange }: RegistrationDialogProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState<"form" | "success">("form");
  const [ticket, setTicket] = useState("");
  const [loading, setLoading] = useState(false);

  const [teamName, setTeamName] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [leaderEmail, setLeaderEmail] = useState("");
  const [leaderPhone, setLeaderPhone] = useState("");
  const [college, setCollege] = useState("");
  const [members, setMembers] = useState<Member[]>([{ name: "", email: "" }]);

  const addMember = () => setMembers([...members, { name: "", email: "" }]);
  const removeMember = (i: number) => setMembers(members.filter((_, idx) => idx !== i));
  const updateMember = (i: number, field: keyof Member, value: string) => {
    const updated = [...members];
    updated[i][field] = value;
    setMembers(updated);
  };

  const reset = () => {
    setStep("form");
    setTicket("");
    setTeamName("");
    setLeaderName("");
    setLeaderEmail("");
    setLeaderPhone("");
    setCollege("");
    setMembers([{ name: "", email: "" }]);
    setLoading(false);
  };

  const handleClose = (v: boolean) => {
    if (!v) reset();
    onOpenChange(v);
  };

  const handleSubmit = async () => {
    if (!teamName || !leaderName || !leaderEmail || !leaderPhone || !college) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8081/api/v1/register", {
        teamName,
        eventId: event?.id,
        leaderName,
        leaderEmail,
        leaderPhone,
        leaderCollege: college,
        teamMembers: members.filter(m => m.name.trim() || m.email.trim())
      });

      if (response.data.success) {
        setTicket(response.data.data.id || generateTicket()); // fallback in case id is not present
        setStep("success");
        toast({ title: "Success", description: response.data.message || "Registration successful!" });
      } else {
        toast({ title: "Registration failed", description: response.data.message || "Something went wrong.", variant: "destructive" });
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({ title: "Error", description: error.response?.data?.message || "Could not connect to server.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        {step === "form" ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                {event.emoji} Register for {event.name}
              </DialogTitle>
              <DialogDescription>Fill in your team details to register. Team size: {event.team_size || event.teamSize}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="teamName">Team Name *</Label>
                <Input id="teamName" value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="Enter team name" />
              </div>

              <div className="border-t pt-4">
                <p className="text-sm font-semibold text-foreground mb-3">Team Leader</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="leaderName">Name *</Label>
                    <Input id="leaderName" value={leaderName} onChange={(e) => setLeaderName(e.target.value)} placeholder="Full name" />
                  </div>
                  <div>
                    <Label htmlFor="leaderEmail">Email *</Label>
                    <Input id="leaderEmail" type="email" value={leaderEmail} onChange={(e) => setLeaderEmail(e.target.value)} placeholder="email@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="leaderPhone">Phone *</Label>
                    <Input id="leaderPhone" value={leaderPhone} onChange={(e) => setLeaderPhone(e.target.value)} placeholder="+91 98765 43210" />
                  </div>
                  <div>
                    <Label htmlFor="college">College *</Label>
                    <Input id="college" value={college} onChange={(e) => setCollege(e.target.value)} placeholder="College name" />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-foreground">Team Members</p>
                  <Button type="button" variant="outline" size="sm" onClick={addMember} className="text-xs">
                    + Add Member
                  </Button>
                </div>
                {members.map((m, i) => (
                  <div key={i} className="flex gap-2 mb-2 items-end">
                    <div className="flex-1">
                      <Input
                        value={m.name}
                        onChange={(e) => updateMember(i, "name", e.target.value)}
                        placeholder={`Member ${i + 1} name`}
                      />
                    </div>
                    <div className="flex-1">
                      <Input
                        type="email"
                        value={m.email}
                        onChange={(e) => updateMember(i, "email", e.target.value)}
                        placeholder="Email"
                      />
                    </div>
                    {members.length > 1 && (
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeMember(i)} className="text-destructive shrink-0">
                        ✕
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full gradient-bg text-primary-foreground border-0 rounded-full py-6 text-base hover:scale-[1.02] transition-transform"
              >
                {loading ? "Registering..." : "🎟️ Register Team"}
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Registration Successful!</h2>
            <p className="text-muted-foreground mb-6">
              Your team <strong>{teamName}</strong> is registered for <strong>{event.name}</strong>
            </p>
            <div className="gradient-bg rounded-xl p-6 mb-6 inline-block">
              <p className="text-xs text-primary-foreground/70 uppercase tracking-wider mb-1">Your Ticket Number</p>
              <p className="text-3xl font-mono font-bold text-primary-foreground">{ticket}</p>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              A confirmation email with your ticket details will be sent to <strong>{leaderEmail}</strong>
            </p>
            <Button onClick={() => handleClose(false)} variant="outline" className="rounded-full">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationDialog;
