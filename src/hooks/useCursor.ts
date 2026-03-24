"use client";

import { useEffect, useState } from "react";

/** Tracks whether the pointer is over an interactive element (for cursor ring scale). */
export function useHoverInteractive(enabled: boolean) {
  const [hoverInteractive, setHoverInteractive] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const onPointerOver = (e: PointerEvent) => {
      const t = e.target as Element | null;
      setHoverInteractive(!!t?.closest?.("a, button, [role='button']"));
    };

    window.addEventListener("pointerover", onPointerOver, { capture: true });
    return () =>
      window.removeEventListener("pointerover", onPointerOver, { capture: true });
  }, [enabled]);

  return hoverInteractive;
}
