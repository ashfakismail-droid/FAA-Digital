import type { Variants, Transition } from "framer-motion";

export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const springSoft: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 30,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

export function staggerContainer(stagger = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

export const viewportOnce = { once: true, margin: "-80px" } as const;

export function textReveal(delay = 0): Variants {
  return {
    hidden: { opacity: 0, y: "110%" },
    visible: {
      opacity: 1,
      y: "0%",
      transition: { duration: 0.7, ease: EASE_OUT, delay },
    },
  };
}
