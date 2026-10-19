# Basic American Enterprises website (draft, round three)

Built by Custom Tailored Agents, 2026-10-14. This is a draft. It is not published.

## What is in this folder

| File or folder | What it is |
|---|---|
| `PASTE-INTO-CLAUDE.txt` | Copy this into Claude Code to pick up the project |
| `PROJECT-CONTEXT.md` | Everything decided on the calls with Sam, in one page |
| `CLAUDE.md` | Rules Claude reads on its own when it opens this folder |
| `site/` | The website. `index.html` is the page; `assets/` holds the styles, the map script and the images |
| `review/` | `bae-logo-options.html`: three BAE logo options to pick from |
| `original-images/` | Logos and photos taken from the current basicamericanenterprises.com |

## How to look at it

- Quick look: double-click `site/index.html`. It opens in your browser.
- Best look (the map works fully): open a terminal in this folder and run
  `python -m http.server 8821 --directory site`, then go to http://127.0.0.1:8821

## How to keep working on it

- Unzip this folder, open it in Claude Code, and paste in the text from `PASTE-INTO-CLAUDE.txt`.
- Text lives in `site/index.html`. Colors and layout live in `site/assets/bae.css`.
- The map and the "Reps in this state" list live in `site/assets/bae.js` (the `REPS` list is empty for now).

## House rules for this site

- Keep it light: whites and grays, red and blue accents. No dark pages.
- Buttons are blue and white, never red. Red is an accent only.
- Investor sections: no returns and no numbers. Keep the disclaimer line until your attorney signs off.

## Still open (the amber dashed "Waiting on Fran" boxes)

- The rep tagline (Become a rep section)
- Your written distribution piece and capital piece
- Your pick of the three BAE logo options
