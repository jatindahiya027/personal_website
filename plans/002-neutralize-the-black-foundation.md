# 002 - Neutralize the black foundation

- **Status**: DONE
- **Commit**: NO_COMMIT
- **Severity**: MEDIUM
- **Category**: Cohesion and tokens
- **Estimated scope**: 3 files, fewer than 20 lines

## Problem

The core neutral palette is still chromatic green-black, so every dark page surface, dark text color, line mix, and browser chrome inherits a green cast. This conflicts with the requested pure-black direction and will also tint the proposed hero shader.

    /* src/app/globals.css:5-13 - current */
    :root {
      --bg-dark: oklch(0.18 0.012 155);
      --bg-deep: oklch(0.135 0.01 155);
      --bg-light: oklch(0.955 0.006 150);
      --surface: oklch(0.985 0.003 150);
      --ink: oklch(0.18 0.012 155);
      --ink-soft: oklch(0.42 0.012 155);
      --light: oklch(0.95 0.007 150);
      --light-soft: oklch(0.72 0.012 155);
    }

    // src/app/layout.js:58 - current
    <meta name="theme-color" content="#101211" />

The project-specific Stag, MyCart, MoneyPot, and article-cover colors are authored content and are not part of this finding.

## Target

Make the complete neutral system achromatic. Both dark background tokens must resolve to exact black. Preserve the vermilion signal tokens and all project-specific stage colors.

    /* src/app/globals.css - target */
    :root {
      --bg-dark: oklch(0 0 0);
      --bg-deep: oklch(0 0 0);
      --bg-light: oklch(0.955 0 0);
      --surface: oklch(0.985 0 0);
      --ink: oklch(0 0 0);
      --ink-soft: oklch(0.42 0 0);
      --light: oklch(0.95 0 0);
      --light-soft: oklch(0.72 0 0);
      --signal: oklch(0.69 0.21 36);
      --signal-dark: oklch(0.38 0.15 31);
    }

    // src/app/layout.js - target
    <meta name="theme-color" content="#000000" />

Update the Color section in DESIGN.md so it describes var(--bg-dark) and var(--bg-deep) as pure black rather than green-black or carbon. State explicitly that the light surfaces are neutral off-white and that the vermilion signal color is unchanged.

## Repo conventions to follow

- Authored color tokens live at the top of src/app/globals.css.
- Components consume semantic tokens such as var(--bg-dark), var(--bg-deep), and var(--ink); do not replace those consumers with literal colors.
- DESIGN.md is the design contract and must agree with the implementation.
- Continue using OKLCH for authored CSS tokens. Exact black is oklch(0 0 0).

## Steps

1. In src/app/globals.css:6-13, replace the eight neutral token values with the exact target values above.
2. In src/app/layout.js:58, change the browser theme color from #101211 to #000000.
3. In DESIGN.md under Color, replace the green-black language with pure-black and neutral-off-white language. Keep the signal-color and project-stage guidance intact.
4. Search src/app for literal green-black replacements. Do not change intentional project or blog colors; report any new layout-level literal that bypasses the semantic tokens.

## Boundaries

- Do NOT change --signal or --signal-dark.
- Do NOT neutralize project stage colors, screenshot colors, or blog article coverColor values.
- Do NOT alter typography, spacing, markup, animation, or section ordering.
- Do NOT add dependencies.
- If the cited token block has materially changed since this plan was written, STOP and report instead of improvising.

## Verification

- **Mechanical**: run npm run build; expect a successful production build with no new lint or compilation warnings.
- **Token check**: search src/app/globals.css for oklch values with hue 150 or 155 in the neutral token block; expect none.
- **Feel check**: compare the hero, fixed header, Experience section, Contact section, and a project-detail page on the same display. Confirm:
  - every foundational dark surface reads as neutral black, not green;
  - the vermilion accent remains unchanged;
  - dark and light text retain clear contrast;
  - project-specific blue, purple, and board colors remain intact.
- **Done when**: foundational dark surfaces and browser chrome are exact black, all semantic neutral tokens are achromatic, and intentional content colors are untouched.
