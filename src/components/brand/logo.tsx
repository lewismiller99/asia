import {
  LOGO_HEIGHT,
  LOGO_VIEWBOX,
  LOGO_WIDTH,
  SEAL_BACKGROUND_PATHS,
  SEAL_BOUNDS,
  SEAL_GLYPH_PATHS,
  WORDMARK_HEIGHT,
  WORDMARK_PATHS,
  WORDMARK_WIDTH,
  type ArtPath,
} from "./logo-paths";

/*
 * The approved Brand It China identity, drawn from the official brand pack
 * outlines (brand/official). Never retype or rebuild the mark: everything
 * here places the supplied paths.
 *
 * Versions (per the guidelines):
 *  - Primary: charcoal wordmark, vermilion seal, for light backgrounds.
 *  - Reverse: white wordmark, vermilion seal, for dark backgrounds.
 *  - Mono: single ink; the seal character is a knockout.
 *  - Wordmark: no seal, for limited production uses.
 *  - Seal: standalone, for avatars and supporting details.
 */

export const BRAND_CHARCOAL = "#202020";
export const BRAND_VERMILION = "#E63329";
export const BRAND_WHITE = "#FFFFFF";

export const LOGO_ASPECT = LOGO_WIDTH / LOGO_HEIGHT;
export const WORDMARK_ASPECT = WORDMARK_WIDTH / WORDMARK_HEIGHT;
export const SEAL_RATIO = SEAL_BOUNDS.width / SEAL_BOUNDS.height;
export const SEAL_VIEWBOX = `0 0 ${SEAL_BOUNDS.width} ${SEAL_BOUNDS.height}`;
export { LOGO_VIEWBOX };
export const WORDMARK_VIEWBOX = `0 0 ${WORDMARK_WIDTH} ${WORDMARK_HEIGHT}`;

export type LogoTone = "light" | "dark";
export type LogoVersion = "colour" | "mono";

function paths(list: ArtPath[], fill: string, className?: string) {
  return (
    <g fill={fill} className={className}>
      {list.map((p, i) => (
        <path key={i} d={p.d} transform={p.tx || p.ty ? `translate(${p.tx},${p.ty})` : undefined} />
      ))}
    </g>
  );
}

/**
 * Plain element forms. These are functions, not components, so renderers
 * that cannot expand React components inside <svg> (next/og) still work.
 */
export function logoArtElements({
  ink,
  version = "colour",
  sealColor = BRAND_VERMILION,
  animate = false,
}: {
  ink: string;
  version?: LogoVersion;
  sealColor?: string;
  animate?: boolean;
}) {
  const mono = version === "mono";
  return (
    <g>
      {paths(WORDMARK_PATHS, ink)}
      <g className={animate ? "logo-seal" : undefined}>
        {paths(SEAL_BACKGROUND_PATHS, mono ? ink : sealColor)}
        {paths(SEAL_GLYPH_PATHS, mono ? "var(--logo-knockout, #FFFFFF)" : BRAND_WHITE)}
      </g>
    </g>
  );
}

export function sealArtElements({ color = BRAND_VERMILION, glyph = BRAND_WHITE }: { color?: string; glyph?: string } = {}) {
  return (
    <g transform={`translate(${-SEAL_BOUNDS.x},${-SEAL_BOUNDS.y})`}>
      {paths(SEAL_BACKGROUND_PATHS, color)}
      {paths(SEAL_GLYPH_PATHS, glyph)}
    </g>
  );
}

type LogoProps = {
  /** "light" is the Reverse version (white wordmark) for dark backgrounds. */
  tone?: LogoTone;
  version?: LogoVersion;
  className?: string;
  /** Land the seal on first paint (hero only). */
  animate?: boolean;
  title?: string;
};

/** Full lockup: wordmark, long t stroke and seal. */
export function Logo({ tone = "dark", version = "colour", className, animate = false, title = "Brand It China" }: LogoProps) {
  const ink = tone === "light" ? BRAND_WHITE : BRAND_CHARCOAL;
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={`${animate ? "logo-animate " : ""}${className ?? ""}`}
      role="img"
      aria-label={title}
      preserveAspectRatio="xMinYMid meet"
      style={version === "mono" ? ({ "--logo-knockout": tone === "light" ? BRAND_CHARCOAL : BRAND_WHITE } as React.CSSProperties) : undefined}
    >
      {logoArtElements({ ink, version, animate })}
    </svg>
  );
}

/** Wordmark only (no seal), for limited production uses. */
export function Wordmark({ tone = "dark", className, title = "Brand It China" }: LogoProps) {
  const ink = tone === "light" ? BRAND_WHITE : BRAND_CHARCOAL;
  return (
    <svg viewBox={WORDMARK_VIEWBOX} className={className} role="img" aria-label={title} preserveAspectRatio="xMinYMid meet">
      {paths(WORDMARK_PATHS, ink)}
    </svg>
  );
}

type SealProps = {
  /** Rendered height in pixels; the width follows the artwork's ratio. */
  size?: number;
  className?: string;
  title?: string;
  /** "red" (default), "black" or "white" single ink versions from the pack. */
  variant?: "red" | "black" | "white";
};

/** The standalone seal: favicon, avatars, supporting details, closing frames. */
export function Seal({ size = 40, className, title = "Brand It China seal", variant = "red" }: SealProps) {
  const color = variant === "red" ? BRAND_VERMILION : variant === "black" ? BRAND_CHARCOAL : BRAND_WHITE;
  const glyph = variant === "white" ? BRAND_CHARCOAL : BRAND_WHITE;
  return (
    <svg viewBox={SEAL_VIEWBOX} height={size} width={size * SEAL_RATIO} className={className} role="img" aria-label={title}>
      {sealArtElements({ color, glyph })}
    </svg>
  );
}
