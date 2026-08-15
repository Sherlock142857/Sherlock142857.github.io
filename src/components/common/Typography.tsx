import type { ElementType, ReactNode } from "react";

interface TypographyProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

export function Display({ as: Tag = "h1", className = "", children }: TypographyProps) {
  return <Tag className={`t-display ${className}`.trim()}>{children}</Tag>;
}

export function Title({ as: Tag = "h1", className = "", children }: TypographyProps) {
  return <Tag className={`t-title ${className}`.trim()}>{children}</Tag>;
}

export function Section({ as: Tag = "h2", className = "", children }: TypographyProps) {
  return <Tag className={`t-section ${className}`.trim()}>{children}</Tag>;
}

export function Meta({ as: Tag = "span", className = "", children }: TypographyProps) {
  return <Tag className={`t-meta ${className}`.trim()}>{children}</Tag>;
}

export function Body({ as: Tag = "p", className = "", children }: TypographyProps) {
  return <Tag className={`t-body ${className}`.trim()}>{children}</Tag>;
}
