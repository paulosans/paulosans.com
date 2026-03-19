"use client";

import React from "react";
import { useRouter } from "next/navigation";

const EXIT_MS = 260;

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

/**
 * Drop-in replacement for Next.js <Link> that:
 *  1. Fades out the current page (#page-template) before navigating
 *  2. Lets template.tsx handle the enter animation of the new page
 */
export function TransitionLink({ href, onClick, children, ...rest }: Props) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.(e as React.MouseEvent<HTMLAnchorElement>);

    // Don't navigate for anchor-only hrefs (disabled items, etc.)
    if (!href || href === "#" || href.startsWith("#")) return;

    const el = document.getElementById("page-template");
    if (el) {
      el.style.transition = `opacity ${EXIT_MS}ms ease, transform ${EXIT_MS}ms ease`;
      el.style.opacity = "0";
      el.style.transform = "translateY(-10px)";
    }

    setTimeout(() => router.push(href), EXIT_MS);
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
