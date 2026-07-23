import { motion, useReducedMotion } from "framer-motion";

/**
 * Reveal — on-scroll entrance with an eased rise + fade.
 * Respects prefers-reduced-motion (renders instantly, no transform).
 *
 * Props:
 *  - as: element/component to render (default "div")
 *  - delay: seconds before animating
 *  - y: initial vertical offset in px (default 24)
 *  - once: only animate the first time it enters (default true)
 */
export default function Reveal({
  as = "div",
  delay = 0,
  y = 24,
  once = true,
  className,
  children,
  ...props
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Stagger — a container that reveals its <Reveal> / motion children in sequence.
 * Pair with RevealItem for list/grid entrances.
 */
export function Stagger({ className, children, gap = 0.08, once = true, ...props }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once, margin: "-80px" }}
      variants={{ show: { transition: { staggerChildren: gap } } }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ as = "div", y = 20, className, children, ...props }) {
  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
