# 003 - Restore scroll-driven section masks

- **Status**: DONE
- **Commit**: NO_COMMIT
- **Severity**: HIGH
- **Category**: Missed opportunity, performance, and accessibility
- **Estimated scope**: 2 files, about 45 lines

## Problem

The reusable mask hook still exists, but SectionReveal bypasses it and permanently marks every section settled. As a result, About, Experience, Capabilities, Work, and Contact change as ordinary hard cuts while scrolling.

    // src/app/components/ScrollMask.js:103-119 - current
    export function SectionReveal({
      as = "section",
      className = "",
      children,
      ...props
    }) {
      const Element = as === "footer" ? motion.footer : motion.section;

      return (
        <Element
          className={`section-reveal is-reveal-settled ${className}`.trim()}
          {...props}
        >
          <div className="section-reveal__surface" aria-hidden="true" />
          {children}
        </Element>
      );
    }

The related stylesheet is configured for a static surface and contains a dead content-opacity rule:

    /* src/app/globals.css:303-323 - current */
    .section-reveal {
      --section-overlap: 0px;
      margin-top: 0;
      overflow: clip;
      background: transparent;
    }
    .section-reveal:not(.is-reveal-settled) > *:not(.section-reveal__surface) {
      opacity: var(--section-content-opacity, 1) !important;
    }

An earlier opacity-gated surface reveal produced blank viewport regions. The replacement must mask the complete incoming section, keep its text at full opacity, and overlap the previous section so the document background never shows through.

## Target

Use one consistent bottom-up mask language for every SectionReveal:

- Scroll mapping: start while the incoming section top is still at 108% of the viewport; finish when it reaches 32%. The early offscreen start gives the slower spring time to move before content enters view.
- Mask range: inset(100% 0% 0% 0%) to inset(0% 0% 0% 0%).
- Progress shaping: retain the existing smootherStep function.
- Scroll smoothing: duration 2.2, scrub true, with the existing non-aperture spring calculation. This resolves to stiffness 127, damping 42, mass 0.24, restDelta 0.001 and produces an approximately one-second settle instead of the previous fast catch-up.
- Do not translate the section while revealing it. The mask alone communicates the transition.
- Use a negative layout overlap of clamp(3.5rem, 8svh, 6rem) on desktop and clamp(2.5rem, 7svh, 4rem) at 768px and below.
- Never animate child opacity. Text, controls, and images remain at opacity 1 inside the mask.
- Once progress reaches 0.998, remove clip-path and will-change through the existing settled state.
- With prefers-reduced-motion, render every section unmasked, untranslated, and with zero overlap.

The target SectionReveal structure is:

    // src/app/components/ScrollMask.js - target shape
    export function SectionReveal({
      as = "section",
      className = "",
      children,
      ...props
    }) {
      const Element = as === "footer" ? motion.footer : motion.section;
      const {
        ref,
        settled,
        maskStyle,
      } = useScrollMask({
        direction: "bottom",
        duration: 2.2,
        scrub: true,
        start: "start 108%",
        end: "start 32%",
        overlap: 0,
        depth: 100,
        origin: "50% 50%",
      });

      return (
        <Element
          ref={ref}
          className={
            "section-reveal section-reveal--bottom" +
            (settled ? " is-reveal-settled" : "") +
            (className ? " " + className : "")
          }
          style={maskStyle}
          {...props}
        >
          <div className="section-reveal__surface" aria-hidden="true" />
          {children}
        </Element>
      );
    }

If callers can pass a style prop when this plan is executed, destructure it and merge it before maskStyle so the animated clipPath and transform remain authoritative. Do not silently discard caller styles.

## Repo conventions to follow

- Scroll motion lives in src/app/components/ScrollMask.js and uses Framer Motion 11 hooks.
- Existing useScrollMask already provides reduced-motion branching, viewport-aware will-change, smootherStep, settling at 0.998, and full transform strings.
- Motion tokens live in src/app/globals.css. This scroll-scrubbed mask is progress-driven, so it does not add a CSS duration token.
- About, Experience, Capabilities, Work, and Contact already render through SectionReveal in src/app/components/PortfolioHome.js:454, 514, 567, 675, and 760. Do not add one-off animation code to those sections.

## Steps

1. In src/app/components/ScrollMask.js, connect SectionReveal to useScrollMask using the exact target parameters above.
2. Apply maskStyle to the SectionReveal element itself so the surface and all content share one clipping boundary. Preserve all existing element props and support the footer variant.
3. In src/app/globals.css, set .section-reveal --section-overlap to clamp(3.5rem, 8svh, 6rem) and margin-top to calc(-1 * var(--section-overlap)).
4. At max-width 768px, override --section-overlap with clamp(2.5rem, 7svh, 4rem).
5. Delete the .section-reveal content-opacity selector at src/app/globals.css:313. Do not replace it with any opacity gating.
6. Retain the settled-state rules that remove clip-path, transform, and will-change. Retain the reduced-motion rule that resets overlap and disables masks.
7. Do not assign different directions per section. The shared bottom-up reveal is the authored transition language; project media may continue using its existing diagonal, right, and center masks.

## Boundaries

- Do NOT fade section children or delay their readability.
- Do NOT add sticky scroll, scroll locking, snap points, fixed-height scroll scenes, or wheel listeners.
- Do NOT change section markup, content, colors, or order in PortfolioHome.js.
- Do NOT change MediaReveal behavior.
- Do NOT add GSAP or any dependency.
- Do NOT animate layout properties per frame; the negative margin is static and clip-path is the only scrubbed mask property.
- If the cited SectionReveal implementation has materially changed since this plan was written, STOP and report instead of improvising.

## Verification

- **Mechanical**: run npm run build; expect a successful production build. Search for section-content-opacity; expect zero results.
- **Desktop feel check**: at 1440x900, scroll slowly from the hero through Contact. Confirm:
  - each incoming section rises through a clean bottom mask;
  - the outgoing section remains behind the incoming section during the overlap;
  - no black document-background gap appears between sections;
  - text is never partially faded or invisible inside a revealed region;
  - after a section settles, DevTools shows no persistent will-change on it.
- **Responsive check**: repeat at 390x844 and 320x680. Confirm the smaller overlap does not hide section headings or intercept header navigation.
- **Slow-motion check**: use the browser Animations panel at 10% playback while dragging the scrollbar slowly. The mask must follow scroll progress without bouncing, reversing, or completing after the scroll has stopped.
- **Reduced motion**: emulate prefers-reduced-motion. Confirm sections use normal document flow with no negative overlap, no clip-path, no translation, and all content visible.
- **Done when**: all five major section boundaries use the same scroll-controlled mask, the previous section always fills the overlap, and there are no blank or opacity-gated viewport regions.
