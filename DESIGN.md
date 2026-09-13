# Design system

## Direction and color

A personal portfolio with a clear progression: introduction, software projects, the person behind the work, experience, capabilities, writing, and contact. Backgrounds are white, neutral gray, or black. Original image colors provide most of the variation; blue marks actions and warm brown is reserved for small labels. Apple’s store informed this restrained distribution of color, without copying its product layouts.

Self-hosted Manrope supplies regular, semibold, and bold type. No synthetic awards, claims, or metrics are added.

## Projects and content

`src/app/data/portfolio.js` supplies personal copy, navigation, projects, images, experience, capabilities, education, languages, and links. The about paragraph supports `**bold emphasis**`.

Each home project retains the stacked structure: name and description above a smaller, centered artboard. The board’s height adapts to the viewport, with a compact mobile variant and natural overflow for unusually long content. The reusable artboard accepts unlimited images and supplies thumbnails, captions, previous/next buttons, keyboard controls, a native full image viewer, and a detail-page overview. Images are contained. Optional GitHub, live project, and extra links appear when supplied.

The rounded header is 60px tall on desktop and 56px on phones. It includes résumé download and a persistent motion toggle. Mobile navigation uses a native dialog. A compact bottom indicator shows the current section and reading progress.

## Motion and timing

- Greeting: 5000ms of visible-tab time cycles through four readable greetings, followed by a 660ms curtain. Each greeting enters for 400ms, rests at full opacity for 800ms, and crossfades into the next over 400ms. Hero text begins after the greeting closes. Enter/Escape can skip it; reduced-motion and paused sessions bypass it.
- Hero headline: 1800ms line masks, 260ms apart. Supporting copy uses slow word fades and small vertical movement.
- Text throughout the page: 1600ms heading masks, 1100ms fades/slides, and word reveals lasting up to 2500ms. Word reveals trigger when at least 45% of the text group is visible, with an 8% bottom inset. Whole body paragraphs remain accessible as one reading group. Text does not use a looping typing cursor.
- Hero carousel: all project screenshots participate. Each advances after 6000ms; the circular card movement takes 1600ms. The center card is sharp and its neighbors are lightly blurred. Manual controls, a local pause button, hover/focus pause, hidden-tab pause, and offscreen pause are included.
- Section curtains: `StoryScene` uses native scroll to uncover the incoming chapter across the full viewport. The outgoing surface moves by 36px for depth.
- Project images: scroll-driven horizontal reveal begins at viewport entry and completes when the board’s top reaches 50% of the viewport. It does not run as a timed entrance. Top/bottom masks reduce adjacent project fragments while scrolling; focus keeps the active project fully accessible.
- Image selection: 850ms mask. Route changes: 1000ms native view transition, with normal navigation where unsupported. Keyboard interactions remain immediate.

## Shader and performance

`LandingShader.js` draws a subtle grayscale field of moving light. There is no donut, ray marching, texture lookup, or button shader. Its longest rendering dimension is capped at 480px and 20fps; devices reporting four or fewer logical processors use 320px and 15fps. It stops when covered by the next chapter, offscreen, hidden, paused, or reduced motion is enabled. Unavailable WebGL leaves the neutral CSS background intact.

Scroll updates batch geometry reads before writes and run only on scroll, resize, or intersection events. The carousel mounts at most five cards around its current image. Fonts are local and no animation framework is required.

Reduced motion and the persistent pause control remove spatial effects, stop automatic media, and turn pinned stories into ordinary flow. Short viewports and long biographies also use normal flow so reading content is not clipped. Native dialogs handle focus trapping, Escape, and focus restoration.
