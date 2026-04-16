"use client";

/**
 * Seamless wavy SVG divider between two sections.
 *
 * topColor    – background of the section above  (CSS variable or hex)
 * bottomColor – background of the section below
 * flip        – mirror the wave horizontally for variety
 * height      – wave height in px (default 72)
 */
export default function WaveDivider({
  topColor,
  bottomColor,
  flip = false,
  height = 72,
}) {
  return (
    <div style={{ background: topColor, lineHeight: 0, display: "block" }}>
      <svg
        viewBox="0 0 1440 72"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height }}
        aria-hidden="true"
      >
        {/*
          1.5-cycle wave: 3 cubic-bezier segments of 480 px each.
          flip=false → dips down first then rises
          flip=true  → rises first then dips (complementary shape)
        */}
        <path
          d={
            flip
              ? "M0,52 C160,12 320,12 480,52 C640,68 800,68 960,40 C1100,18 1280,18 1440,40 L1440,72 L0,72 Z"
              : "M0,20 C160,60 320,60 480,20 C640,4  800,4  960,32 C1100,54 1280,54 1440,32 L1440,72 L0,72 Z"
          }
          style={{ fill: bottomColor }}
        />
      </svg>
    </div>
  );
}
