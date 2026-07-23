// src/components/ui/SectionHeader.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] as const, delay },
  }),
};

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-[700px] pb-12",
        align === "center" ? "mx-auto text-center pt-20" : "text-left pt-16",
        className
      )}
    >
      {eyebrow && (
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          custom={0}
          className="text-[0.7rem] font-semibold tracking-[0.18em] uppercase mb-4"
          style={{ color: "var(--orange-soft)" }}
        >
          {eyebrow}
        </motion.p>
      )}

      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        custom={0.1}
        className="font-display font-bold mb-4"
        style={{
          fontSize: "clamp(1.8rem, 4vw, 3rem)",
          letterSpacing: "-0.03em",
          lineHeight: 1.15,
          color: "var(--text-primary)",
        }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          custom={0.2}
          className="text-base leading-[1.7] max-w-[500px]"
          style={{
            color: "var(--text-secondary)",
            margin: align === "center" ? "0 auto" : "0",
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
