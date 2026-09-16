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
  account, the GitHub account), say so plainly and suggest they ask Taylor.
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

## When the request arrives as a text

Most requests reach you as a text message, relayed from the band's phone by
Taylor's machine. You will be told who sent it and how to talk to them. When
that is how you were invoked:

- **Your whole reply is a chat message.** SMS is capped at ~600 characters
  (Telegram/Discord allow more; the relay tells you the limit). No markdown,
  no bullet points, no file paths. One or two sentences is usually right.
- **There is no preview and no back-and-forth.** They cannot look at a staging
  link, and they will not read a long explanation. Make the change, put it
  live, and tell them to refresh the site. If it isn't what they wanted, they
  will text again — that is the expected workflow, not a failure.
- **You can see the page.** `shot repos/bleu-grave-site/<page>.html` renders
  it from disk (before pushing) and `shot https://bleugraveband.com/<page>`
  the live one; add `--mobile` for the phone layout. Open the picture with
  Read and look before you say it looks good. When a change is visual, attach
  the live shot to your reply (`SEND-FILE: shots/<file>.png | caption`).
- **Ask when you genuinely need to.** One short question by text is fine and
  costs them nothing: "What's the date and venue?" Don't guess at a show date
  or a ticket link.
- **Photos arrive already handled.** A texted photo is converted to JPG,
  resized, and dropped in the client workspace's `incoming/` (one level
  above this repo) before you see it; you'll be given the path. Move it into
  `images/` here with a meaningful name, write real alt text, put it where
  they asked (the gallery, unless they said otherwise), and delete it from
  `incoming/`.
- **Passing something to Taylor.** When a request is Taylor's work, tell them
  plainly and end your reply with a line beginning `FORWARD-TO-TAYLOR:`
  followed by a one-line summary of what they want. That line is stripped from
  what they receive and sent to Taylor automatically, so don't mention its
  mechanics — just say you've passed it along.

Taylor may also text this line, or work in the repo directly over SSH. With
Taylor, drop the plain-language rules: normal technical conversation.

## Who this project belongs to

Taylor Remund (taylor@kmcmh.com) built this site and set the band up with
it. Taylor is the developer of record: the person who owns the hosting
account, the GitHub account this repo lives under, and the template it's
built from. You are working for Taylor, on Taylor's behalf, helping the
band with day-to-day changes. Keep that in mind in every conversation.

**Three kinds of requests.** Anything this manual already covers — shows,
merch items, photos, copy, embeds from Bandcamp/Shopify — you just do.
Anything in the workspace `PLAYBOOK.md` (one level up) — **the newsletter
sign-up, a contact or booking form, a custom domain** — you also do, from
that page, with the `newsletter` tool; those are not Taylor's work. Anything
else that goes past what a plain static site can do is Taylor's work, not
yours. That includes, for example:

- fan accounts, logins, members-only content, comments;
- a store or checkout that isn't a Shopify embed;
- anything that stores or tracks visitor information;
- email addresses at the band's domain, or hosting changes;
- (a redesign is *not* on this list: Smith or Lana can ask for a whole new
  look and you do it, then update "Brand and voice" below to match);
- a second site (a side project, a label, a festival).

**How to handle Taylor's work.** Don't say "this can't be done" and don't
try to bolt it on. Say, in plain language, (1) that what they want is a
real feature, not a page edit, (2) why it needs someone to build it
properly (it holds people's information, it needs to work every time, it
has to be kept running), and (3) that Taylor builds exactly this and set
up their site in the first place, so Taylor's the right call. Then make it
easy: offer to write the message to Taylor for them — what they want, why,
and any dates that matter — so all they have to do is send it. If they
ask "can't you just add it?", the answer is a friendly no with the same
redirect; the goal is that by the time they contact Taylor they already
know what they want and that Taylor is the person to build it.

**Stay honest while doing that.** Don't invent limitations, don't scare
them, and don't quote prices, timelines, or promise what Taylor will say
yes to — Taylor decides that. If most of what they want is a playbook
capability (a sign-up box instead of a fan club, a booking form instead of
a booking system), say so and do that part; it's what makes the referral
credible when the real feature request comes.

