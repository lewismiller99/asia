import { useId } from "react";
import { SEAL_BOUNDS } from "@/components/brand/logo-paths";
import { sealArtElements } from "@/components/brand/logo";

/*
 * Studio product scenes.
 *
 * Each scene is a lit set: a deep charcoal cyclorama, a polished floor
 * that carries a soft reflection, a key light from the upper left, a cool
 * rim from the right, and a long cast shadow. Products are built from
 * layered gradients so glass reads as glass and matte reads as matte.
 *
 * Everything here is an illustrative concept and must be labelled as such.
 */

type SceneProps = {
  className?: string;
  title: string;
  /** Scene aspect: portrait for gallery slides, landscape for spreads. */
  aspect?: "portrait" | "landscape" | "square";
  /** Light or dark set. */
  set?: "dark" | "light";
  children: (ctx: { id: string }) => React.ReactNode;
  /** Vertical placement of the floor line as a fraction of height. */
  floor?: number;
};

const SIZES = { portrait: [1200, 1500], landscape: [1800, 1125], square: [1400, 1400] } as const;

export function Scene({ className, title, aspect = "portrait", set = "dark", children, floor = 0.8 }: SceneProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [w, h] = SIZES[aspect];
  const floorY = h * floor;
  const dark = set === "dark";
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} role="img" aria-label={title} preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={`${id}-cyc`} cx="0.5" cy="0.42" r="0.75">
          <stop offset="0" stopColor={dark ? "#3a3a3a" : "#ffffff"} />
          <stop offset="0.45" stopColor={dark ? "#1f1f1f" : "#ededed"} />
          <stop offset="1" stopColor={dark ? "#0b0b0b" : "#cfcfcf"} />
        </radialGradient>
        <linearGradient id={`${id}-floor`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={dark ? "#262626" : "#dedede"} />
          <stop offset="1" stopColor={dark ? "#080808" : "#bdbdbd"} />
        </linearGradient>
        <linearGradient id={`${id}-reflection`} gradientUnits="userSpaceOnUse" x1="0" x2="0" y1={floorY} y2={h}>
          <stop offset="0" stopColor="#fff" stopOpacity={dark ? 0.38 : 0.5} />
          <stop offset="0.7" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={`${id}-refmask`}>
          <rect x="0" y="0" width={w} height={h} fill={`url(#${id}-reflection)`} />
        </mask>
        <radialGradient id={`${id}-key`} cx="0.22" cy="0.1" r="0.7">
          <stop offset="0" stopColor="#fff" stopOpacity={dark ? 0.16 : 0.5} />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-contact`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#000" stopOpacity={dark ? 0.75 : 0.45} />
          <stop offset="0.5" stopColor="#000" stopOpacity={dark ? 0.35 : 0.18} />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-soft`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
        <filter id={`${id}-softer`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="40" />
        </filter>
        <filter id={`${id}-grain`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope={dark ? 0.06 : 0.04} />
          </feComponentTransfer>
        </filter>
      </defs>

      {/* cyclorama and floor */}
      <rect width={w} height={h} fill={`url(#${id}-cyc)`} />
      <rect x="0" y={floorY} width={w} height={h - floorY} fill={`url(#${id}-floor)`} />
      <rect x="0" y={floorY - 2} width={w} height="3" fill="#fff" opacity={dark ? 0.06 : 0.35} />
      <rect width={w} height={h} fill={`url(#${id}-key)`} />

      {/* reflection, then shadow, then the product itself */}
      <g mask={`url(#${id}-refmask)`} transform={`translate(0 ${floorY * 2}) scale(1 -1)`} opacity="0.9">
        {children({ id })}
      </g>
      <ellipse cx={w / 2} cy={floorY + 8} rx={w * 0.26} ry={h * 0.03} fill={`url(#${id}-contact)`} />
      <ellipse cx={w * 0.58} cy={floorY + 20} rx={w * 0.34} ry={h * 0.035} fill="#000" opacity={dark ? 0.4 : 0.2} filter={`url(#${id}-softer)`} />
      {children({ id })}

      {/* atmosphere */}
      <rect width={w} height={h} filter={`url(#${id}-grain)`} />
    </svg>
  );
}

/* ------------------------------------------------------------------
   Shared materials
   ------------------------------------------------------------------ */

function Materials({ id }: { id: string }) {
  return (
    <defs>
      {/* frosted glass body: translucent, lit from the left */}
      <linearGradient id={`${id}-frost`} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#8d8d8d" />
        <stop offset="0.08" stopColor="#d9d9d9" />
        <stop offset="0.22" stopColor="#f7f7f7" />
        <stop offset="0.5" stopColor="#e4e4e4" />
        <stop offset="0.8" stopColor="#bdbdbd" />
        <stop offset="0.94" stopColor="#8a8a8a" />
        <stop offset="1" stopColor="#6c6c6c" />
      </linearGradient>
      {/* matte black with a wide soft highlight */}
      <linearGradient id={`${id}-matte`} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#0a0a0a" />
        <stop offset="0.12" stopColor="#2b2b2b" />
        <stop offset="0.3" stopColor="#3d3d3d" />
        <stop offset="0.55" stopColor="#1c1c1c" />
        <stop offset="0.85" stopColor="#111" />
        <stop offset="1" stopColor="#050505" />
      </linearGradient>
      {/* gloss black with a sharp specular streak and a rim */}
      <linearGradient id={`${id}-gloss`} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#000" />
        <stop offset="0.07" stopColor="#333" />
        <stop offset="0.13" stopColor="#f4f4f4" />
        <stop offset="0.19" stopColor="#2a2a2a" />
        <stop offset="0.55" stopColor="#101010" />
        <stop offset="0.88" stopColor="#3a3a3a" />
        <stop offset="0.95" stopColor="#8a8a8a" />
        <stop offset="1" stopColor="#000" />
      </linearGradient>
      {/* bone ceramic */}
      <linearGradient id={`${id}-bone`} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#9a9a9a" />
        <stop offset="0.1" stopColor="#e8e8e8" />
        <stop offset="0.3" stopColor="#fbfbfb" />
        <stop offset="0.6" stopColor="#e6e6e6" />
        <stop offset="0.86" stopColor="#c2c2c2" />
        <stop offset="1" stopColor="#8c8c8c" />
      </linearGradient>
      {/* smoked glass */}
      <linearGradient id={`${id}-smoke`} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#111" />
        <stop offset="0.1" stopColor="#4d4d4d" />
        <stop offset="0.24" stopColor="#777" />
        <stop offset="0.5" stopColor="#3b3b3b" />
        <stop offset="0.8" stopColor="#262626" />
        <stop offset="1" stopColor="#0d0d0d" />
      </linearGradient>
      {/* vertical fade used for shoulders and caps */}
      <linearGradient id={`${id}-shade`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#000" stopOpacity="0.5" />
        <stop offset="1" stopColor="#000" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={`${id}-shadeUp`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#000" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity="0.55" />
      </linearGradient>
      <linearGradient id={`${id}-streak`} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#fff" stopOpacity="0" />
        <stop offset="0.5" stopColor="#fff" stopOpacity="0.7" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={`${id}-rim`} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#fff" stopOpacity="0" />
        <stop offset="0.7" stopColor="#fff" stopOpacity="0" />
        <stop offset="1" stopColor="#fff" stopOpacity="0.35" />
      </linearGradient>
      <linearGradient id={`${id}-liquid`} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#cfcfcf" stopOpacity="0.5" />
        <stop offset="0.45" stopColor="#ffffff" stopOpacity="0.75" />
        <stop offset="1" stopColor="#b5b5b5" stopOpacity="0.5" />
      </linearGradient>
      <filter id={`${id}-blur2`} x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" />
      </filter>
    </defs>
  );
}

function Label({ x, y, w, h, dark = false, seal = true }: { x: number; y: number; w: number; h: number; dark?: boolean; seal?: boolean }) {
  // A clean label: two fine rules and the official seal.
  const sealH = Math.min(h * 0.5, 54);
  const scale = sealH / SEAL_BOUNDS.height;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={dark ? "#141414" : "#f2f2f2"} opacity="0.96" />
      <rect x={x + w * 0.14} y={y + h * 0.36} width={w * 0.34} height={Math.max(2, h * 0.025)} fill={dark ? "#fff" : "#202020"} opacity="0.85" />
      <rect x={x + w * 0.14} y={y + h * 0.5} width={w * 0.2} height={Math.max(2, h * 0.02)} fill={dark ? "#fff" : "#202020"} opacity="0.4" />
      {seal && (
        <g transform={`translate(${x + w * 0.86 - sealH * (SEAL_BOUNDS.width / SEAL_BOUNDS.height)} ${y + h * 0.5 - sealH / 2}) scale(${scale.toFixed(4)})`}>
          {sealArtElements()}
        </g>
      )}
    </g>
  );
}

/* ------------------------------------------------------------------
   Products (all drawn in a 400 x 520 local box, baseline at y = 480)
   ------------------------------------------------------------------ */

type ProductProps = { id: string; x?: number; y?: number; scale?: number };

function wrap(p: ProductProps, children: React.ReactNode) {
  return (
    <g transform={`translate(${p.x ?? 0} ${p.y ?? 0}) scale(${p.scale ?? 1})`}>
      <Materials id={p.id} />
      {children}
    </g>
  );
}

/** Frosted glass serum with a glossy black dropper. */
export function SerumBottle(p: ProductProps) {
  const id = p.id;
  return wrap(
    p,
    <>
      {/* body */}
      <rect x="128" y="190" width="144" height="290" rx="18" fill={`url(#${id}-frost)`} />
      {/* liquid line and pipette seen through the glass */}
      <rect x="140" y="268" width="120" height="200" rx="10" fill={`url(#${id}-liquid)`} opacity="0.55" />
      <rect x="196" y="186" width="9" height="250" fill="#f6f6f6" opacity="0.75" />
      <rect x="194" y="430" width="13" height="26" rx="6" fill="#dcdcdc" opacity="0.85" />
      {/* shoulder */}
      <path d="M128 208 Q128 172 162 170 H238 Q272 172 272 208 V222 H128 Z" fill={`url(#${id}-frost)`} />
      <rect x="128" y="190" width="144" height="48" fill={`url(#${id}-shade)`} opacity="0.35" />
      {/* base darkening */}
      <rect x="128" y="420" width="144" height="60" rx="18" fill={`url(#${id}-shadeUp)`} opacity="0.5" />
      {/* collar and cap */}
      <rect x="166" y="150" width="68" height="26" fill={`url(#${id}-smoke)`} />
      <rect x="156" y="112" width="88" height="42" rx="5" fill={`url(#${id}-gloss)`} />
      <rect x="170" y="46" width="60" height="74" rx="24" fill={`url(#${id}-gloss)`} />
      <rect x="178" y="56" width="7" height="50" rx="3.5" fill={`url(#${id}-streak)`} opacity="0.5" />
      {/* glass highlights */}
      <rect x="144" y="206" width="14" height="250" rx="7" fill={`url(#${id}-streak)`} opacity="0.75" />
      <rect x="256" y="216" width="6" height="230" rx="3" fill="#fff" opacity="0.18" />
      <rect x="128" y="190" width="144" height="290" rx="18" fill={`url(#${id}-rim)`} />
      <Label x={128} y={330} w={144} h={44} dark />
    </>
  );
}

/** Wide bone ceramic cream jar with a gloss black lid. */
export function CreamJar(p: ProductProps) {
  const id = p.id;
  return wrap(
    p,
    <>
      <rect x="64" y="266" width="272" height="214" rx="24" fill={`url(#${id}-bone)`} />
      <rect x="64" y="266" width="272" height="40" fill={`url(#${id}-shade)`} opacity="0.3" />
      <rect x="64" y="420" width="272" height="60" rx="24" fill={`url(#${id}-shadeUp)`} opacity="0.45" />
      <rect x="56" y="198" width="288" height="80" rx="10" fill={`url(#${id}-gloss)`} />
      <ellipse cx="200" cy="198" rx="144" ry="20" fill="#2a2a2a" />
      <ellipse cx="200" cy="196" rx="138" ry="15" fill="#161616" />
      <path d="M74 206 Q200 160 326 206" fill="none" stroke="#fff" strokeOpacity="0.22" strokeWidth="2" />
      <rect x="84" y="208" width="10" height="62" rx="5" fill={`url(#${id}-streak)`} opacity="0.45" />
      <rect x="82" y="290" width="14" height="150" rx="7" fill={`url(#${id}-streak)`} opacity="0.5" />
      <rect x="64" y="266" width="272" height="214" rx="24" fill={`url(#${id}-rim)`} />
      <Label x={64} y={348} w={272} h={56} />
    </>
  );
}

/** Tall smoked glass pump bottle. */
export function PumpBottle(p: ProductProps) {
  const id = p.id;
  return wrap(
    p,
    <>
      <rect x="146" y="150" width="108" height="330" rx="12" fill={`url(#${id}-smoke)`} />
      <rect x="146" y="150" width="108" height="34" fill={`url(#${id}-shade)`} opacity="0.5" />
      <rect x="146" y="420" width="108" height="60" rx="12" fill={`url(#${id}-shadeUp)`} opacity="0.5" />
      <rect x="160" y="118" width="80" height="36" rx="3" fill={`url(#${id}-gloss)`} />
      <rect x="190" y="78" width="20" height="44" fill={`url(#${id}-matte)`} />
      <path d="M172 60 H234 Q262 60 262 76 V84 H172 Z" fill={`url(#${id}-gloss)`} />
      <rect x="172" y="48" width="60" height="18" rx="5" fill={`url(#${id}-gloss)`} />
      <rect x="158" y="170" width="12" height="290" rx="6" fill={`url(#${id}-streak)`} opacity="0.55" />
      <rect x="240" y="180" width="5" height="270" rx="2.5" fill="#fff" opacity="0.14" />
      <rect x="146" y="150" width="108" height="330" rx="12" fill={`url(#${id}-rim)`} />
      <Label x={146} y={300} w={108} h={96} />
    </>
  );
}

/** Matte black supplement jar with a ribbed cap. */
export function SupplementJar(p: ProductProps) {
  const id = p.id;
  return wrap(
    p,
    <>
      <rect x="96" y="150" width="208" height="330" rx="24" fill={`url(#${id}-matte)`} />
      <rect x="104" y="92" width="192" height="68" rx="8" fill={`url(#${id}-gloss)`} />
      <ellipse cx="200" cy="94" rx="96" ry="14" fill="#2c2c2c" />
      <ellipse cx="200" cy="92" rx="92" ry="10" fill="#161616" />
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={i} x={112 + i * 16} y="104" width="4" height="50" fill="#000" opacity="0.4" />
      ))}
      <rect x="96" y="420" width="208" height="60" rx="24" fill={`url(#${id}-shadeUp)`} opacity="0.5" />
      <rect x="112" y="166" width="12" height="300" rx="6" fill={`url(#${id}-streak)`} opacity="0.3" />
      <rect x="96" y="150" width="208" height="330" rx="24" fill={`url(#${id}-rim)`} />
      <Label x={96} y={226} w={208} h={170} />
    </>
  );
}

