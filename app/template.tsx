"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useMemojiContext } from "./components/MemojiContext";

export default function Template({ children }: { children: React.ReactNode }) {
  const { caseExpanding } = useMemojiContext();

  // Lazy init: read once at mount. If returning from a case page, skip the y slide-up.
  const [initialY] = useState(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("casesReturnIndex") !== null) return 0;
    return 18;
  });

  return (
    <motion.div
      id="page-template"
      className="page-template-wrapper"
      initial={{ opacity: 0, y: caseExpanding ? 0 : initialY }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
