import { useId } from "react";
import { SEAL_GLYPH_BOX, SEAL_GLYPH_PATH } from "@/components/brand/logo-paths";

/*
 * Illustrative product concepts, drawn as vector so they are razor sharp at
 * every size and weigh almost nothing. They stand in for client work and
 * must always be labelled as concepts in the interface.
 *
 * Every piece is lit from the upper left. Materials are deliberately
 * restrained: frosted glass, smoked glass, matte black, bone white.
 */

type Material = "frosted" | "smoke" | "matte" | "bone" | "gloss";

type MaterialStops = { offset: number; color: string; opacity?: number }[];

const MATERIALS: Record<Material, MaterialStops> = {
  frosted: [
    { offset: 0, color: "#b9b6b0" },
    { offset: 0.1, color: "#ebe9e4" },
    { offset: 0.3, color: "#fbfaf7" },
    { offset: 0.55, color: "#e3e0da" },
    { offset: 0.82, color: "#c8c4bc" },
    { offset: 1, color: "#8f8b84" },
  ],
  smoke: [
    { offset: 0, color: "#1a1a1a" },
    { offset: 0.12, color: "#4a4a4a" },
    { offset: 0.3, color: "#6b6a68" },
    { offset: 0.55, color: "#3a3a3a" },
    { offset: 0.8, color: "#262626" },
    { offset: 1, color: "#0f0f0f" },
  ],
  matte: [
    { offset: 0, color: "#0d0d0d" },
    { offset: 0.14, color: "#2e2e2e" },
    { offset: 0.3, color: "#3b3b3b" },
    { offset: 0.6, color: "#1e1e1e" },
    { offset: 1, color: "#070707" },
  ],
  bone: [
    { offset: 0, color: "#b7b0a5" },
    { offset: 0.12, color: "#e9e4dc" },
    { offset: 0.32, color: "#faf7f1" },
    { offset: 0.6, color: "#e4ded4" },
    { offset: 0.85, color: "#c6bfb3" },
    { offset: 1, color: "#938b7f" },
  ],
  gloss: [
    { offset: 0, color: "#050505" },
    { offset: 0.08, color: "#3d3d3d" },
    { offset: 0.16, color: "#f0f0f0" },
    { offset: 0.24, color: "#2a2a2a" },
    { offset: 0.6, color: "#161616" },
    { offset: 0.9, color: "#3a3a3a" },
    { offset: 1, color: "#050505" },
  ],
};

function Gradient({ id, material }: { id: string; material: Material }) {
  return (
    <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
      {MATERIALS[material].map((s) => (
        <stop key={s.offset} offset={s.offset} stopColor={s.color} stopOpacity={s.opacity ?? 1} />
      ))}
    </linearGradient>
  );
}

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <Gradient id={`${id}-frosted`} material="frosted" />
      <Gradient id={`${id}-smoke`} material="smoke" />
      <Gradient id={`${id}-matte`} material="matte" />
      <Gradient id={`${id}-bone`} material="bone" />
      <Gradient id={`${id}-gloss`} material="gloss" />
      <linearGradient id={`${id}-shine`} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#fff" stopOpacity="0" />
        <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={`${id}-fade`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#000" stopOpacity="0.35" />
        <stop offset="1" stopColor="#000" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={`${id}-liquid`} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#d9d2c6" stopOpacity="0.6" />
        <stop offset="0.5" stopColor="#f3eee6" stopOpacity="0.85" />
        <stop offset="1" stopColor="#bfb6a8" stopOpacity="0.6" />
      </linearGradient>
      <radialGradient id={`${id}-shadow`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#000" stopOpacity="0.55" />
        <stop offset="0.6" stopColor="#000" stopOpacity="0.18" />
        <stop offset="1" stopColor="#000" stopOpacity="0" />
      </radialGradient>
      <filter id={`${id}-blur`} x="-20%" y="-50%" width="140%" height="200%">
        <feGaussianBlur stdDeviation="3" />
      </filter>
    </defs>
  );
}

type RenderProps = { className?: string; title?: string };

/** The seal as a small label accent: tall vermilion stamp with 创, matching the mark. */
function SealAccent({ x, y, height, glyph = true, transform }: { x: number; y: number; height: number; glyph?: boolean; transform?: string }) {
  const width = height * 0.655;
  const box = SEAL_GLYPH_BOX;
  const scale = Math.min((width * 0.9) / (box.x2 - box.x1), (height * 0.82) / (box.y2 - box.y1));
  const tx = width / 2 - ((box.x1 + box.x2) / 2) * scale;
  const ty = height / 2 - ((box.y1 + box.y2) / 2) * scale;
  return (
    <g transform={`translate(${x} ${y})${transform ? " " + transform : ""}`}>
      <rect width={width} height={height} rx={width * 0.16} fill="#e02619" />
      {glyph && (
        <g transform={`translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${scale.toFixed(4)})`}>
          <path d={SEAL_GLYPH_PATH} fill="#fff" />
        </g>
      )}
    </g>
  );
}

