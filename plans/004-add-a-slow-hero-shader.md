# 004 - Add a slow hero shader

- **Status**: DONE
- **Commit**: NO_COMMIT
- **Severity**: MEDIUM
- **Category**: Missed opportunity, purpose, and performance
- **Estimated scope**: 3 files, about 180 lines including shader setup

## Problem

The redesigned hero content is clear, but its full-viewport background is almost entirely static black. The only background treatment is a very faint clipped polygon, so the open area behind the copy reads as blank rather than as an intentional digital-workshop surface.

    /* src/app/globals.css:182-199 - current */
    .hero {
      min-height: max(680px, 100dvh);
      position: relative;
      overflow: hidden;
      background: var(--bg-dark);
      isolation: isolate;
    }
    .hero::before {
      content: "";
      position: absolute;
      z-index: 0;
      inset: 5.25rem 0 0;
      pointer-events: none;
      background: color-mix(in oklch, var(--signal) 3.5%, transparent);
      clip-path: polygon(66% 0, 100% 0, 100% 100%, 84% 100%);
    }

The hero already has coordinated copy, media, and portrait scroll transforms in src/app/components/PortfolioHome.js:328-439. Those movements are settled and should not be replaced. The shader is a background atmosphere only.

## Target

Add a code-rendered WebGL2 canvas behind the existing hero content. It must be subtle, slow, non-interactive, and achromatic except for restrained vermilion energy lines.

Visual specification:

- Base color: exact black, vec3(0.0).
- Accent color: vec3(0.93, 0.20, 0.055), used at no more than 24 percent contribution in the primary band and 8 percent in its echo, plus a 3.5 percent broad atmospheric field.
- Motion: coherent noise drifts at uTime times 0.035. No pointer response, particles, rapid pulses, camera motion, or hue cycling.
- Composition: one broad diagonal fluid band plus one quieter echo, biased slightly toward the right while remaining visible behind the left copy.
- Legibility: add a black CSS veil over the canvas, strongest behind the left copy. The title, summary, actions, and portrait remain unchanged.
- The canvas is not an image background and must not load or generate any raster asset.

Use this exact WebGL2 vertex shader:

    #version 300 es
    in vec2 aPosition;

    void main() {
      gl_Position = vec4(aPosition, 0.0, 1.0);
    }

Use this exact WebGL2 fragment shader:

    #version 300 es
    precision highp float;

    uniform vec2 uResolution;
    uniform float uTime;
    out vec4 outColor;

    float hash21(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    float valueNoise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash21(i), hash21(i + vec2(1.0, 0.0)), f.x),
        mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), f.x),
        f.y
      );
    }

    float fbm(vec2 p) {
      float value = 0.0;
      float amplitude = 0.5;
      mat2 rotation = mat2(0.80, -0.60, 0.60, 0.80);

      for (int octave = 0; octave < 4; octave++) {
        value += amplitude * valueNoise(p);
        p = rotation * p * 2.03 + 17.17;
        amplitude *= 0.5;
      }

      return value;
    }

    void main() {
      vec2 resolution = max(uResolution, vec2(1.0));
      vec2 uv = (gl_FragCoord.xy - 0.5 * resolution) /
        min(resolution.x, resolution.y);
      float time = uTime * 0.035;
      float noiseField = fbm(uv * 1.35 + vec2(time, -time * 0.52));
      float sweep =
        uv.y +
        0.18 * sin(uv.x * 1.4 + time * 2.0) +
        (noiseField - 0.5) * 0.34;
      float primaryBand = 1.0 - smoothstep(0.0, 0.10, abs(sweep + 0.08));
      float echoBand = 1.0 - smoothstep(0.0, 0.065, abs(sweep - 0.26));
      float rightBias = smoothstep(-0.65, 0.70, uv.x);
      float vignette =
        1.0 - smoothstep(0.55, 1.25, length(uv * vec2(0.72, 1.0)));
      float atmosphere = smoothstep(0.35, 0.78, noiseField) * 0.035;
      float energy =
        (primaryBand * 0.24 + echoBand * 0.08 + atmosphere) *
        (0.45 + 0.55 * rightBias) *
        vignette;
      float grain =
        (hash21(gl_FragCoord.xy + floor(uTime * 3.0)) - 0.5) * 0.012;
      vec3 black = vec3(0.0);
      vec3 vermilion = vec3(0.93, 0.20, 0.055);
      vec3 color = mix(black, vermilion, energy);
      color = max(vec3(0.0), color + grain * vignette);
      outColor = vec4(color, 1.0);
    }

Runtime specification:

