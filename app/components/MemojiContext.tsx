"use client";

import { createContext, useContext } from "react";

interface MemojiCtx {
  setHovered: (v: boolean) => void;
  setTargetRect: (rect: { x: number; y: number; width: number; height: number } | null) => void;
  setPhotoVisible: (v: boolean) => void;
  // Brand shape (orange blob / case logo)
  casesHovered: boolean;
  setCasesHovered: (v: boolean) => void;
  activeCaseIndex: number;
  setActiveCaseIndex: (i: number) => void;
  // Hero text animation ("cases" → "itaú")
  heroLanded: boolean;
  heroAnimating: boolean;
  startHeroAnimation: () => void;
}

export const MemojiContext = createContext<MemojiCtx>({
  setHovered: () => {},
  setTargetRect: () => {},
  setPhotoVisible: () => {},
  casesHovered: false,
  setCasesHovered: () => {},
  activeCaseIndex: 0,
  setActiveCaseIndex: () => {},
  heroLanded: false,
  heroAnimating: false,
  startHeroAnimation: () => {},
});

export const useMemojiContext = () => useContext(MemojiContext);