function Shadow({ id, cx, cy, rx, ry }: { id: string; cx: number; cy: number; rx: number; ry: number }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={`url(#${id}-shadow)`} />;
}

/** A frosted glass serum bottle with a black dropper. */
export function SerumDropper({ className, title = "Illustrative serum bottle concept" }: RenderProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg viewBox="0 0 400 520" className={className} role="img" aria-label={title}>
      <Defs id={id} />
      <Shadow id={id} cx={200} cy={486} rx={120} ry={18} />
      {/* body */}
      <rect x="128" y="188" width="144" height="286" rx="14" fill={`url(#${id}-frosted)`} />
      {/* liquid line inside frosted glass */}
      <rect x="138" y="262" width="124" height="204" rx="8" fill={`url(#${id}-liquid)`} opacity="0.5" />
      {/* shoulder */}
      <path d="M128 202 Q128 176 154 172 H246 Q272 176 272 202 V214 H128 Z" fill={`url(#${id}-frosted)`} />
      <rect x="128" y="188" width="144" height="40" fill={`url(#${id}-fade)`} opacity="0.5" />
      {/* neck + collar */}
      <rect x="166" y="150" width="68" height="28" fill={`url(#${id}-smoke)`} />
      <rect x="158" y="120" width="84" height="36" rx="4" fill={`url(#${id}-matte)`} />
      {/* dropper bulb */}
      <rect x="170" y="56" width="60" height="70" rx="22" fill={`url(#${id}-matte)`} />
      <rect x="180" y="62" width="10" height="46" rx="5" fill={`url(#${id}-shine)`} opacity="0.35" />
      {/* pipette visible through glass */}
      <rect x="196" y="178" width="8" height="250" fill="#d7d2ca" opacity="0.55" />
      <rect x="196" y="420" width="8" height="30" rx="4" fill="#cfc9c0" opacity="0.7" />
      {/* glass highlight */}
      <rect x="146" y="210" width="12" height="240" rx="6" fill={`url(#${id}-shine)`} opacity="0.6" />
      {/* label band */}
      <rect x="128" y="330" width="144" height="48" fill="#0a0a0a" opacity="0.92" />
      <rect x="150" y="353" width="40" height="2" fill="#fff" opacity="0.8" />
      <rect x="150" y="360" width="22" height="2" fill="#fff" opacity="0.4" />
      <SealAccent x={236} y={344} height={20} />
    </svg>
  );
}

/** A low, wide matte black cream jar. */
export function CreamJar({ className, title = "Illustrative cream jar concept" }: RenderProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg viewBox="0 0 400 520" className={className} role="img" aria-label={title}>
      <Defs id={id} />
      <Shadow id={id} cx={200} cy={470} rx={150} ry={20} />
      {/* jar body */}
      <rect x="66" y="270" width="268" height="192" rx="20" fill={`url(#${id}-bone)`} />
      <rect x="66" y="270" width="268" height="36" fill={`url(#${id}-fade)`} opacity="0.35" />
      {/* lid */}
      <rect x="58" y="206" width="284" height="76" rx="10" fill={`url(#${id}-matte)`} />
      <ellipse cx="200" cy="206" rx="142" ry="18" fill="#1b1b1b" />
      <ellipse cx="200" cy="204" rx="138" ry="14" fill="#262626" />
      <path d="M72 212 Q200 170 328 212" fill="none" stroke="#fff" strokeOpacity="0.12" strokeWidth="2" />
      {/* lid highlight */}
      <rect x="80" y="214" width="14" height="60" rx="7" fill={`url(#${id}-shine)`} opacity="0.4" />
      {/* seal detail on jar */}
      <SealAccent x={188} y={344} height={36} />
    </svg>
  );
}