/** Matte black retail box, three quarter view. */
export function RetailBox(p: ProductProps) {
  const id = p.id;
  const sealH = 42;
  const scale = sealH / SEAL_BOUNDS.height;
  return wrap(
    p,
    <>
      <path d="M90 170 L250 198 L250 480 L90 452 Z" fill="#181818" />
      <path d="M250 198 L330 150 L330 432 L250 480 Z" fill="#262626" />
      <path d="M90 170 L170 122 L330 150 L250 198 Z" fill="#343434" />
      <path d="M90 170 L250 198 L250 262 L90 234 Z" fill="#fff" opacity="0.05" />
      <path d="M90 170 L250 198 L330 150" fill="none" stroke="#fff" strokeOpacity="0.18" strokeWidth="1.5" />
      <path d="M250 198 L250 480" fill="none" stroke="#fff" strokeOpacity="0.1" strokeWidth="1.5" />
      <path d="M116 300 L186 312" stroke="#fff" strokeWidth="3" />
      <path d="M116 318 L160 326" stroke="#fff" strokeOpacity="0.55" strokeWidth="2" />
      <g transform={`translate(208 302) skewY(10) scale(${scale.toFixed(4)})`}>{sealArtElements()}</g>
      <path d="M250 198 L330 150 L330 432 L250 480 Z" fill={`url(#${id}-shadeUp)`} opacity="0.5" />
    </>
  );
}

