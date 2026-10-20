# Round four (Claude, 2026-10-19): changes for Fran to review

Sam's round three is the first commit in this folder's history and the untouched zip is in the brain
(raw/inbox/2026-10-19-sam-website-files/). Every change below is a separate commit and easy to undo.
Nothing is published. Preview: `powershell -NoProfile -ExecutionPolicy Bypass -File serve.ps1`,
then open http://127.0.0.1:8821 (Python is not installed on the laptop, so Sam's command does not run).

## What changed

1. **Phone fix.** The big "BASIC AMERICAN" wordmark spilled past the right edge at phone width (390 px).
   It now fits. The rest of the page was already clean on a phone.
2. **Two empty team cards filled.** Louis Hayner and Tom Purcell now have one-line bios, shortened
   from their bios on the current basicamericanenterprises.com (the calls decided: bios from the current site).
3. **Basic American Networks added to "Every product we represent".** Telecom, cloud, integration,
   low-voltage cabling and security networks; sold to carriers, cities, enterprise and mid-size businesses
   (from your answers on 2026-10-08). The five cards now sit evenly in one row on a wide screen.
4. **Faster page.** The six large photos the page uses were 5.8 MB as PNG; as JPEG they are 0.4 MB and
   look the same. The whole page's images went from about 6.5 MB to 0.8 MB. The PNG originals are still in
   `site/assets/` (as are six alternate photos the page does not use).
5. **Link previews.** When the live link is texted or posted (LinkedIn, Facebook, X), it shows the flag
   photo, the title "Smart money invests in smart American businesses" and a one-line description.
   Search engines also get the company name, phone, email and city. The draft still tells search
   engines not to list it.

## Questions only you can answer (not changed)

- **Hero line "Invest in American business".** The page avoids numbers and returns, but this line
  invites investment. Keep it until your attorney reviews the investor wording, or soften it now?
- **Your title:** the site says Chairman; the brain has CEO and founder. Which one?
- **Zack Zeiler** is on the site as Director (as on the current site). Still on the team?
- **Block Battery and BlackMP** are in the portfolio grid. Still in the portfolio?
- Sam's three open items stand: the rep tagline, your distribution and capital pieces, and the logo
  pick (open `review/bae-logo-options.html`).

## Decided after round four

- 2026-10-19: Fran removed the "One parent, three names" (family of brands) section.
- 2026-10-19: iPost Sports logo on white tiles (rep products, smart-money examples) replaced with the dark-gray-and-red version from Desktop\iPost Sports\iPost Sports Social Media Profile.png (trimmed), so the white "i" and "sports" no longer disappear. The dark portfolio tile keeps the original white-and-red logo.
- 2026-10-19: Capital half now has California-coast backdrops (Fran's direction): Big Sur coastline behind the Part Two band, green headlands behind smart money, Malibu bay behind the investor examples, McWay Cove behind incubation. The handshake photo became Bixby Bridge at golden hour; the office photo behind "Let's talk" became golden-hour Malibu. Fran approved the look; the six photos were downloaded into site/assets (2.6 MB in all), sources in site/assets/PHOTO-CREDITS.md.
- 2026-10-19: Fran's written capital section added as a graphic: "Three core ingredients. One company." (Foundership, Capital, Management in linked red, blue and black circles). The amber "Waiting on Fran" box for it is removed. Pillars are a separate idea Fran will add later.
- 2026-10-19: Card 02 under "Who we are looking for" is now "Social media influencers / reps": all reps are social media influencers (was "Social media reps: sell from anywhere, no territory needed").
- 2026-10-19: Site phone number changed from 562-573-3200 to 310-488-7205 (header, Let's talk button, footer, search data), at Fran's request.
- 2026-10-19: Phone number put back to 562-573-3200, the number on the current live site (Fran reversed the 310-488-7205 change).
- 2026-10-19: Portfolio heading changed from "Innovation creates deal flow" to "Innovation, deal flow and solid management lead to ROI" (Fran). "ROI" is return language: add it to the wording list for the attorney.
- 2026-10-19: Stronger split between the halves (Fran): Part One opens with a full-width stars-and-stripes panel (built in code, no photo); Part Two opens with a tall full-bleed Big Sur coastline. Each has a white card: "Distribution: the rep network, fifty states, three regions" and "Capital: smart money for smart American companies".
- 2026-10-19: Sign-up forms (draft, nothing sent). "Sign up as a rep" opens a rep form: I am a salesperson / influencer / agent; seat: regional director, master agent or sub-agent; state (pre-filled from the map, shows the region); contact; what you sell; years in sales; social platform and handle; who you know. "Bring us your company" opens a company form: company, website, product, stage, state, what you need most (foundership, capital, management, distribution), contact. Heading "Salespeople and agents" is now "Salespeople, influencers and agents". To go live, the forms need to post to Sam's CRM.
- 2026-10-19: The two sign-up forms are now their own page sections instead of pop-ups (Fran): "Salespeople, influencers and agents: sign up" closes the Distribution half (after How to start); "Companies seeking participation" follows the portfolio in the Capital half, on the golden-hour Malibu backdrop. Sign-up buttons, the "Your company here" tile, the menu and the footer all lead to them; the map's state still carries into the rep form.
- 2026-10-19: Hero line now "A network of professional representation in every state, and smart money behind the companies it carries." (Fran); same wording in the search description and link preview.