/** A tall slim pump bottle (lotion, hair serum). */
export function PumpBottle({ className, title = "Illustrative pump bottle concept" }: RenderProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg viewBox="0 0 400 520" className={className} role="img" aria-label={title}>
      <Defs id={id} />
      <Shadow id={id} cx={200} cy={490} rx={96} ry={14} />
      {/* body */}
      <rect x="146" y="150" width="108" height="330" rx="10" fill={`url(#${id}-smoke)`} />
      <rect x="146" y="150" width="108" height="30" fill={`url(#${id}-fade)`} opacity="0.5" />
      {/* collar */}
      <rect x="160" y="118" width="80" height="36" rx="3" fill={`url(#${id}-matte)`} />
      {/* pump stem */}
      <rect x="190" y="78" width="20" height="44" fill={`url(#${id}-matte)`} />
      {/* pump head with nozzle */}
      <path d="M172 60 H234 Q262 60 262 76 V84 H172 Z" fill={`url(#${id}-matte)`} />
      <rect x="172" y="48" width="60" height="18" rx="5" fill={`url(#${id}-matte)`} />
      {/* highlights */}
      <rect x="158" y="170" width="10" height="290" rx="5" fill={`url(#${id}-shine)`} opacity="0.5" />
      <rect x="232" y="180" width="4" height="270" rx="2" fill="#fff" opacity="0.08" />
      {/* label */}
      <rect x="146" y="300" width="108" height="100" fill="#f3f0ea" />
      <rect x="166" y="330" width="46" height="2" fill="#0a0a0a" />
      <rect x="166" y="338" width="30" height="2" fill="#0a0a0a" opacity="0.5" />
      <SealAccent x={166} y={366} height={22} />
    </svg>
  );
}

/** A matte black supplement jar with a wide cap. */
export function SupplementJar({ className, title = "Illustrative supplement jar concept" }: RenderProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg viewBox="0 0 400 520" className={className} role="img" aria-label={title}>
      <Defs id={id} />
      <Shadow id={id} cx={200} cy={486} rx={130} ry={18} />
      {/* body */}
      <rect x="96" y="150" width="208" height="326" rx="22" fill={`url(#${id}-matte)`} />
      {/* cap */}
      <rect x="104" y="92" width="192" height="68" rx="8" fill={`url(#${id}-gloss)`} />
      <ellipse cx="200" cy="94" rx="96" ry="14" fill="#2a2a2a" />
      <ellipse cx="200" cy="92" rx="92" ry="10" fill="#1a1a1a" />
      {/* grip ribs */}
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={i} x={112 + i * 16} y="104" width="4" height="50" fill="#000" opacity="0.35" />
      ))}
      {/* label block in bone */}
      <rect x="96" y="226" width="208" height="170" fill="#f3f0ea" />
      <rect x="124" y="262" width="88" height="3" fill="#0a0a0a" />
      <rect x="124" y="274" width="60" height="2" fill="#0a0a0a" opacity="0.55" />
      <rect x="124" y="282" width="72" height="2" fill="#0a0a0a" opacity="0.55" />
      <SealAccent x={124} y={342} height={28} />
      <rect x="150" y="356" width="60" height="2" fill="#0a0a0a" opacity="0.5" />
      {/* highlight */}
      <rect x="112" y="166" width="12" height="300" rx="6" fill={`url(#${id}-shine)`} opacity="0.28" />
    </svg>
  );
}

/** A matte black retail box, three quarter view, with the seal. */
export function RetailBox({ className, title = "Illustrative retail box concept" }: RenderProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg viewBox="0 0 400 520" className={className} role="img" aria-label={title}>
      <Defs id={id} />
      <Shadow id={id} cx={200} cy={478} rx={150} ry={20} />
      {/* front face */}
      <path d="M90 170 L250 198 L250 470 L90 442 Z" fill="#141414" />
      {/* side face */}
      <path d="M250 198 L330 150 L330 422 L250 470 Z" fill="#232323" />
      {/* top face */}
      <path d="M90 170 L170 122 L330 150 L250 198 Z" fill="#2f2f2f" />
      {/* edges */}
      <path d="M90 170 L250 198 L330 150" fill="none" stroke="#fff" strokeOpacity="0.14" strokeWidth="1.5" />
      <path d="M250 198 L250 470" fill="none" stroke="#fff" strokeOpacity="0.08" strokeWidth="1.5" />
      {/* front typography: wordmark rule + seal */}
      <path d="M116 300 L186 312" stroke="#fff" strokeWidth="3" />
      <path d="M116 318 L160 326" stroke="#fff" strokeOpacity="0.6" strokeWidth="2" />
      <SealAccent x={208} y={302} height={36} transform="skewY(10)" />
      {/* subtle light on front */}
      <path d="M90 170 L250 198 L250 260 L90 232 Z" fill="#fff" opacity="0.04" />
    </svg>
  );
}

