"use client";

import { createContext, useContext } from "react";

interface MemojiCtx {
  setHovered: (v: boolean) => void;
  setTargetRect: (rect: { x: number; y: number; width: number; height: number } | null) => void;
  setPhotoVisible: (v: boolean) => void;
}

export const MemojiContext = createContext<MemojiCtx>({
  setHovered: () => {},
  setTargetRect: () => {},
  setPhotoVisible: () => {},
});

export const useMemojiContext = () => useContext(MemojiContext);
