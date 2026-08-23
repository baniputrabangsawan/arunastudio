# ARUNA Design System

## Design read

Creative-studio website for Indonesian small-business owners. Direct, capable, and visually confident without looking corporate or exclusive.

## Dials

- Design variance: 8/10
- Motion intensity: 5/10
- Visual density: 4/10

## Direction

Neo-utilitarian editorial. Use asymmetric grids, real photography, visible structure, compact copy, and one coral accent. Avoid agency decoration, fake product screens, generic bento cards, section numbering, and repeated eyebrow labels.

## Theme tokens

| Token | Light | Dark |
|---|---|---|
| Canvas | `#F1F1ED` | `#171918` |
| Surface | `#E7E8E4` | `#262927` |
| Paper | `#FAFAF7` | `#1F2220` |
| Ink | `#171918` | `#F1F1ED` |
| Muted | `#5E625F` | `#B6BAB5` |
| Accent | `#F05237` | `#F05237` |

One accent color only. Do not invert whole sections at random. Strong contrast may appear inside a functional tile or CTA.

## Typography

Use self-hosted Plus Jakarta Sans Variable for display and body. Headlines use 720-760 weight, tight tracking, and a maximum of two lines in the hero. Do not introduce a serif.

## Shape

Use a 6px radius for controls and containers. Photography may remain square-cropped. Pills are reserved for true status values.

## Layout

- Container: maximum 1320px
- Mobile gutters: 16px
- Desktop gutters: 24px minimum
- Homepage needs at least four layout families
- Asymmetric layouts collapse to one column below 768px
- Section explanations sit below headings, not in a floating right column

## Motion

Use motion only for hierarchy, feedback, or state changes. Animate transform and opacity. Default duration 140-300ms. Honor reduced-motion. No scroll hijacking, decorative marquee, or perpetual motion.

## Copy

Use simple Indonesian. State the benefit or action directly. Remove abstract agency language, binary contrasts, fake insights, decorative punctuation, and claims without evidence.

## Image rules

Use generated or real photography with declared dimensions through `next/image`. Do not build screenshots from decorative divs. Current generated assets live in `public/images/` as optimized WebP files.