/** Three slim ampoules. */
export function Ampoules(p: ProductProps) {
  const id = p.id;
  const vial = (x: number, h: number, mat: string) => (
    <g key={x}>
      <rect x={x} y={480 - h} width="54" height={h} rx="10" fill={`url(#${id}-${mat})`} />
      <rect x={x + 7} y={492 - h} width="7" height={h - 36} rx="3.5" fill={`url(#${id}-streak)`} opacity="0.6" />
      <rect x={x + 8} y={464 - h} width="38" height="24" rx="3" fill={`url(#${id}-gloss)`} />
      <rect x={x + 14} y={446 - h} width="26" height="20" rx="6" fill={`url(#${id}-gloss)`} />
      <rect x={x} y={580 - h} width="54" height="14" fill="#141414" opacity="0.95" />
      <rect x={x} y={420} width="54" height="60" rx="10" fill={`url(#${id}-shadeUp)`} opacity="0.45" />
    </g>
  );
  return wrap(
    p,
    <>
      {vial(96, 250, "frost")}
      {vial(173, 300, "smoke")}
      {vial(250, 250, "frost")}
    </>
  );
}

/** Stand up pouch, matte black with a bone label. */
export function Pouch(p: ProductProps) {
  const id = p.id;
  return wrap(
    p,
    <>
      <path d="M96 120 H304 L318 470 Q200 492 82 470 Z" fill={`url(#${id}-matte)`} />
      <path d="M96 120 H304 V148 H96 Z" fill="#0a0a0a" />
      <path d="M96 150 H304" stroke="#fff" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="4 4" />
      <path d="M110 150 L96 470" stroke="#fff" strokeOpacity="0.08" strokeWidth="6" />
      <path d="M290 150 L304 470" stroke="#fff" strokeOpacity="0.08" strokeWidth="6" />
      <rect x="118" y="140" width="12" height="320" rx="6" fill={`url(#${id}-streak)`} opacity="0.35" />
      <Label x={132} y={236} w={136} h={150} />
    </>
  );
}

