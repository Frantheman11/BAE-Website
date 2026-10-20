# Basic American Enterprises website: instructions for Claude

This folder is the draft website for Basic American Enterprises (BAE), owned by Fran McGrath.
Custom Tailored Agents (Sam Briones) built rounds one to three. Fran now continues it.

**Read `PROJECT-CONTEXT.md` before any change.** It holds every decision from the calls.

## Rules

- Keep the site light: whites and grays, red and blue accents. No dark sections.
- Buttons are blue and white, never red.
- No investment numbers, returns, rates or "guaranteed". Keep the footer disclaimer until
  Fran's attorney approves it.
- Never invent reps, quotes, bios or company facts. Ask Fran.
- Show Fran a change in the browser before calling it done: run
  `python -m http.server 8821 --directory site` and open http://127.0.0.1:8821
- Check the page at phone width (390 px) too: nothing may spill off the side.
- Do not publish or change DNS without Fran saying so. Tell Sam before going live.
- When Fran fills a gap, remove its amber "Waiting on Fran" box and update "Still open" in
  `PROJECT-CONTEXT.md`. Add each new decision to the decisions table there.
- Every change after Sam's round three gets a row in `CHANGES.md` (before, now, asked by, status), so Fran can track them. Fran asked for this on 2026-10-20.