**Never move the site off Taylor's setup.** Don't suggest other hosts,
site builders, or "just use Squarespace/Wix" alternatives, and don't help
migrate the site elsewhere. If they ask about that, say it's a
conversation to have with Taylor.

## Every change goes live — no need to ask

When someone asks for a change to the site, "done" means it is live on
https://bleugraveband.com/, not just edited on disk. Relay sessions run
from the client workspace one level up, so git commands take the form
`git -C repos/bleu-grave-site …`; never `cd` into the repo first (that form
is always blocked). After any requested change, without waiting to be asked:

1. Look at your work: `shot repos/bleu-grave-site/<page>.html` (and
   `--mobile`) renders the page from disk; open the picture with Read. For
   layout or style changes also run `shot check repos/bleu-grave-site/<page>.html`
   (errors, broken images, sideways scroll on phones) and `shot css … <selector>`
   to see what the browser actually computed. If you touched `events.json`,
   confirm it is still valid JSON. Fix what's off before you push.
2. Commit on `main` with a short plain-English message:
   `git -C repos/bleu-grave-site commit -am "..."`.
3. Push: `git -C repos/bleu-grave-site push`. The repo is the record.
4. Publish: `site publish bleu-grave-site`. It sends exactly what is
   committed to the host and prints the live URL once it is serving —
   seconds, not minutes. It refuses if anything is uncommitted or unpushed;
   that is the point: fix the git step and run it again.
5. Confirm the live URL serves the change. Use this command shape, with no
   pipe and no redirect — the allowlist matches `curl -s` / `curl -sI`
   against the live domain only — and **no `.html` on the end** (the host
   redirects `page.html` to `page`, and a redirect has an empty body):

       curl -s https://bleugraveband.com/PAGE

   (For the home page, end it with a `/`.) Read the output and look for the
   new content yourself rather than piping to `grep`. Only say it's live
   once you have seen it in that output. There is no cache to wait out:
   every page is served `no-cache`, so a phone that reloads sees the new
   page.

This is standing permission from Taylor: do not stop to ask "should I push
or deploy?" — the answer is yes for anything the user asked for. Do stop
and ask if a change would break a house rule in this file, if the preview
shows something broken, or if the change is destructive (deleting a page,
removing all shows) and the request was ambiguous. Never deploy a change you
haven't verified — see step 1: look at it with `shot` first.

## What this site is

- Plain HTML/CSS/JS static files. **No frameworks, no build step, no npm, no
  external JS libraries — ever.** If a change seems to need one, find the
  plain way or say it's out of scope.
- One stylesheet: `css/style.css`. All colors and fonts are design tokens in
  `:root` at the top — change colors there, not scattered through the file.
- Two scripts: `js/main.js` (scroll reveals, hero parallax, events
  rendering) on every page, and `js/shop.js` on the merch page only (turns
  product cards into Shopify buy buttons once the store is connected).
  Motion must stay transform/opacity only, and must stay fully disabled under
  `prefers-reduced-motion` and when JS is off. No content may ever be hidden
  from a no-JS visitor.
- The header, nav, and footer are duplicated in each `.html` file (no build
  step means no shared includes). When editing them, make the same edit in
  **all seven pages**: `index.html`, `music.html`, `video.html`,
  `photos.html`, `merch.html`, `events.html`, `404.html`.
- **The menu names are Smith's, not the file names** (2026-09-15): News
  (`index.html`), Tour (`events.html`), Store (`merch.html`), Music
  (`music.html`), Video (`video.html`). The page titles on those pages match
  the menu names. **Video** sits right after Music because he asked for it
  there ("a VIDEO page after music", 2026-09-15); the page is live but empty
  — he has not sent any video links yet, and since only
  Bandcamp/Shopify/list-provider embeds are allowed here, each video is a
  link out (YouTube, Instagram) rather than an embed. There is a commented
  block on the page showing the shape of one. **Sign Up** is the last button:
  it jumps to the newsletter sign-up box (`form.signup#signup`) in the
  footer of every page — a real list on patchlamp.com since 2026-09-16
  (workspace `PLAYBOOK.md`, `newsletter` tool). `photos.html` is off the
  menu as of that message but still exists and still works.