- Create src/app/components/HeroShader.js as a client component.
- Render one canvas with class hero__shader and aria-hidden true.
- Request webgl2 with alpha false, antialias false, depth false, stencil false, preserveDrawingBuffer false, and powerPreference low-power.
- Render a single full-screen triangle using vertices -1,-1, 3,-1, -1,3.
- Cap device pixel ratio at 1.25.
- Cap drawing at 30 frames per second by skipping frames whose timestamp is less than 33.333ms after the last draw.
- Use ResizeObserver to resize the backing store only when the canvas box changes. Set uResolution from the backing-store width and height.
- Use IntersectionObserver with threshold 0.01 and document.visibilityState to start and stop requestAnimationFrame. There must be no live animation loop while the hero is offscreen or the page is hidden.
- Observe window.matchMedia with prefers-reduced-motion: reduce. In reduced motion, render exactly one frame with uTime 0 and do not schedule requestAnimationFrame.
- If WebGL2, shader compilation, or program linking fails, leave the existing pure-black CSS background visible and do not throw during rendering.
- On unmount, cancel requestAnimationFrame, disconnect both observers, remove media-query and visibility listeners, and delete the WebGL buffer, program, and shaders.

## Repo conventions to follow

- Client-side motion components live in src/app/components.
- The hero is defined in src/app/components/PortfolioHome.js:328-439.
- Existing hero layer order is copy at z-index 4 and media at z-index 2. The shader must use z-index 0 and the legibility veil must use z-index 1.
- Existing reduced-motion behavior uses Framer Motion useReducedMotion in the hero and a global media query in src/app/globals.css:723-738. The canvas also needs its own matchMedia branch because global CSS cannot stop a JavaScript render loop.
- Exact black comes from var(--bg-dark) after plan 002. Do not introduce a green-tinted fallback.

## Steps

1. Create src/app/components/HeroShader.js with the exact vertex and fragment shader sources above.
2. Add small local compileShader and createProgram helpers. Compile errors must return null after logging one concise development-only console warning; never retry in a loop.
3. In the component effect, initialize WebGL2, upload the single-triangle buffer, resolve aPosition, uResolution, and uTime, and draw the first frame.
4. Implement the exact resize, 30fps cap, offscreen pause, hidden-page pause, reduced-motion static frame, and cleanup behavior from the runtime specification.
5. Import HeroShader in src/app/components/PortfolioHome.js and render it as the first child of the hero section, before hero__media and hero__copy. Do not pass pointer coordinates or scroll progress into it.
6. In src/app/globals.css, add:

       .hero__shader {
         position: absolute;
         z-index: 0;
         inset: 5.25rem 0 0;
         width: 100%;
         height: calc(100% - 5.25rem);
         display: block;
         pointer-events: none;
       }

7. Replace the current clipped .hero::before polygon with this legibility veil:

       .hero::before {
         content: "";
         position: absolute;
         z-index: 1;
         inset: 5.25rem 0 0;
         pointer-events: none;
         background:
           linear-gradient(
             90deg,
             rgba(0, 0, 0, 0.48) 0%,
             rgba(0, 0, 0, 0.20) 46%,
             rgba(0, 0, 0, 0.08) 100%
           ),
           linear-gradient(
             180deg,
             rgba(0, 0, 0, 0.04) 55%,
             rgba(0, 0, 0, 0.30) 100%
           );
       }

8. Inside the existing max-width 768px query, set both .hero__shader and .hero::before to inset-block-start 4.5rem, and set .hero__shader height to calc(100% - 4.5rem). Remove the old mobile clip-path declaration.
9. Do not change hero__copy, hero__media, hero__portrait, their entrance transitions, or their scroll transforms.

## Boundaries

- Do NOT use a photographic, generated, raster, SVG, or CSS background image.
- Do NOT add pointer parallax, mouse listeners, scroll listeners, particles, chromatic green, or hue rotation.
- Do NOT add Three.js, React Three Fiber, GSAP, or any dependency.
- Do NOT exceed 30fps or a 1.25 device-pixel-ratio cap.
- Do NOT animate while offscreen, while the page is hidden, or when reduced motion is requested.
- Do NOT change the hero text, portrait, media field, actions, dimensions, or responsive composition.
- Do NOT move the shader above z-index 1; it must never reduce text contrast.
- If the cited Hero or hero CSS structure has materially changed since this plan was written, STOP and report instead of improvising.

## Verification

- **Mechanical**: run npm run build; expect a successful production build with no new lint or compilation warnings.
- **Fallback check**: temporarily make getContext return null. The hero must stay pure black, retain all content, and throw no runtime error.
- **Desktop feel check**: at 1440x900 and 1920x1080, remain on the hero for 20 seconds. Confirm:
  - the field moves slowly enough to feel atmospheric rather than decorative;
  - vermilion never competes with the orange title line or action;
  - the copy stays clearly readable over every shader phase;
  - the existing portrait and media scroll choreography is unchanged.
- **Performance check**: in the Performance panel, confirm draw calls are capped near 30fps, canvas resolution never exceeds CSS size times 1.25, and no layout or style recalculation is caused per frame.
- **Lifecycle check**: scroll the hero fully offscreen and switch tabs. Confirm requestAnimationFrame stops in both cases and resumes with no visible time jump.
- **Responsive check**: test 390x844 and 320x680. Confirm the canvas begins below the 4.5rem header, has no accidental overflow, and does not change hero height.
- **Reduced motion**: emulate prefers-reduced-motion, reload, and confirm one static shader frame renders with no live requestAnimationFrame callback.
- **Done when**: the hero has a subtle slow shader on pure black, uses no image background, preserves existing content and scroll motion, stays readable, and consumes no animation work when it is not visible.
