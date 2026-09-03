# Bleu Grave site — house rules

This repo IS the band's website. There is no dashboard and no CMS: the way
you change the site is to edit these files and push. This file is the manual
for doing that safely.

## What this site is

- Plain HTML/CSS/JS static files. **No frameworks, no build step, no npm, no
  external JS libraries — ever.** If a change seems to need one, find the
  plain way or say it's out of scope.
- One stylesheet: `css/style.css`. All colors and fonts are design tokens in
  `:root` at the top — change colors there, not scattered through the file.
- One script: `js/main.js` (scroll reveals, hero parallax, events rendering).
  Motion must stay transform/opacity only, and must stay fully disabled under
  `prefers-reduced-motion` and when JS is off. No content may ever be hidden
  from a no-JS visitor.
- The header, nav, and footer are duplicated in each `.html` file (no build
  step means no shared includes). When editing them, make the same edit in
  **all four pages**: `index.html`, `music.html`, `merch.html`, `events.html`.
- **No trackers, no analytics, no cookie banners, no home-built checkout or
  forms.** Commerce lives in Shopify/Printful; mailing list lives with a
  list provider; this site only embeds or links.

## Brand and voice

- Write plain. No hype, no press-release language, no "hotly anticipated",
  no fake quotes or reviews. If the band didn't say it, the site doesn't
  say it.
- The band is **post-punk** (their word, per their Instagram bio) — don't
  call them goth-rock or anything else.
- Xerox-flyer aesthetic, modeled on the band's tour posters and logo:
  near-black background, one ice-blue accent (`--accent` in
  `css/style.css` — the blue from their logo), Archivo Black for display
  type (boxed band name, like their posters), Space Mono for everything
  else (their posters use typewriter text). Event rows use poster-style
  dotted leaders (`DATE ····· CITY`). Don't add more colors or fonts.
- Placeholder content is marked with `REPLACE-ME` comments in the HTML.
  Never invent release titles, dates, or press — placeholders must be
  obviously placeholders (like "EP TITLE HERE").

## How to add / edit / cancel a show

Shows live in `events.json` — nothing else needs to change. Each show is one
entry:

```json
{
  "date": "2026-10-31",
  "venue": "Urban Lounge",
  "city": "Salt Lake City, UT",
  "ticket_url": "https://link-to-tickets",
  "note": "with Special Guest"
}
```

- **Add a show:** append an entry like the above (date is `YYYY-MM-DD`;
  `ticket_url` and `note` can be `""`). Order in the file doesn't matter —
  the page sorts.
- **Edit a show:** change the fields on its entry.
- **Cancel a show:** either delete its entry, or keep it and set
  `"note": "CANCELLED"` so fans see it was called off.
- Past shows move to the "Past Shows" list automatically once the date
  passes. Delete very old ones whenever the list gets long.
- After editing, make sure the file is still valid JSON (commas between
  entries, no trailing comma after the last one).

## How to add a merch item

1. In `merch.html`, copy one whole `<article class="product">…</article>`
   block and edit the name and price.
2. Product image: swap the placeholder `<svg>` for an
   `<img src="images/item-name.jpg" alt="…">`. Put the image file in an
   `images/` folder in the repo (create it if it doesn't exist). Printful's
   mockup generator is the free source for product photos.
3. Real purchasing comes from Shopify Buy Buttons — see the
   `SHOPIFY-STARTER-EMBED` comment in `merch.html` for where the embed code
   goes and how to get it. Never build checkout, carts, or payment handling
   into this site.

## How to swap placeholder embeds for real ones

- **Bandcamp players** (`music.html`): the DROID player is already real. To
  add a release, copy a whole `release` div and swap in the new iframe from
  Bandcamp's Share/Embed on that release's page (keep the bgcol/linkcol
  colors so the player matches the site).
- **Shopify Buy Buttons** (`merch.html`): see `SHOPIFY-STARTER-EMBED`
  comment.
- **Mailing list** (footer of every page): replace the placeholder line with
  the signup form embed from the band's list provider — remember to do it in
  all four pages.
- Embeds from Bandcamp/Shopify/the list provider are the only third-party
  code allowed on the site.

## Deploying and undoing

- **Preview before pushing:** run `python3 -m http.server` in this folder,
  open http://localhost:8000, and check the page you changed — including on
  a phone-sized window.
- **Deploy:** once GitHub Pages is turned on for this repo, pushing to
  `main` is deploying. `git push` = the site is live a minute later.
- **Rollback:** if a push broke the site, undo the last change with:
  `git revert HEAD && git push`
- Commit messages: short plain English, e.g. "Add the Halloween show".

## Re-using this repo as a template (for Taylor)

To instance this for another artist: change the `:root` tokens and Google
Fonts links (colors/type), the wordmark/name/tagline text, the footer links,
and the hero SVG art. The layout, script, events system, and this file's
structure carry over unchanged.