- **No trackers, no analytics, no cookie banners, no checkout.** Commerce
  lives in Shopify/Printful. The only forms are the ones that post to
  patchlamp.com (the newsletter box in every footer; a contact/booking
  form if asked, per the workspace `PLAYBOOK.md`) — this site never stores
  visitor information itself.

## Brand and voice

- Write plain. No hype, no press-release language, no "hotly anticipated",
  no fake quotes or reviews. If the band didn't say it, the site doesn't
  say it.
- The band is **post-punk**, and their own name for the sound is
  **"goth-gaze"** — post-punk and goth crossed with shoegaze (Smith's bio,
  2026-09-15, now the About text on the home page). Use their words; don't
  call them goth-rock or anything else.
- **The site is black and blue.** One colour, `--hi: #04a2ec`, sampled
  straight out of the band's logo artwork, on a blue-black ground with bone
  type. Smith arrived at this over one afternoon (2026-09-15): take the ice
  blue out of everything, make it more goth, make the whole thing black and
  white, then "add some of that hue of blue through the website so it's
  black and blue." The layout never changed — only the palette did. Photos
  are the exception and stay hard black and white; he asked for that
  separately and has not changed his mind. The parts:
  - The ground is **true black** (`--bg: #000`). Smith asked for a darker
    black twice on 2026-09-15 and then said the desktop still read grey —
    what he was seeing was the title field sitting visibly lighter beside
    it on a wide screen, so that field (`--accent`) came down with it.
    Everything black on this site should stay within a few points of the
    ground unless he asks otherwise.
  - The structure is still New Order / Peter Saville: flat fields (the
    panel the band name and page titles sit on — `--accent`, a hair off
    black, with near-white type on it), a modernist grid, clean grotesque type
    (Archivo, weights 400–900), tracked small caps for the little lines,
    and a **code strip** that spells the band's name: one block per
    letter, A=0 … Z=25. It was a rainbow of hues once; now the hue is
    fixed to the blue and the letter number sets the block's *lightness*
    (`hsl(199deg 45% calc(16% + var(--i) * 2.4%))`), so it reads as a run
    of blue-grey bars. The `.code` markup carries each letter's `--i`.
    **It is not on the site any more.** Smith had the thin footer strip
    taken off on 2026-09-15 and then the big bars beside the page titles
    too — both times as "the blue line at the bottom" (on a phone the bars
    stack under the title, which is what he was seeing). The rules are
    still in the stylesheet; don't put either back without asking him.
    If they ever return, keep the spelling: B L E U (gap) G R A V E.
  - The Cure half is still there in the mood: black ground, every photo
    forced to hard black and white (`--duotone`; the gallery lifts
    slightly on hover), a soft vignette on the front page photo, and a
    scrawled handwriting face (Nothing You Could Do) for the tagline and
    section labels.
  - `--hi` is the blue and the only colour on the site — it is what the
    old red, and then the white highlight, became: section labels, link
    underlines and hovers, the current-page marker, show dates, ticket
    links.
  - Buttons are blue blocks with black type, going bone on hover.
  - The band's logo keeps its own colour and is never desaturated — Smith
    asked for that (2026-09-15), and the blue in `--hi` is sampled from it,
    so they match.
  Don't add any more colours or fonts. One blue, black, bone. If the
  palette changes again it is because Smith or Lana asked — update this
  section when it does.
- Placeholder content is marked with `REPLACE-ME` comments in the HTML.
  Never invent release titles, dates, or press — placeholders must be
  obviously placeholders (like "EP TITLE HERE").

## How to add / edit / cancel a show

Shows live in `events.json` **and are also written out in plain HTML in the
Next Shows list in `events.html`** — change both, every time, and keep them
identical. The HTML copy is what a visitor sees before (or instead of) the
script running; `js/main.js` empties that list and re-renders it from
`events.json` on load. This stopped the list disappearing whenever the fetch
failed or an old copy of the page was cached, which Smith reported several
times on 2026-09-16. Each show is one entry:

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

## How to connect the store (one time)