/** Facial roller: matte black handle, smoked stone roller. */
export function FacialRoller(p: ProductProps) {
  const id = p.id;
  return wrap(
    p,
    <>
      {/* handle */}
      <rect x="182" y="210" width="36" height="270" rx="18" fill={`url(#${id}-matte)`} />
      <rect x="188" y="224" width="6" height="230" rx="3" fill={`url(#${id}-streak)`} opacity="0.5" />
      {/* fork */}
      <path d="M160 206 Q200 176 240 206 V222 Q200 196 160 222 Z" fill={`url(#${id}-gloss)`} />
      <rect x="156" y="150" width="14" height="70" rx="7" fill={`url(#${id}-gloss)`} />
      <rect x="230" y="150" width="14" height="70" rx="7" fill={`url(#${id}-gloss)`} />
      {/* roller stone */}
      <rect x="150" y="110" width="100" height="72" rx="36" fill={`url(#${id}-smoke)`} />
      <rect x="158" y="118" width="84" height="56" rx="28" fill="#000" opacity="0.15" />
      <path d="M164 128 Q200 112 236 128" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="5" strokeLinecap="round" />
      <rect x="150" y="110" width="100" height="72" rx="36" fill={`url(#${id}-rim)`} />
      <rect x="182" y="420" width="36" height="60" rx="18" fill={`url(#${id}-shadeUp)`} opacity="0.5" />
    </>
  );
}

