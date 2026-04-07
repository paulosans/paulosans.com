"use client";

import { motion } from "framer-motion";
import { useMemojiContext } from "./components/MemojiContext";

export default function Template({ children }: { children: React.ReactNode }) {
  const { caseExpanding } = useMemojiContext();

  return (
    <motion.div
      id="page-template"
      className="page-template-wrapper"
      initial={{ opacity: 0, y: caseExpanding ? 0 : 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