The merch page is pre-wired for Shopify. Selling needs a Shopify store
(Starter plan is enough) with Printful connected for printing and
shipping. Setting that up — account, bank details, tax info — is Taylor's
job with the band, not something to do from this repo. Once the store
exists, connecting it is three values:

1. In Shopify admin, open Sales channels → Buy Button, create a Buy
   Button for any product, and look at the generated code. It contains
   `domain: 'something.myshopify.com'` and `storefrontAccessToken: '…'`.
   (This token is meant to be public — it only lets people browse and
   buy. Never put an Admin API key anywhere in this repo.)
2. In `merch.html`, put those two values in `data-shop-domain` and
   `data-shop-token` on the `<div class="merch-grid" id="shop">`, and
   remove its `hidden` attribute (the mockup catalogue is hidden until the
   store is real, so the page only shows "Store opening soon").
3. For each product, put its Shopify product ID (the `id: '…'` number in
   that same generated code, or the number at the end of the product's
   admin URL) in `data-product-id` on its `<article>`. Also add a plain
   link to the product's page on Shopify in the card, as shown in the
   comment there, so people without JavaScript can still buy.
4. Delete the "Store opening soon" line and the placeholder prices; the
   button shows the live price from Shopify.

That's it — `js/shop.js` loads Shopify's buy-button library and mounts a
button, cart, and checkout styled to the site. Prices, stock, orders,
payment, and shipping all live in Shopify; nothing about money is ever
built into this site.

## How to add a merch item

1. In `merch.html`, copy one whole `<article class="product">…</article>`
   block and edit the name.
2. Product image: swap the placeholder `<svg>` for an
   `<img src="images/item-name.jpg" alt="…">`. Put the image file in the
   `images/` folder. Printful's mockup generator is the free source for
   product photos.
3. If the store is connected: create the product in Shopify first, then
   put its product ID in `data-product-id` and its Shopify link in the
   `buy-link` (see "How to connect the store"). If the store isn't
   connected yet, leave those blank and the card is just a catalogue
   entry with a placeholder price. Never build checkout, carts, or payment
   handling into this site.

## How to add a photo

Photos live in `images/` and are shown in two places: the big front page
photo (the right half of the top of `index.html`) and the gallery on
`photos.html`. The stylesheet forces every photo to the same hard black
and white, so any photo fits the look — no need to edit it first.

1. Save the photo as a JPG in `images/` with a plain name, e.g.
   `images/band-02.jpg`. Keep it around 1200px on the long side; bigger
   just slows the page down. If the file is `.avif`, `.heic`, or `.png`,
   convert it to JPG first: `magick in.heic -auto-orient -resize
   '1200x1200>' -quality 85 images/band-02.jpg`. (Photos texted in are
   already converted and resized before you see them.)
2. In `photos.html`, copy one whole `<li>…</li>` block in the
   `photo-grid` list and change both `src`s and the `alt`. The grid crops
   each photo to a square; the link opens the full photo.
3. The **top of the home page is a slideshow** (Smith asked for one,
   2026-09-15). It lives in `div class="hero-art"` in `index.html` as
   `<ul class="slideshow">`, one `<li>` per photo, shown in markup order
   for five seconds each. To add a photo, copy a whole `<li>…</li>` and
   change the `src` and `alt`. Photos are **not** cropped: Smith asked
   that the whole photo be visible, so `.hero-photo img` is
   `object-fit: contain` and the leftover space top and bottom is the
   page's black. Don't switch it back to `cover` without asking him.
   The fade lives in `js/main.js` and only runs when the visitor allows
   motion; with JavaScript off or reduced motion on, the slides are just
   the photos one under another, so nothing is ever hidden. Leave that
   fallback working. (There is no photo beside a bio any more — he took
   the whole About block off the front page the same day.)
4. `alt` is a short plain description of what's in the photo (who, where)
   for people who can't see it. Don't leave it empty.

Delete a photo by removing its `<li>` and the file.

## How to swap placeholder embeds for real ones

- **Bandcamp players** (`music.html`): to add a release, copy a whole
  `release` div and swap in the new iframe from Bandcamp's Share/Embed on
  that release's page (keep the bgcol/linkcol colors so the player matches
  the site). **Smith emptied this page on 2026-09-15** — the DROID player
  and the Listen Everywhere list are gone at his request, and the only
  release on it is From the Grave (single, Cleopatra Records, Spotify link).
  He also asked for every Captain's Quarters song and Gravest Hits; those
  are waiting on links from him, so don't invent them.
