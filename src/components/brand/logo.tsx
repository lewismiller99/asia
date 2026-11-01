import { BRANDIT_PATH, CHINA_PATH, CHINA_WIDTH } from "./logo-paths";

/*
 * The approved Brand It China identity, reconstructed as scalable vector.
 *
 * Composition (do not change proportions without approval):
 *  - "brand it" lowercase wordmark, heavy weight, tight tracking
 *  - an elongated horizontal rule running from the wordmark baseline
 *  - a small red Chinese seal sitting on the far end of that rule
 *  - "china" letterspaced beneath the wordmark, left aligned
 *
 * Geometry is expressed in wordmark units where the wordmark is set at a
 * font size of 100 with its baseline at y = 0.
 */
export const LOGO_GEOMETRY = {
  wordmarkWidth: 356,
  chinaScale: 0.3,
  chinaY: 38,
  lineStart: 378,
  lineEnd: 760,
  lineThickness: 3.2,
  sealSize: 38,
  top: -78,
  bottom: 48,
} as const;

const G = LOGO_GEOMETRY;
export const LOGO_VIEWBOX = `0 ${G.top} ${G.lineEnd} ${G.bottom - G.top}`;
export const LOGO_ASPECT = G.lineEnd / (G.bottom - G.top);

export type LogoTone = "light" | "dark";

type SealProps = {
  size?: number | string;
  className?: string;
  title?: string;
};

/**
 * The red seal: 中国 ("China") drawn as uniform strokes inside a rounded
 * square, in the manner of a carved name seal. Used alone as the favicon,
 * the mobile mark and the closing frame of videos.
 */
export function Seal({ size = 40, className, title = "Brand It China seal" }: SealProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={title}
    >
      <SealGroup />
    </svg>
  );
}

function SealGroup({ x = 0, y = 0, scale = 1, className }: { x?: number; y?: number; scale?: number; className?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g className={className}>
      <rect width="100" height="100" rx="8" fill="var(--color-seal, #C8102E)" />
      <path
        d="M30,16 H70 V38 H30 Z M50,6 V50"
        fill="none"
        stroke="#fff"
        strokeWidth="7"
        strokeLinecap="square"
      />
      <path
        d="M20,56 H80 V94 H20 Z M34,65 H66 M34,75 H66 M34,85 H66 M50,65 V85 M66,80 l3,3"
        fill="none"
        stroke="#fff"
        strokeWidth="7"
        strokeLinecap="square"
      />
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
  /** Hide the "china" descriptor for very compact placements. */
  compact?: boolean;
  title?: string;
};

/** Full lockup: wordmark, rule, seal and "china". */
export function Logo({ tone = "dark", className, compact = false, animate = false, title = "Brand It China" }: LogoProps) {
  const ink = tone === "light" ? "#FFFFFF" : "#0A0A0A";
  const sealScale = G.sealSize / 100;
  const sealX = G.lineEnd - G.sealSize;
  const sealY = -G.sealSize - G.lineThickness * 1.6;
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={`${animate ? "logo-animate " : ""}${className ?? ""}`}
      role="img"
      aria-label={title}
      preserveAspectRatio="xMinYMid meet"
    >
      <path d={BRANDIT_PATH} fill={ink} />
      {!compact && (
        <g transform={`translate(2 ${G.chinaY}) scale(${G.chinaScale})`}>
          <path d={CHINA_PATH} fill={ink} />
        </g>
      )}
      <rect
        x={G.lineStart}
        y={-G.lineThickness}
        width={G.lineEnd - G.lineStart}
        height={G.lineThickness}
        fill={ink}
        className="logo-rule"
      />
      <SealGroup x={sealX} y={sealY} scale={sealScale} className="logo-seal" />
    </svg>
  );
}

/** Wordmark only ("brand it" over "china"), for tight spaces such as the mobile header. */
export function Wordmark({ tone = "dark", className, title = "Brand It China" }: LogoProps) {
  const ink = tone === "light" ? "#FFFFFF" : "#0A0A0A";
  const width = Math.max(G.wordmarkWidth, CHINA_WIDTH * G.chinaScale + 2);
  return (
    <svg
      viewBox={`0 ${G.top} ${width} ${G.bottom - G.top}`}
      className={className}
      role="img"
      aria-label={title}
      preserveAspectRatio="xMinYMid meet"
    >
      <path d={BRANDIT_PATH} fill={ink} />
      <g transform={`translate(2 ${G.chinaY}) scale(${G.chinaScale})`}>
        <path d={CHINA_PATH} fill={ink} />
      </g>
    </svg>
  );
}
