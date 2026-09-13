# 001 - Coordinate the hero scroll motion

- **Status**: DONE
- **Commit**: NO_COMMIT
- **Severity**: HIGH
- **Category**: Performance, purpose, and cohesion
- **Estimated scope**: 3 files, focused hero and transition changes

## Problem

The current hero makes its three headline rows, orange slab, portrait, support copy, pointer response, and a full-viewport WebGL shader move independently. The competing directions weaken the value proposition and ask the main thread to coordinate several Motion shorthands while the shader is rendering.

```jsx
// src/app/components/PortfolioHome.js:554 - current
const firstLineScrollX = useTransform(heroScrollSpring, [0, 1], [0, -130]);
const secondLineScrollX = useTransform(heroScrollSpring, [0, 1], [0, 92]);
const thirdLineScrollX = useTransform(heroScrollSpring, [0, 1], [0, -58]);
```

```jsx
// src/app/components/PortfolioHome.js:677 - current
style={reduceMotion ? undefined : { x: portraitX, y: portraitY, scale: portraitScale }}
```

## Target

Use one coordinated scroll sequence that communicates hierarchy:

- Copy moves up by `clamp(2rem, 5vw, 4.5rem)` and fades only after the user starts leaving the hero.
- The portrait moves more slowly than the copy and remains the visual anchor.
- A code-native vermilion field moves at the slowest rate to create depth without an image background.
- Use full `translate3d(...)` / `scale(...)` transform strings rather than Motion `x`, `y`, or `scale` shorthand.
- Keep marketing entrance motion at `780ms` with `cubic-bezier(0.16, 1, 0.3, 1)` and stagger related items by `60ms`.
- Press feedback uses `scale(0.97)` for `160ms` with `cubic-bezier(0.23, 1, 0.32, 1)`.
- Under `prefers-reduced-motion`, remove position changes and render every element fully visible.

## Repo conventions to follow

- Motion tokens live in `src/app/globals.css` and `src/app/lib/motion.js`.
- The brand palette and type stack remain `--bg-dark`, `--signal`, Barlow Condensed, Commissioner, and Azeret Mono.
- The implementation stays inside the existing client component in `src/app/components/PortfolioHome.js`.

## Steps

1. Remove `HeroShader`, pointer listeners, and independently drifting title rows from `src/app/components/PortfolioHome.js`.
2. Recompose the hero into a two-line copy block and a portrait-led geometric field with no image background.
3. Drive three coordinated full-transform motion values from the hero's `useScroll()` progress.
4. Replace the old hero CSS in `src/app/globals.css`, including explicit desktop, tablet, mobile, hover-capable, and reduced-motion rules.
5. Remove section-level opacity gating so content never disappears during scroll transitions.
6. Verify desktop and mobile framing at the documented breakpoints.

## Boundaries

- Do NOT change route slugs, navigation labels, anchors, personal data, or project content.
- Do NOT add dependencies.
- Do NOT add a generated or photographic background.
- Keep the transparent portrait asset as the only hero image.

## Verification

- **Mechanical**: run `npm run build` and confirm it completes without warnings introduced by the hero.
- **Feel check**: at 1440x900, scroll the first viewport slowly and confirm copy exits first, the portrait remains legible, and no layer reverses direction unexpectedly.
- **Responsive check**: test 390x844 and confirm the heading stays within two lines, both CTAs are visible, and the portrait never covers the copy.
- **Reduced motion**: emulate `prefers-reduced-motion` and confirm all hero content is visible with no positional scroll motion.
- **Done when**: the hero fits the initial viewport, has no background image, and the scroll sequence is coordinated, readable, and free of Motion transform shorthands.