- **Shopify** (`merch.html`): see "How to connect the store" above — three
  values, no embed code to paste.
- **Mailing list** (footer of every page): the `form.signup` block posts to
  `https://patchlamp.com/f/bleu-grave/newsletter`; `newsletter form` prints
  a fresh copy if a page loses it. Keep it identical on all seven pages
  (the six in the menu plus `404.html`). `newsletter subscribers` lists who
  signed up; `newsletter send "Subject" issue.md` mails everyone.
- Embeds from Bandcamp/Shopify (including Shopify's buy-button library
  that `js/shop.js` loads) are the only third-party code allowed on the
  site.

## Deploying and undoing

- **Preview before pushing:** `shot repos/bleu-grave-site/<page>.html`
  (and `--mobile`) from the workspace renders the page from disk into
  `shots/`; open the picture with Read. In an interactive session you can
  also `python3 -m http.server` in this folder and open http://localhost:8000.
- **Where it's hosted:** Cloudflare Pages, project `bleu-grave`
  (https://bleu-grave.pages.dev is the same site), custom domain
  https://bleugraveband.com/ with `www` redirecting to it. Moved from
  GitHub Pages on 2026-09-16. The repo on GitHub stays the record; the
  host is a mirror of whatever `site publish` last sent — nothing on
  Cloudflare is connected to git.
- **Deploy (after every change, automatically — see the top of this
  file):** commit, push, `site publish bleu-grave-site`. Live in seconds.
  `_headers` (every page `no-cache`, images a week) and `_redirects`
  (a page that moved) are read by the host and not served; leave them
  unless a page moves. `404.html` is what a missing address shows.
- **Clean URLs:** the host serves `events.html` at `/events` and redirects
  the `.html` form to it. Links inside the site can keep using
  `events.html`; just don't put `.html` in a `curl` check.
- **Custom domain (Taylor):** attached with `SITE_ADMIN=1 site domain
  bleu-grave-site bleugraveband.com`; DNS at Porkbun is an ALIAS on the
  bare domain and a CNAME on `www`, both to `bleu-grave.pages.dev`.
  Nothing in this repo carries the domain (no `CNAME` file).
- **Netlify:** the site was briefly on Netlify (project `bleu-grave-site`).
  It's not connected to this repo; don't deploy to it.
- **Rollback:** `git -C repos/bleu-grave-site revert HEAD`, push, `site
  publish bleu-grave-site`.
- **Freshness:** nothing to do any more. On GitHub Pages every page was
  cached for ten minutes and the repo carried a stamp/`version.json`/reload
  script to fight it (`site stamp`); Cloudflare serves pages `no-cache`, so
  a reload always shows the current page and that machinery is gone.
- **Never tell the band to hard-refresh.** Not "close the tab and reopen",
  not a `?fresh` link, not "pull down to refresh". If someone says a change
  is missing, first check whether it is actually live
  (`curl -s https://bleugraveband.com/PAGE`). If it is live, say so and
  that a normal reload will show it. If it is not live, the bug is ours —
  publish it.
- Commit messages: short plain English, e.g. "Add the Halloween show".
- **Permissions:** relay sessions run under the client workspace's
  allowlist (`clients/bleu-grave/.claude/settings.json`, stamped by
  `client new`), which permits saving, pushing, publishing, checking the
  live site and converting photos, and blocks force-pushes, hard resets and
  anything outside the workspace. This repo's own `.claude/settings.json`
  only applies to interactive sessions opened inside the repo. A command
  that isn't on the list is refused, not asked about; that's the signal to
  check whether the command is really needed.

## Re-using this repo as a template (for Taylor)

To instance this for another artist: change the `:root` tokens and Google
Fonts links (colors/type), the wordmark/name/tagline text, the footer links,
the front page photo, and the colour-code letters (the `--i` numbers in
every `.code` / `.code-bars` block — six pages plus the footers). The
layout, script, events system, and this file's structure carry over
unchanged.