/** Three small ampoules standing together. */
export function AmpouleSet({ className, title = "Illustrative ampoule concept" }: RenderProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const vial = (x: number, h: number, material: Material, cap: Material) => (
    <g key={x}>
      <rect x={x} y={470 - h} width="54" height={h} rx="8" fill={`url(#${id}-${material})`} />
      <rect x={x + 6} y={480 - h} width="6" height={h - 30} rx="3" fill={`url(#${id}-shine)`} opacity="0.5" />
      <rect x={x + 8} y={454 - h} width="38" height="24" rx="3" fill={`url(#${id}-${cap})`} />
      <rect x={x + 14} y={436 - h} width="26" height="20" rx="6" fill={`url(#${id}-${cap})`} />
      <rect x={x} y={470 - h + 100} width="54" height="12" fill="#0a0a0a" opacity="0.9" />
    </g>
  );
  return (
    <svg viewBox="0 0 400 520" className={className} role="img" aria-label={title}>
      <Defs id={id} />
      <Shadow id={id} cx={200} cy={480} rx={150} ry={16} />
      {vial(96, 250, "frosted", "matte")}
      {vial(173, 300, "smoke", "matte")}
      {vial(250, 250, "frosted", "matte")}
    </svg>
  );
}

/** A compact lip or balm stick in matte black. */
export function BalmStick({ className, title = "Illustrative balm stick concept" }: RenderProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg viewBox="0 0 400 520" className={className} role="img" aria-label={title}>
      <Defs id={id} />
      <Shadow id={id} cx={200} cy={488} rx={70} ry={12} />
      <rect x="168" y="250" width="64" height="232" rx="8" fill={`url(#${id}-matte)`} />
      <rect x="164" y="110" width="72" height="146" rx="8" fill={`url(#${id}-gloss)`} />
      <rect x="176" y="124" width="8" height="110" rx="4" fill={`url(#${id}-shine)`} opacity="0.35" />
      <rect x="180" y="400" width="40" height="2" fill="#fff" opacity="0.7" />
      <SealAccent x={180} y={408} height={20} />
    </svg>
  );
}


/** A stand up pouch for powders and sachets (weight management, wellness). */
export function StandUpPouch({ className, title = "Illustrative pouch concept" }: RenderProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg viewBox="0 0 400 520" className={className} role="img" aria-label={title}>
      <Defs id={id} />
      <Shadow id={id} cx={200} cy={482} rx={140} ry={18} />
      <path d="M96 120 H304 L318 470 Q200 492 82 470 Z" fill={`url(#${id}-matte)`} />
      <path d="M96 120 H304 V148 H96 Z" fill="#0a0a0a" />
      <path d="M96 150 H304" stroke="#fff" strokeOpacity="0.2" strokeWidth="2" strokeDasharray="4 4" />
      <path d="M110 150 L96 470" stroke="#fff" strokeOpacity="0.08" strokeWidth="6" />
      <path d="M290 150 L304 470" stroke="#fff" strokeOpacity="0.08" strokeWidth="6" />
      {/* label area */}
      <rect x="132" y="236" width="136" height="150" fill="#f3f0ea" />
      <rect x="152" y="268" width="70" height="3" fill="#0a0a0a" />
      <rect x="152" y="280" width="48" height="2" fill="#0a0a0a" opacity="0.5" />
      <SealAccent x={152} y={336} height={28} />
      <rect x="120" y="140" width="10" height="320" rx="5" fill={`url(#${id}-shine)`} opacity="0.3" />
    </svg>
  );
}

/** A gua sha tool in smoked glass, for the wellness accessory category. */
export function GuaSha({ className, title = "Illustrative wellness accessory concept" }: RenderProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg viewBox="0 0 400 520" className={className} role="img" aria-label={title}>
      <Defs id={id} />
      <Shadow id={id} cx={200} cy={420} rx={150} ry={22} />
      <g transform="rotate(-18 200 300)">
        <path
          d="M110 300 C110 230 170 180 250 186 C318 192 330 248 300 290 C280 318 248 326 222 342 C196 358 178 386 150 386 C122 386 110 350 110 300 Z"
          fill={`url(#${id}-smoke)`}
        />
        <path
          d="M130 296 C132 246 176 206 240 212"
          fill="none"
          stroke={`url(#${id}-shine)`}
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path d="M158 372 C180 368 198 348 214 334" fill="none" stroke="#fff" strokeOpacity="0.15" strokeWidth="3" strokeLinecap="round" />
      </g>
      <rect x="150" y="470" width="100" height="26" fill="#0a0a0a" />
      <rect x="184" y="482" width="32" height="2" fill="#fff" opacity="0.7" />
    </svg>
  );
}

export const productRenders = {
  serum: SerumDropper,
  jar: CreamJar,
  pump: PumpBottle,
  supplement: SupplementJar,
  box: RetailBox,
  ampoules: AmpouleSet,
  balm: BalmStick,
  pouch: StandUpPouch,
  guasha: GuaSha,
} as const;

export type ProductRenderKey = keyof typeof productRenders;
