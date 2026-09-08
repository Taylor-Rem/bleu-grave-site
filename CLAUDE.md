# Bleu Grave site — house rules

This repo IS the band's website. There is no dashboard and no CMS: the way
you change the site is to edit these files and push. This file is the manual
for doing that safely.

## Who you're talking to

The people using this repo are the band and their friends, not developers.
Taylor (who set this up) is the exception — with Taylor, technical talk is
fine. With everyone else, assume no background at all: they know what a
website is and what they want changed, and nothing else. Do what they ask
and tell them what happened in everyday language.

- Say what things are, not what they're called. "The site is updated" or
  "the change is live," not "deployed" or "pushed to main." "I saved the
  change," not "committed." "The file that holds the shows," not
  "events.json." "A link to the ticket page," not "the ticket_url field."
- Never make them run a command, open a terminal, or read code. If
  something needs doing that only Taylor can do (a setting on the hosting
  account, the GitHub account, the mailing-list provider), say so plainly
  and suggest they ask Taylor.
- When you need something from them, ask for it the way a friend would:
  "What's the date and venue?", "Can you send me the photo?", "Where can
  people buy tickets?" — one or two questions at a time, no jargon.
- Tell them what to look at, not what you did: "Open the site on your
  phone and check the Shows page — the Halloween show should be there."
  Skip file names, line numbers, and commit messages unless they ask.
- If something goes wrong, say what they'll see and that you're fixing
  it. Don't paste error text or explain the stack.
- If they ask for something the site can't or shouldn't do (a checkout,
  a color that isn't the band's, a fake review), say no in one plain
  sentence, offer the closest thing you can do, and move on.
- Expect a lot of small, rapid requests once the band has the site. Keep
  replies short and confirm each change is live; don't lecture, and don't
  bundle unrelated advice into a reply.

The one exception to plain language is this file: keep the technical
detail here, so the next Claude has it.

## Every change goes live — no need to ask

When someone asks for a change to the site, "done" means it is live on
https://bleu-grave-site.netlify.app, not just edited on disk. After any
requested change, without waiting to be asked:

1. Preview it locally and check the page(s) you touched (see "Deploying
   and undoing" below).
2. Commit on `main` with a short plain-English message.
3. `git push`. The repo is connected to Netlify, so the push deploys.
4. Wait for the deploy to finish (about a minute):
   `npx netlify-cli api listSiteDeploys --data '{"site_id":"8aa0df00-34ba-4d6b-aeab-68b083fca271","per_page":1}'`
   shows the newest deploy; `state` becomes `ready` when it is live.
   Then confirm the live URL serves the change (e.g. `curl` the page and
   look for the new content), and report the live URL.

This is standing permission from Taylor: do not stop to ask "should I push
or deploy?" — the answer is yes for anything the user asked for. Do stop
and ask if a change would break a house rule in this file, if the preview
shows something broken, or if the change is destructive (deleting a page,
removing all shows) and the request was ambiguous. Never deploy a page that
you haven't seen render.

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
  **all five pages**: `index.html`, `music.html`, `photos.html`,
  `merch.html`, `events.html`.
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
  "venue": "Alex's Bar",
  "city": "Long Beach, CA",
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
   `<img src="images/item-name.jpg" alt="…">`. Put the image file in the
   `images/` folder. Printful's mockup generator is the free source for
   product photos.
3. Real purchasing comes from Shopify Buy Buttons — see the
   `SHOPIFY-STARTER-EMBED` comment in `merch.html` for where the embed code
   goes and how to get it. Never build checkout, carts, or payment handling
   into this site.

## How to add a photo

Photos live in `images/` and are shown in two places: the gallery on
`photos.html`, and the one band photo beside the bio on `index.html`.
The stylesheet turns every photo black and white, so any photo fits the
look — no need to edit it first.

1. Save the photo as a JPG in `images/` with a plain name, e.g.
   `images/band-02.jpg`. Keep it around 1200px on the long side; bigger
   just slows the page down. If the file is `.avif`, `.heic`, or `.png`,
   convert it to JPG first (on a Mac: `sips -s format jpeg in.avif --out
   images/band-02.jpg`).
2. In `photos.html`, copy one whole `<li>…</li>` block in the
   `photo-grid` list and change both `src`s and the `alt`. The grid crops
   each photo to a square; the link opens the full photo.
3. To change the home-page photo, edit the `src` and `alt` of the
   `<img>` inside `figure class="band-photo"` in `index.html`.
4. `alt` is a short plain description of what's in the photo (who, where)
   for people who can't see it. Don't leave it empty.

Delete a photo by removing its `<li>` and the file.

## How to swap placeholder embeds for real ones

- **Bandcamp players** (`music.html`): the DROID player is already real. To
  add a release, copy a whole `release` div and swap in the new iframe from
  Bandcamp's Share/Embed on that release's page (keep the bgcol/linkcol
  colors so the player matches the site).
- **Shopify Buy Buttons** (`merch.html`): see `SHOPIFY-STARTER-EMBED`
  comment.
- **Mailing list** (footer of every page): replace the placeholder line with
  the signup form embed from the band's list provider — remember to do it in
  all five pages.
- Embeds from Bandcamp/Shopify/the list provider are the only third-party
  code allowed on the site.

## Deploying and undoing

- **Preview before pushing:** run `python3 -m http.server` in this folder,
  open http://localhost:8000, and check the page you changed — including on
  a phone-sized window.
- **Where it's hosted:** Netlify, project `bleu-grave-site`
  (https://bleu-grave-site.netlify.app, admin at
  https://app.netlify.com/projects/bleu-grave-site). The repo is linked
  to it (`.netlify/state.json`, ignored by git).
- **Deploy (do this after every change, automatically — see the top of
  this file):** commit and push to `main`. The GitHub repo is linked to
  the Netlify site (a read-only deploy key on the repo plus a webhook to
  https://api.netlify.com/hooks/github), so every push to `main` deploys
  by itself, with no build command and the repo root as the publish
  directory. The repo is public on purpose: Netlify's free plan only
  auto-builds private repos for verified team members, and a public repo
  lets anyone with push access (the band, Taylor) deploy by pushing.
  Don't make it private again.
- If a push ever doesn't show up in Netlify's Deploys list, publish the
  folder directly as a fallback:
  `npx netlify-cli deploy --prod --dir=. --no-build`
- **Netlify adds nothing to the pages:** its "Built with Netlify" badge
  script is turned off in the site settings (`built_with_badge_enabled`),
  because the house rule is no third-party scripts. If a badge ever shows
  up on the live site, turn it off again in the Netlify admin. "Pretty
  URLs" is on, so `/photos` and `/photos.html` both work.
- **Rollback:** undo the last change with `git revert HEAD && git push`
  (the push deploys the revert), or, in the Netlify admin, open Deploys
  and click "Publish deploy" on the previous good one.
- Commit messages: short plain English, e.g. "Add the Halloween show".
- **Permissions:** `.claude/settings.json` (checked in) pre-approves the
  commands this manual uses — saving, pushing, previewing, checking the
  live site, converting photos — so the band isn't asked to approve
  things they can't judge. It also blocks force-pushes and hard resets.
  If Claude needs a command that isn't on the list, it will ask; that's
  the signal to check whether the command is really needed.

## Re-using this repo as a template (for Taylor)

To instance this for another artist: change the `:root` tokens and Google
Fonts links (colors/type), the wordmark/name/tagline text, the footer links,
and the hero SVG art. The layout, script, events system, and this file's
structure carry over unchanged.
