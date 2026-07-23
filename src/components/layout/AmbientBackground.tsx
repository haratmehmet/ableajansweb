"use client";

// src/components/layout/AmbientBackground.tsx
export default function AmbientBackground() {
  return (
    <>
      <div className="ambient-bg" aria-hidden="true"></div>
      <div className="grid-lines" aria-hidden="true"></div>
      <div className="noise-layer" aria-hidden="true"></div>
    </>
  );
}
