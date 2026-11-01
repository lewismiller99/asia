import {
  ASCENDER,
  BRANDIT_INK_RIGHT,
  BRANDIT_PATH,
  CHINA_INK_RIGHT,
  CHINA_PATH,
  CROSSBAR_BOTTOM,
  CROSSBAR_TOP,
  SEAL_GLYPH_BOX,
  SEAL_GLYPH_PATH,
} from "./logo-paths";

/*
 * The approved Brand It China identity as scalable vector.
 *
 * Composition, measured from the approved artwork (do not change without
 * approval):
 *  - "brand it" on the first line, "china" on the second, both at the same
 *    size, the second line right aligned to the "t" and set one ascender
 *    height below the first (the lines almost touch).
 *  - The crossbar of the "t" continues as a long rule to the right.
 *  - A tall red seal carrying 创 ("create") sits just beyond the rule,
 *    centred on it.
 *
 * Geometry is expressed in logo units where the wordmark is set at a font
 * size of 100 with the first baseline at y = 0.
 */
const H = ASCENDER;
const BAR_T = CROSSBAR_TOP;
const BAR_B = CROSSBAR_BOTTOM;
const BAR_MID = (BAR_T + BAR_B) / 2;

export const LOGO_GEOMETRY = {
  ascender: H,
  line2Baseline: H * 1.0,
  chinaX: BRANDIT_INK_RIGHT - CHINA_INK_RIGHT,
  ruleStart: BRANDIT_INK_RIGHT - 0.5,
  ruleLength: H * 1.2,
  ruleTop: BAR_T,
  ruleThickness: BAR_B - BAR_T,
  sealGap: H * 0.17,
  sealWidth: H * 0.38,
  sealHeight: H * 0.58,
  sealRadius: H * 0.06,
} as const;

const G = LOGO_GEOMETRY;
const RULE_END = G.ruleStart + G.ruleLength;
const SEAL_X = RULE_END + G.sealGap;
const SEAL_Y = BAR_MID - G.sealHeight / 2;
const TOP = -H - 2;
const BOTTOM = G.line2Baseline + 3;
const RIGHT = SEAL_X + G.sealWidth + 1;

export const LOGO_VIEWBOX = `0 ${TOP} ${RIGHT} ${BOTTOM - TOP}`;
export const LOGO_ASPECT = RIGHT / (BOTTOM - TOP);
export const WORDMARK_VIEWBOX = `0 ${TOP} ${BRANDIT_INK_RIGHT + 1} ${BOTTOM - TOP}`;

/** Seal proportions, shared by the favicon and video frames. */
export const SEAL_RATIO = G.sealWidth / G.sealHeight;

export type LogoTone = "light" | "dark";

/**
 * The seal glyph scaled into a box of the given width and height, with the
 * character filling about 90 percent of the width as in the artwork.
 */
export function SealArt({
  width,
  height,
  radius,
  className,
  color = "var(--color-seal, #E02619)",
}: {
  width: number;
  height: number;
  radius?: number;
  className?: string;
  /** Literal colour for renderers without CSS variables (Open Graph, icons). */
  color?: string;
}) {
  const r = radius ?? width * 0.16;
  const box = SEAL_GLYPH_BOX;
  const glyphW = box.x2 - box.x1;
  const glyphH = box.y2 - box.y1;
  const scale = Math.min((width * 0.9) / glyphW, (height * 0.82) / glyphH);
  const tx = width / 2 - ((box.x1 + box.x2) / 2) * scale;
  const ty = height / 2 - ((box.y1 + box.y2) / 2) * scale;
  return (
    <g className={className}>
      <rect width={width} height={height} rx={r} fill={color} />
      <g transform={`translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${scale.toFixed(4)})`}>
        <path d={SEAL_GLYPH_PATH} fill="#fff" />
      </g>
    </g>
  );
}

/**
 * Plain element forms for renderers that do not expand React components
 * inside <svg> (next/og's Satori). Call these as functions, not as JSX tags.
 */
export function sealArtElements(opts: { width: number; height: number; radius?: number; color?: string }) {
  return SealArt({ ...opts, color: opts.color ?? "#E02619" });
}

export function logoArtElements(opts: { ink: string; sealColor?: string }) {
  return LogoArt({ ink: opts.ink, sealColor: opts.sealColor ?? "#E02619" });
}

type SealProps = {
  /** Rendered height in pixels; width follows the approved ratio. */
  size?: number;
  className?: string;
  title?: string;
};

/** The seal alone: favicon, avatar, watermark, closing frame. */
export function Seal({ size = 40, className, title = "Brand It China seal", color }: SealProps & { color?: string }) {
  const w = 100 * SEAL_RATIO;
  return (
    <svg viewBox={`0 0 ${w.toFixed(2)} 100`} height={size} width={size * SEAL_RATIO} className={className} role="img" aria-label={title}>
      <SealArt width={w} height={100} color={color} />
    </svg>
  );
}

/**
 * The lockup's drawing without its <svg> wrapper, for renderers that need
 * to size and colour it explicitly (Open Graph image, video frames).
 */
export function LogoArt({ ink, sealColor }: { ink: string; sealColor?: string }) {
  return (
    <g>
      <path d={BRANDIT_PATH} fill={ink} />
      <g transform={`translate(${G.chinaX.toFixed(2)} ${G.line2Baseline.toFixed(2)})`}>
        <path d={CHINA_PATH} fill={ink} />
      </g>
      <rect x={G.ruleStart} y={G.ruleTop} width={G.ruleLength + 0.5} height={G.ruleThickness} fill={ink} className="logo-rule" />
      <g transform={`translate(${SEAL_X.toFixed(2)} ${SEAL_Y.toFixed(2)})`}>
        {/* Called as a function, not a tag, so Satori (next/og) can serialise it. */}
        {SealArt({ width: G.sealWidth, height: G.sealHeight, radius: G.sealRadius, className: "logo-seal", color: sealColor })}
      </g>
    </g>
  );
}

type LogoProps = {
  /** "light" renders a white wordmark for dark backgrounds. */
  tone?: LogoTone;
  className?: string;
  /** Draw the rule and land the seal on first paint (hero only). */
  animate?: boolean;
  title?: string;
};

/** Full lockup: two line wordmark, rule and seal. */
export function Logo({ tone = "dark", className, animate = false, title = "Brand It China" }: LogoProps) {
  const ink = tone === "light" ? "#FFFFFF" : "#0A0A0A";
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={`${animate ? "logo-animate " : ""}${className ?? ""}`}
      role="img"
      aria-label={title}
      preserveAspectRatio="xMinYMid meet"
    >
      <LogoArt ink={ink} />
    </svg>
  );
}

/** Wordmark only (both lines, no rule or seal) for very tight placements. */
export function Wordmark({ tone = "dark", className, title = "Brand It China" }: LogoProps) {
  const ink = tone === "light" ? "#FFFFFF" : "#0A0A0A";
  return (
    <svg viewBox={WORDMARK_VIEWBOX} className={className} role="img" aria-label={title} preserveAspectRatio="xMinYMid meet">
      <path d={BRANDIT_PATH} fill={ink} />
      <g transform={`translate(${G.chinaX.toFixed(2)} ${G.line2Baseline.toFixed(2)})`}>
        <path d={CHINA_PATH} fill={ink} />
      </g>
    </svg>
  );
}
