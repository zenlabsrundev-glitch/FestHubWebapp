
# Tech Fest Ticketing & Registration

## Design
- **Style**: Colorful & vibrant — bold gradients (purple/blue/orange/pink), playful geometric shapes, energetic animations
- **Font**: Modern sans-serif headings, clean body text
- **Palette**: Purple (#7C3AED), Blue (#3B82F6), Orange (#F97316), Pink (#EC4899) with white/light backgrounds

## Sections (top to bottom)

### 1. Hero with Countdown
- Large fest name (placeholder) with animated gradient text
- Date/venue placeholder
- Countdown timer (days, hours, minutes, seconds) with flip-card style
- "Register Now" CTA button that scrolls to events

### 2. Events List
- Grid of event cards (6-8 placeholder events like Hackathon, Code Golf, Robotics, Quiz, etc.)
- Each card: event icon/emoji, name, brief description, team size, and a "Register" button
- Clicking "Register" opens a registration dialog for that event

### 3. Team Registration Flow
- Modal/dialog with: Team name, team leader details (name, email, phone, college)
- Dynamic member fields — add/remove team members (name, email)
- On submit: generates a unique ticket number, shows success with the ticket, and sends confirmation email with ticket details

### 4. Sponsors & About
- About section with fest description placeholder
- Sponsor logo grid (placeholder logos)
- Footer with organizer contact info

## Email
- Set up Lovable's transactional email to send a confirmation with the unique ticket number after registration
- This requires Lovable Cloud + email domain setup (will handle during implementation)

## Data Storage
- Supabase table for registrations (team name, members, event, ticket number)
- RLS policies for insert access