/** Balm stick in gloss and matte black. */
export function BalmStick(p: ProductProps) {
  const id = p.id;
  return wrap(
    p,
    <>
      <rect x="168" y="250" width="64" height="230" rx="9" fill={`url(#${id}-matte)`} />
      <rect x="164" y="110" width="72" height="146" rx="9" fill={`url(#${id}-gloss)`} />
      <rect x="176" y="124" width="8" height="110" rx="4" fill={`url(#${id}-streak)`} opacity="0.4" />
      <rect x="168" y="420" width="64" height="60" rx="9" fill={`url(#${id}-shadeUp)`} opacity="0.5" />
      <Label x={168} y={380} w={64} h={40} dark seal={false} />
    </>
  );
}

/* ------------------------------------------------------------------
   Composed scenes used across the site
   ------------------------------------------------------------------ */

export const scenes = {
  skincare: (props: { className?: string; aspect?: SceneProps["aspect"] }) => (
    <Scene title="Illustrative skincare concept: frosted serum and cream jar" {...props}>
      {({ id }) => (
        <>
          <CreamJar id={id} x={60} y={520} scale={1.6} />
          <SerumBottle id={id} x={500} y={160} scale={2.15} />
        </>
      )}
    </Scene>
  ),
  haircare: (props: { className?: string; aspect?: SceneProps["aspect"] }) => (
    <Scene title="Illustrative haircare concept: smoked glass pump bottle" {...props}>
      {({ id }) => <PumpBottle id={id} x={200} y={0} scale={2.5} />}
    </Scene>
  ),
  supplements: (props: { className?: string; aspect?: SceneProps["aspect"] }) => (
    <Scene title="Illustrative supplement concept: matte jar" {...props}>
      {({ id }) => <SupplementJar id={id} x={150} y={0} scale={2.5} />}
    </Scene>
  ),
  weight: (props: { className?: string; aspect?: SceneProps["aspect"] }) => (
    <Scene title="Illustrative weight management concept: stand up pouch" {...props}>
      {({ id }) => <Pouch id={id} x={150} y={0} scale={2.5} />}
    </Scene>
  ),
  accessories: (props: { className?: string; aspect?: SceneProps["aspect"] }) => (
    <Scene title="Illustrative wellness accessory concept: facial roller" {...props}>
      {({ id }) => <FacialRoller id={id} x={150} y={0} scale={2.5} />}
    </Scene>
  ),
  custom: (props: { className?: string; aspect?: SceneProps["aspect"] }) => (
    <Scene title="Illustrative custom product concept: ampoules and retail box" {...props}>
      {({ id }) => (
        <>
          <Ampoules id={id} x={0} y={300} scale={1.9} />
          <RetailBox id={id} x={520} y={200} scale={2.05} />
        </>
      )}
    </Scene>
  ),
  balm: (props: { className?: string; aspect?: SceneProps["aspect"] }) => (
    <Scene title="Illustrative balm stick concept" {...props}>
      {({ id }) => <BalmStick id={id} x={150} y={0} scale={2.5} />}
    </Scene>
  ),
  creation: (props: { className?: string; aspect?: SceneProps["aspect"] }) => (
    <Scene title="Illustrative product creation: ampoules, serum and cream jar" {...props} aspect="landscape" floor={0.8}>
      {({ id }) => (
        <>
          <Ampoules id={id} x={300} y={300} scale={1.3} />
          <SerumBottle id={id} x={760} y={100} scale={1.65} />
          <CreamJar id={id} x={1140} y={330} scale={1.3} />
        </>
      )}
    </Scene>
  ),
  reveal: (props: { className?: string; aspect?: SceneProps["aspect"] }) => (
    <Scene title="Illustrative finished brand concept: serum and retail box" {...props} aspect="landscape" floor={0.8}>
      {({ id }) => (
        <>
          <RetailBox id={id} x={560} y={160} scale={1.6} />
          <SerumBottle id={id} x={940} y={60} scale={1.75} />
        </>
      )}
    </Scene>
  ),
} as const;

export type SceneKey = keyof typeof scenes;
