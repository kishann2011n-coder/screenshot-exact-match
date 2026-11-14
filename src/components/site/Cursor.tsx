import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/** Desktop-only custom cursor: a dot plus a trailing ring that grows over interactive elements. */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<"default" | "link" | "media">("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 32, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 350, damping: 32, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const el = (e.target as HTMLElement | null)?.closest?.("[data-cursor], a, button, [role=button], label, summary") as HTMLElement | null;
      if (!el) {
        setVariant("default");
        setLabel("");
      } else if (el.dataset.cursor) {
        setVariant("media");
        setLabel(el.dataset.cursor);
      } else {
        setVariant("link");
        setLabel("");
      }
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;
  const size = variant === "media" ? 84 : variant === "link" ? 46 : 30;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]" style={{ opacity: visible ? 1 : 0 }}>
      <motion.div
        className="absolute left-0 top-0 grid place-items-center rounded-full border border-gold"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: size, height: size, backgroundColor: variant === "media" ? "oklch(0.8 0.115 80 / 0.9)" : "oklch(0.8 0.115 80 / 0)" }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      >
        {label && <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-ink">{label}</span>}
      </motion.div>
      <motion.div className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-gold" style={{ x, y, translateX: "-50%", translateY: "-50%" }} />
    </div>
  );
}
