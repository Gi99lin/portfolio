# Portfolio design system: explorations (parked)

**Status: parked on 2026-10-23.** This folder is the record of ten design rounds for a new design
system for this site. Nothing here is live. The branch `design-system/explorations` is not built by
CI (the image is built only from `main`), and `design-system/` is listed in `.dockerignore`, so it
does not ship even if the branch is merged later.

This is deliberately a separate system, not the corporate Signal design system: Signal did not fit
a personal page. Whether it later becomes a Signal theme is still open.

## Why it is parked

The concept of the site changed during the work, and one question has to be answered first.

- **Before:** a portfolio for finding freelance work. It was never used that way.
- **Now:** a personal page between a resume and a portfolio. No employers, dates or job duties and
  no sales calls to action; the page shows off the projects that were built.
- **Open question:** who opens the page and what should they think about the author within
  30 seconds? The structure of the page (what is on the first screen, how projects are shown, the
  tone of the copy) depends on the answer. Situations to think through: a link in a CV (a hiring
  lead looks), a Telegram or GitHub profile (developers look), inside the company (who to go to
  for automation), or a page for myself (a showcase and a playground).

## Decisions so far

### Typeface: Commissioner (provisional)

Chosen in a final against Geologica (blind test plus a live page). It has Cyrillic, which ruled out
Anybody, the font used in the early rounds. Settings from the round-2 preset:

| Role | font-variation-settings | Weight | Tracking |
| --- | --- | --- | --- |
| Headings | `"FLAR" 100, "VOLM" 100, "slnt" 0` | 740 | -0.03em |
| Text | `"FLAR" 0, "VOLM" 0, "slnt" 0` | 400 | 0 |
| UI labels | `"FLAR" 50, "VOLM" 0, "slnt" 0` | 600 | 0 |

Google Fonts request: `Commissioner:slnt,wght,FLAR,VOLM@-12..0,100..900,0..100,0..100`.
Paid typefaces were not considered yet.

### Atmosphere: liquid chrome, dimmed

The live liquid-chrome surface from round 1 stays, but in the direction "chrome as atmosphere":
dimmed to dark mercury behind the page, with content on solid surfaces. The shader is in
[`liquid-chrome.frag`](liquid-chrome.frag), with notes on its uniforms and the v2 fixes (fixed
560 CSS px scale, quintic noise fade, sharper render).

### Rules that came out of the rounds

- **One thing per page reacts to the cursor.** Two interactive things at once felt like too much.
- **"Expensive" means craft across the whole interface,** not effects: real project screens,
  restraint (few elements, one accent per screen), every element in every state (buttons, hints,
  links, focus, loading, errors), a worked-out typeface and type scale, and UX that is clear,
  fast and works on a phone. Facts packed into captions do not count; they read as a spec sheet.
- **One strong version at a time.** A deck of many options read as "everything and nothing".

### Kept, dropped, parked

- **Kept:** the ASCII torus as it is (for the lab), tactile controls (knob, keycaps, slide switch),
  the project index with a hover tag, inverted letters on metal, and a separate Lab page that shows
  the effects on their own.
- **Dropped:** glowing buttons, the CRT look, breathing letters, the news ticker, organic particles,
  blueprint paper, the circle lens and split seam, Science Gothic and Sofia Sans.
- **Parked:** the car-paint palette (BMW Frozen Deep Green, about `#2A4036` on screen since there is
  no official value; Audi Nardo Grey, usually quoted as `#8E9492`), and the window language (a black
  page with holes into the metal, liked in round 4, then doubted for the new concept).

## The rounds

Open the files in a browser; each page is standalone. Ratings that were saved in the hosted
versions do not travel with these copies.

| File | What it tested | Verdict |
| --- | --- | --- |
| [01-taste-test](rounds/01-taste-test.html) | Six directions: liquid chrome, instrument panel, operator console, kinetic Swiss, bioluminescent, blueprint, plus a desktop-OS wildcard | Chrome background, ASCII torus and tactile controls kept |
| [02-paint-shop](rounds/02-paint-shop.html) | Car-paint palettes and finishes on the kept pieces | "Everything and nothing"; palette parked |
| [03-chrome-kinetic-hero](rounds/03-chrome-kinetic-hero.html) | Chrome background with the Swiss kinetic name, no breathing | Inverted letters chosen |
| [04-islands](rounds/04-islands.html) | Six islands for the name with different buttons | Negative lens and window liked; letters made static |
| [05-lens-and-window](rounds/05-lens-and-window.html) | Lens and window families, buttons built from each idea | Window family won; window + lens better than expected |
| [06-window-homepage](rounds/06-window-homepage.html) | Full homepage in the window language, one fixed chrome surface under a black sheet | Lost the "expensive" feel; concept changed |
| [07-type-round-1](rounds/07-type-round-1.html) | Roboto Flex, Wix Madefor, Geologica, Playfair + Golos | Geologica |
| [08-type-round-2](rounds/08-type-round-2.html) | Geologica with a tuner, Commissioner, Science Gothic, Sofia Sans | Commissioner on par with Geologica |
| [09-type-final](rounds/09-type-final.html) | Geologica vs Commissioner: tuners, blind test, live page | Commissioner, provisionally |
| [10-visual-language](rounds/10-visual-language.html) | Four languages for the personal page in Commissioner | "Chrome as atmosphere" leads; layout must change |

## When this resumes

1. Answer the open question above.
2. A layout round for showing off the projects: each project as an event, not a catalog card.
3. A components sheet in every state, in Commissioner on the dimmed chrome.
4. Homepage v2 with real project screens.
