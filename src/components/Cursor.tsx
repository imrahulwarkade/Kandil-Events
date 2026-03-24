"use client";

import { useEffect, useRef, useState } from "react";
import { useHoverInteractive } from "@/src/hooks/useCursor";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const hoverRef = useRef(false);
  const rafRef = useRef(0);
  const [enabled, setEnabled] = useState(false);

  const hoverInteractive = useHoverInteractive(enabled);

  useEffect(() => {
    hoverRef.current = hoverInteractive;
  }, [hoverInteractive]);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      setEnabled(fine.matches && !reduced.matches);
    };
    sync();
    fine.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (enabled) {
      document.body.classList.add("custom-cursor-enabled");
    } else {
      document.body.classList.remove("custom-cursor-enabled");
    }
    return () => document.body.classList.remove("custom-cursor-enabled");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const loop = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;
      const m = mouseRef.current;
      const r = ringPosRef.current;
      const hover = hoverRef.current;

      if (dot) {
        dot.style.left = `${m.x}px`;
        dot.style.top = `${m.y}px`;
        dot.style.transform = "translate(-50%, -50%)";
      }

      r.x += (m.x - r.x) * 0.18;
      r.y += (m.y - r.y) * 0.18;

      if (ring) {
        ring.style.left = `${r.x}px`;
        ring.style.top = `${r.y}px`;
        const scale = hover ? 2 : 1;
        const opacity = hover ? 0.3 : 0.6;
        ring.style.transform = `translate(-50%, -50%) scale(${scale})`;
        ring.style.opacity = String(opacity);
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-gold"
        aria-hidden
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-9 w-9 rounded-full border border-gold"
        aria-hidden
      />
    </>
  );
}
