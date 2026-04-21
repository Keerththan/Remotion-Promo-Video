import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Inter';

// ─── Font ─────────────────────────────────────────────────────────────────
const {fontFamily} = loadFont('normal', {
  weights: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

// ─── Brand Palette ─────────────────────────────────────────────────────────
// Violet #8B5CF6 | Dark Blue #072779 | Cyan #00BDFF | Black #0F172A | Orange #FF8000
const C = {
  bgDark:   '#0D1B3E',    // lighter cinematic navy — logo clearly visible
  card:     'rgba(7,39,121,0.28)', // glassmorphism card
  cyan:     '#00BDFF',
  darkBlue: '#072779',
  violet:   '#8B5CF6',
  orange:   '#FF8000',
  white:    '#FFFFFF',
  textSub:  'rgba(255,255,255,0.60)',
  textDim:  'rgba(255,255,255,0.35)',
  border:   'rgba(0,189,255,0.28)',
  track:    'rgba(0,189,255,0.15)',
  success:  '#22C55E',
  // kept for backward compat
  blue:     '#00BDFF',
  purple:   '#8B5CF6',
  bg:       '#0D1B3E',
  textDark: '#FFFFFF',
  textMid:  'rgba(255,255,255,0.60)',
  textLight:'rgba(255,255,255,0.35)',
};

// ─── Easing Presets ────────────────────────────────────────────────────────
const EASE_OUT    = Easing.bezier(0.16, 1, 0.3, 1);
const EASE_IN_OUT = Easing.bezier(0.45, 0, 0.55, 1);

// ─── Animation Helpers ─────────────────────────────────────────────────────
function fadeUp(frame: number, start: number, dur: number, dist = 28) {
  const p = interpolate(frame, [start, start + dur], [0, 1], {
    easing: EASE_OUT, extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  return {opacity: p, y: (1 - p) * dist};
}
function fadeIn(frame: number, start: number, dur: number) {
  return interpolate(frame, [start, start + dur], [0, 1], {
    easing: EASE_OUT, extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
}
function cinZoom(frame: number, dur: number, amount = 1.07) {
  return interpolate(frame, [0, dur], [1, amount], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
}

// ─── rgba helper ───────────────────────────────────────────────────────────
function rgba(hex: string, a: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

// ─── Shared: Ambient Glow Background ──────────────────────────────────────
const AmbientGlow: React.FC<{
  top?:    string; left?: string; right?: string;
  color?:  string; opacity?: number;
}> = ({top = '10%', left, right, color = C.cyan, opacity = 0.10}) => (
  <div style={{
    position: 'absolute',
    top, left, right,
    width: 700, height: 500,
    borderRadius: '50%',
    background: `radial-gradient(ellipse, ${rgba(color, opacity)} 0%, transparent 70%)`,
    pointerEvents: 'none',
  }} />
);

// ─── Shared: Particle Field ────────────────────────────────────────────────
const PARTICLES = [
  {x: 120,  y: 80,  r: 2,   op: 0.22, col: C.cyan,   phase: 0.0},
  {x: 340,  y: 200, r: 1.5, op: 0.16, col: C.violet, phase: 1.3},
  {x: 900,  y: 130, r: 2.5, op: 0.18, col: C.cyan,   phase: 0.7},
  {x: 1500, y: 90,  r: 1.5, op: 0.18, col: C.orange, phase: 2.1},
  {x: 1760, y: 300, r: 2,   op: 0.14, col: C.violet, phase: 0.4},
  {x: 200,  y: 700, r: 1.5, op: 0.16, col: C.cyan,   phase: 1.8},
  {x: 600,  y: 900, r: 3,   op: 0.12, col: C.violet, phase: 2.5},
  {x: 1200, y: 850, r: 2,   op: 0.18, col: C.orange, phase: 0.9},
  {x: 1680, y: 780, r: 1.5, op: 0.14, col: C.cyan,   phase: 1.5},
  {x: 80,   y: 950, r: 2,   op: 0.12, col: C.violet, phase: 3.1},
  {x: 1850, y: 550, r: 1.5, op: 0.16, col: C.cyan,   phase: 2.2},
  {x: 1050, y: 500, r: 1.5, op: 0.10, col: C.orange, phase: 1.1},
];

const Particles: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <>
      {PARTICLES.map((p, i) => (
        <div key={i} style={{
          position: 'absolute', left: p.x, top: p.y,
          width: p.r * 2, height: p.r * 2, borderRadius: '50%',
          background: p.col,
          opacity: p.op + Math.sin(frame * 0.055 + p.phase) * 0.07,
          boxShadow: `0 0 ${p.r * 3}px ${p.col}`,
          pointerEvents: 'none',
        }} />
      ))}
    </>
  );
};

// ─── Shared: Light Ray Lines ───────────────────────────────────────────────
const LightRays: React.FC<{opacity?: number}> = ({opacity = 1}) => (
  <AbsoluteFill style={{opacity, pointerEvents: 'none'}}>
    <div style={{
      position: 'absolute', top: 0, left: '50%',
      width: 1, height: '100%',
      background: `linear-gradient(to bottom, transparent, ${rgba(C.cyan, 0.08)}, transparent)`,
      transform: 'translateX(-50%)',
    }} />
    <div style={{
      position: 'absolute', top: 0, left: '30%',
      width: 1, height: '70%',
      background: `linear-gradient(to bottom, transparent, ${rgba(C.violet, 0.05)}, transparent)`,
    }} />
    <div style={{
      position: 'absolute', top: '20%', right: '25%',
      width: 1, height: '60%',
      background: `linear-gradient(to bottom, transparent, ${rgba(C.cyan, 0.04)}, transparent)`,
    }} />
  </AbsoluteFill>
);

// ─── Reusable: Logo (real SVG) ─────────────────────────────────────────────
const Logo: React.FC<{size?: number}> = ({size = 56}) => (
  <Img src={staticFile('Logo.svg')} style={{width: size, height: size, objectFit: 'contain'}} />
);

const BrandLockup: React.FC<{iconSize?: number; wordmarkHeight?: number}> = ({
  iconSize = 72, wordmarkHeight = 52,
}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
    <Logo size={iconSize} />
    <Img
      src={staticFile('sparengine-wordmark.svg')}
      style={{height: wordmarkHeight, width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)'}}
    />
  </div>
);

// ─── Reusable: Cloud Upload Icon ──────────────────────────────────────────
const CloudIcon: React.FC<{size?: number; color?: string}> = ({size = 64, color = C.cyan}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <path
      d="M20 44c-6.627 0-12-5.373-12-12a12 12 0 0 1 10.343-11.87A16 16 0 0 1 48 24c0 .17-.004.34-.01.508A10 10 0 0 1 44 44H20z"
      stroke={color} strokeWidth="2.5" fill={rgba(color, 0.08)}
    />
    <path d="M32 52V32M26 38l6-6 6 6" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Reusable: Doc Icon ────────────────────────────────────────────────────
const DocIcon: React.FC<{color: string; label: string; size?: number}> = ({color, label, size = 48}) => (
  <svg width={size} height={size * 1.2} viewBox="0 0 40 48" fill="none">
    <rect x="2" y="2" width="28" height="36" rx="3" fill={rgba(color, 0.15)} />
    <rect x="2" y="2" width="28" height="36" rx="3" stroke={color} strokeWidth="1.5" />
    <path d="M22 2v8h8" stroke={color} strokeWidth="1.5" fill="none" />
    <rect x="7" y="18" width="18" height="2" rx="1" fill={color} opacity={0.7} />
    <rect x="7" y="23" width="13" height="2" rx="1" fill={color} opacity={0.7} />
    <rect x="7" y="28" width="15" height="2" rx="1" fill={color} opacity={0.7} />
    <text x="15" y="46" fontSize="9" fontWeight="700" fill={color} textAnchor="middle" fontFamily="monospace">{label}</text>
  </svg>
);

// ─── Reusable: Dark ZIP Card ───────────────────────────────────────────────
const ZipCard: React.FC<{status?: string; borderColor?: string}> = ({
  status = 'Ready to upload', borderColor = C.cyan,
}) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 16,
    padding: '14px 20px',
    background: C.card,
    borderRadius: 12,
    border: `1px solid ${rgba(borderColor, 0.35)}`,
    boxShadow: `0 0 18px ${rgba(borderColor, 0.12)}`,
  }}>
    <div style={{
      width: 40, height: 40, borderRadius: 8,
      background: rgba(C.cyan, 0.12),
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 11, fontWeight: 700, color: C.cyan, fontFamily: 'monospace',
      border: `1px solid ${rgba(C.cyan, 0.3)}`,
    }}>ZIP</div>
    <div style={{flex: 1}}>
      <div style={{fontSize: 18, fontWeight: 600, color: C.white}}>
        12073 M01, REDUCTION GEAR .zip
      </div>
      <div style={{fontSize: 14, color: status.startsWith('✓') ? C.success : C.textSub, marginTop: 2}}>
        20.53 MB · {status}
      </div>
    </div>
    <div style={{fontSize: 20, color: C.textDim}}>✕</div>
  </div>
);

// ─── Reusable: Dark Card Wrapper ───────────────────────────────────────────
const DarkCard: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  glowColor?: string;
}> = ({children, style, glowColor = C.cyan}) => (
  <div style={{
    background: 'rgba(7,39,121,0.32)',
    backdropFilter: 'blur(12px)',
    borderRadius: 22,
    border: `1px solid ${rgba(glowColor, 0.25)}`,
    boxShadow: `0 24px 64px rgba(0,0,0,0.5), 0 0 40px ${rgba(glowColor, 0.08)}`,
    ...style,
  }}>
    {children}
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// SCENE 1 — Problem Hook (local 0–90 | 0–3s)
// ═══════════════════════════════════════════════════════════════════════════
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom  = cinZoom(frame, 90, 1.05);

  const docs = [
    {x: 180,  y: 120, rot: -18, delay: 0,  color: C.cyan,   label: 'PDF'},
    {x: 480,  y: 90,  rot:  12, delay: 4,  color: C.violet, label: 'DOC'},
    {x: 840,  y: 170, rot:  -8, delay: 8,  color: C.cyan,   label: 'XLS'},
    {x: 1200, y: 110, rot:  20, delay: 2,  color: C.orange, label: 'PDF'},
    {x: 1500, y: 200, rot: -14, delay: 7,  color: C.violet, label: 'ZIP'},
    {x: 280,  y: 480, rot:   9, delay: 5,  color: C.cyan,   label: 'PNG'},
    {x: 660,  y: 530, rot: -20, delay: 1,  color: C.violet, label: 'DOC'},
    {x: 1000, y: 500, rot:  16, delay: 11, color: C.orange, label: 'PDF'},
    {x: 1380, y: 460, rot:  -6, delay: 3,  color: C.cyan,   label: 'XLS'},
    {x: 1680, y: 140, rot:  11, delay: 9,  color: C.violet, label: 'PDF'},
    {x: 420,  y: 330, rot:  -4, delay: 6,  color: C.orange, label: 'ZIP'},
    {x: 1260, y: 340, rot:  15, delay: 10, color: C.cyan,   label: 'DOC'},
  ];

  const bg  = fadeIn(frame, 0, 18);
  const h1  = fadeUp(frame, 38, 30);
  const sub = fadeUp(frame, 55, 24);

  return (
    <AbsoluteFill style={{background: C.bgDark, overflow: 'hidden', fontFamily, opacity: bg}}>
      <AbsoluteFill style={{transform: `scale(${zoom})`, transformOrigin: '50% 50%'}}>

        {/* Ambient violet glow centre-top */}
        <AmbientGlow top="-5%" left="30%" color={C.violet} opacity={0.14} />
        <AmbientGlow top="40%" right="-5%" color={C.cyan} opacity={0.08} />
        <LightRays opacity={0.6} />
        <Particles />

        {/* ── AIRCRAFT 1: air1 sweeps in from bottom-right, climbs & floats ── */}
        {(() => {
          const air1Bloom = spring({frame, fps: 30, config: {damping: 14, stiffness: 60, mass: 1.2}, delay: 10, durationInFrames: 60});
          const air1FloatY = Math.sin(frame * 0.04) * 18;
          const air1FloatR = Math.sin(frame * 0.025) * 3;
          return (
            <div style={{
              position: 'absolute',
              right: -60 + (1 - air1Bloom) * 300,
              bottom: 20 + air1FloatY - (1 - air1Bloom) * 200,
              opacity: air1Bloom * 0.30,
              transform: `rotate(${-22 + air1FloatR}deg) scale(${0.6 + air1Bloom * 0.4})`,
              filter: `drop-shadow(0 0 40px ${rgba(C.cyan, 0.5)}) brightness(1.15)`,
              pointerEvents: 'none',
            }}>
              <Img src={staticFile('air1.png')} style={{width: 680, height: 'auto'}} />
            </div>
          );
        })()}

        {/* Floating chaotic docs */}
        {docs.map((d, i) => {
          const bloom  = spring({frame, fps: 30, config: {damping: 11, stiffness: 80, mass: 0.9}, delay: d.delay * 2, durationInFrames: 40});
          const wobble = Math.sin((frame + i * 19) * 0.07) * 3.5;
          return (
            <div key={i} style={{
              position: 'absolute', left: d.x, top: d.y,
              transform: `scale(${bloom}) rotate(${d.rot + wobble}deg)`,
              opacity: bloom * 0.75,
              filter: `drop-shadow(0 0 8px ${d.color})`,
            }}>
              <DocIcon color={d.color} label={d.label} size={52} />
            </div>
          );
        })}

        {/* Dark vignette overlay */}
        <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.12) 0%, rgba(8,16,30,0.55) 70%)'}} />

        {/* Headline */}
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 22}}>
          <h1 style={{
            margin: 0, fontSize: 102, fontWeight: 800,
            color: C.white, textAlign: 'center',
            letterSpacing: -2, lineHeight: 1.08,
            opacity: h1.opacity, transform: `translateY(${h1.y}px)`,
            textShadow: `0 0 60px ${rgba(C.cyan, 0.25)}`,
          }}>
            Aircraft records.<br />
            <span style={{
              background: `linear-gradient(90deg, ${C.cyan}, ${C.violet})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Thousands of pages.</span>
          </h1>
          <p style={{
            margin: 0, fontSize: 38, fontWeight: 500,
            color: C.textSub, textAlign: 'center',
            opacity: sub.opacity, transform: `translateY(${sub.y}px)`,
          }}>
            Messy. Time-consuming. Easy to miss critical gaps.
          </p>
        </AbsoluteFill>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SCENE 2 — Brand Intro (local 0–90 | 3–6s)
// ═══════════════════════════════════════════════════════════════════════════
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom  = cinZoom(frame, 90, 1.06);

  const logoP   = spring({frame, fps: 30, config: {damping: 13, stiffness: 115, mass: 0.85}, durationInFrames: 55});
  const glow    = fadeIn(frame, 0, 40);
  const tagline = fadeUp(frame, 32, 28);
  const badge   = fadeUp(frame, 48, 24);

  return (
    <AbsoluteFill style={{background: C.bgDark, overflow: 'hidden', fontFamily}}>
      <AbsoluteFill style={{transform: `scale(${zoom})`, transformOrigin: '50% 50%'}}>

        {/* Radial brand glow */}
        <AbsoluteFill style={{
          background: [
            `radial-gradient(ellipse at 50% 40%, ${rgba(C.violet, 0.22)} 0%, transparent 50%)`,
            `radial-gradient(ellipse at 50% 40%, ${rgba(C.cyan, 0.10)} 0%, transparent 70%)`,
          ].join(','),
          opacity: glow,
        }} />
        <LightRays opacity={0.8} />
        <Particles />

        {/* ── AIRCRAFT 2: air2 Ken Burns pan — cruises slowly left to right ── */}
        {(() => {
          const air2X = interpolate(frame, [0, 90], [-180, 80], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          const air2Op = interpolate(frame, [0, 25, 70, 90], [0, 0.18, 0.18, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          const air2Scale = interpolate(frame, [0, 90], [1.05, 1.0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          return (
            <div style={{
              position: 'absolute',
              bottom: 60,
              left: air2X,
              opacity: air2Op,
              transform: `scale(${air2Scale})`,
              filter: `drop-shadow(0 0 30px ${rgba(C.cyan, 0.4)}) brightness(1.1)`,
              pointerEvents: 'none',
            }}>
              <Img src={staticFile('air2.png')} style={{width: 900, height: 'auto'}} />
            </div>
          );
        })()}

        {/* Brand lockup */}
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 26}}>
          <div style={{
            transform: `scale(${0.55 + logoP * 0.45})`,
            opacity: Math.min(logoP * 1.4, 1),
            filter: `drop-shadow(0 0 30px ${rgba(C.cyan, 0.5)})`,
          }}>
            <BrandLockup iconSize={100} wordmarkHeight={64} />
          </div>

          {/* Tagline */}
          <p style={{
            margin: 0, fontSize: 38, fontWeight: 500,
            color: C.textSub, textAlign: 'center',
            opacity: tagline.opacity, transform: `translateY(${tagline.y}px)`,
          }}>
            No account needed. Upload. We handle the rest.
          </p>

          {/* Badge */}
          <div style={{
            padding: '12px 32px', borderRadius: 999,
            border: `1.5px solid ${rgba(C.cyan, 0.5)}`,
            color: C.cyan, fontSize: 24, fontWeight: 600,
            background: rgba(C.cyan, 0.08),
            boxShadow: `0 0 24px ${rgba(C.cyan, 0.2)}`,
            opacity: badge.opacity, transform: `translateY(${badge.y}px)`,
          }}>
            AI-powered aircraft record processing
          </div>
        </AbsoluteFill>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SCENE 3 — Upload Flow (local 0–420 | 11–25s) - COMBINES SCENES 3, 4, 5
// ═══════════════════════════════════════════════════════════════════════════
const Scene_UploadFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom  = cinZoom(frame, 420, 1.05);

  // States across the 14 second flow
  const isFileSelected = frame >= 85;
  const isUploading    = frame >= 180;
  const isDone         = frame >= 360;

  // General animations
  const cardP  = spring({frame, fps: 30, config: {damping: 14, stiffness: 95, mass: 0.95}, durationInFrames: 55});
  const cloudP = spring({frame, fps: 30, config: {damping: 11, stiffness: 130, mass: 0.7}, delay: 20, durationInFrames: 45});

  // Email typing
  const EMAIL  = 'user@sparengine.com';
  const chars  = Math.floor(interpolate(frame, [30, 70], [0, EMAIL.length], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  const cursor = chars < EMAIL.length ? 1 : (Math.floor(frame / 14) % 2);

  // File Card entering
  const fileCardP = spring({frame, fps: 30, delay: 85, durationInFrames: 45, config: {damping: 13, stiffness: 110}});

  // Mouse trajectory & click
  // Cursor begins off-screen, swoops to "Upload" button inside the ZipCard layout view
  const mouseX = interpolate(frame, [125, 165], [1400, 1060], {easing: Easing.bezier(0.2, 0.8, 0.2, 1), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const mouseY = interpolate(frame, [125, 165], [1000, 730], {easing: Easing.bezier(0.2, 0.8, 0.2, 1), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const mouseScale = interpolate(frame, [170, 175, 180], [1, 0.8, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const mouseOp = interpolate(frame, [125, 135, 195, 205], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const btnClick = interpolate(frame, [175, 180, 190], [1, 0.92, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  // Progress logic
  const progressFade = spring({frame, fps: 30, delay: 180});
  const checkOp = isDone ? fadeIn(frame, 360, 15) : 0;
  const pct = isDone ? 100 : isUploading ? Math.round(interpolate(frame, [190, 350], [0, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})) : 0;
  const progressW = pct + '%';
  const spinAngle = frame * 12;

  return (
    <AbsoluteFill style={{background: C.bgDark, overflow: 'hidden', fontFamily}}>
      <AbsoluteFill style={{transform: `scale(${zoom})`, transformOrigin: '50% 48%'}}>

        <AmbientGlow top="5%" left="20%" color={C.cyan} opacity={0.09} />
        <AmbientGlow top="50%" right="10%" color={C.violet} opacity={0.08} />
        <LightRays opacity={0.5} />
        <Particles />

        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
          <DarkCard glowColor={isDone ? C.success : (isUploading ? C.cyan : C.violet)} style={{
            width: 860, padding: '46px 62px',
            transform: `translateY(${(1 - cardP) * 50}px)`,
            opacity: Math.min(cardP * 1.5, 1),
            transition: 'background 0.5s, box-shadow 0.5s',
          }}>
            <h1 style={{margin: '0 0 10px', fontSize: 44, fontWeight: 800, color: C.white, textAlign: 'center', letterSpacing: -0.5}}>
              Send your documents
            </h1>
            <p style={{margin: '0 0 22px', fontSize: 19, color: C.textSub, textAlign: 'center'}}>
              No account needed. Enter your email, upload PDFs or a ZIP.
            </p>

            {/* Email Field */}
            <div style={{marginBottom: 20}}>
              <div style={{fontSize: 16, fontWeight: 600, color: C.cyan, marginBottom: 7}}>Email</div>
              <div style={{border: `1.5px solid ${rgba(C.cyan, 0.35)}`, borderRadius: 10, padding: '13px 18px', fontSize: 20, color: C.white, background: rgba(C.darkBlue, 0.3)}}>
                {EMAIL.slice(0, chars)}
                {!isUploading && !isDone && <span style={{display: 'inline-block', width: 2, height: 20, background: C.cyan, marginLeft: 1, opacity: cursor, verticalAlign: 'text-bottom'}} />}
              </div>
            </div>

            {/* Dynamic Interactive Area */}
            <div style={{position: 'relative', height: 205}}>
              
              {/* STATE 1: Dropzone */}
              <div style={{
                position: 'absolute', width: '100%',
                opacity: 1 - fileCardP, transform: `scale(${1 - fileCardP * 0.05})`, pointerEvents: 'none'
              }}>
                <div style={{
                  border: `2px dashed ${rgba(C.cyan, 0.45)}`, borderRadius: 14, padding: '26px 24px', textAlign: 'center',
                  background: rgba(C.cyan, 0.03)
                }}>
                  <div style={{display: 'flex', justifyContent: 'center', marginBottom: 10, transform: `scale(${0.4 + cloudP * 0.6})`, opacity: cloudP}}>
                    <CloudIcon size={50} color={C.cyan} />
                  </div>
                  <div style={{fontSize: 20, fontWeight: 700, color: C.cyan, marginBottom: 4}}>Drag-and-Drop Your Files here</div>
                  <div style={{fontSize: 14, color: C.textDim}}>Maximum upload size: 5 GB per file.</div>
                </div>
              </div>

              {/* COMMON: File Card (Visible in State 2 and 3) */}
              <div style={{
                position: 'absolute', width: '100%', top: 0,
                opacity: fileCardP, transform: `translateY(${(1 - fileCardP) * 20}px)`, transition: 'opacity 0.3s', pointerEvents: 'none'
              }}>
                <div style={{fontSize: 17, fontWeight: 700, color: C.white, marginBottom: 3}}>Uploaded Files</div>
                <div style={{fontSize: 13, color: C.textDim, marginBottom: 10}}>Your files and their upload status.</div>
                <ZipCard 
                  status={isDone ? '✓ Uploaded' : isUploading ? 'Uploading...' : 'Ready to upload'} 
                  borderColor={isDone ? C.success : (isUploading ? C.cyan : C.violet)} 
                />
              </div>

              {/* STATE 2: Buttons (Hidden during upload) */}
              <div style={{
                position: 'absolute', width: '100%', top: 120,
                opacity: isUploading ? 0 : fileCardP,
                display: 'flex', justifyContent: 'center', gap: 14, transition: 'opacity 0.3s'
              }}>
                <div style={{padding: '13px 44px', borderRadius: 999, border: `1.5px solid ${rgba(C.cyan, 0.3)}`, fontSize: 20, fontWeight: 600, color: C.textSub}}>Select</div>
                <div style={{
                  padding: '13px 44px', borderRadius: 999, fontSize: 20, fontWeight: 700, color: C.bgDark, background: C.cyan,
                  transform: `scale(${btnClick})`,
                  boxShadow: `0 0 ${(1 - btnClick) * 400 + 20}px ${rgba(C.cyan, 0.7)}`
                }}>Upload</div>
              </div>

              {/* STATE 3: Uploading Progress */}
              <div style={{
                position: 'absolute', width: '100%', top: 120,
                opacity: isUploading ? progressFade : 0, transition: 'opacity 0.3s'
              }}>
                <div style={{display: 'flex', justifyContent: 'center', marginBottom: 28}}>
                  <div style={{
                    padding: '13px 44px', borderRadius: 999, fontSize: 20, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10,
                    color: isDone ? C.success : C.textDim,
                    background: isDone ? rgba(C.success, 0.12) : rgba(C.darkBlue, 0.4),
                    border: isDone ? `1.5px solid ${rgba(C.success, 0.5)}` : `1.5px solid ${rgba(C.cyan, 0.15)}`,
                    boxShadow: isDone ? `0 0 20px ${rgba(C.success, 0.3)}` : 'none',
                    transition: 'all 0.5s',
                  }}>
                    {isDone ? '✓ Uploaded' : <><span style={{display: 'inline-block', transform: `rotate(${spinAngle}deg)`, lineHeight: 1}}>⟳</span> Uploading...</>}
                  </div>
                </div>
                <div>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8}}>
                    <span style={{fontSize: 18, fontWeight: 600, color: isDone ? C.success : C.white}}>{isDone ? 'Upload complete!' : 'Uploading to server...'}</span>
                    <span style={{fontSize: 18, fontWeight: 700, color: isDone ? C.orange : C.cyan}}>{pct}%</span>
                  </div>
                  <div style={{width: '100%', height: 8, borderRadius: 999, background: 'rgba(0,189,255,0.12)', overflow: 'hidden'}}>
                    <div style={{
                      width: progressW, height: '100%', borderRadius: 999,
                      background: isDone ? C.success : C.cyan,
                      boxShadow: `0 0 16px ${isDone ? rgba(C.success, 0.7) : rgba(C.cyan, 0.7)}`,
                      transition: 'background 0.5s'
                    }} />
                  </div>
                  {isDone && (
                    <div style={{marginTop: 12, fontSize: 16, color: C.success, fontWeight: 600, textAlign: 'center', opacity: checkOp, textShadow: `0 0 12px ${rgba(C.success, 0.5)}`}}>
                      ✓ File uploaded — AI processing begins now.
                    </div>
                  )}
                </div>
              </div>

            </div>
          </DarkCard>
        </AbsoluteFill>

        {/* ── MOUSE CURSOR ── */}
        <div style={{
          position: 'absolute', left: mouseX, top: mouseY,
          transform: `scale(${mouseScale})`, opacity: mouseOp,
          filter: 'drop-shadow(0 12px 18px rgba(0,0,0,0.5))',
          pointerEvents: 'none', zIndex: 100
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M5.5 3.5L18.5 10.5L12 12.5L10.5 19.5L5.5 3.5Z" fill="white" stroke={C.cyan} strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          {/* Click Ripple Spark */}
          {frame > 175 && frame < 190 && (
            <div style={{
              position: 'absolute', top: -10, left: -10, width: 44, height: 44,
              borderRadius: '50%', border: `2px solid ${C.cyan}`,
              transform: `scale(${interpolate(frame, [175, 190], [0.3, 1.5])})`,
              opacity: interpolate(frame, [175, 190], [1, 0])
            }}/>
          )}
        </div>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SCENE 6 — Documents Received (local 0–120 | 20–24s)
// ═══════════════════════════════════════════════════════════════════════════
const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom  = cinZoom(frame, 120, 1.06);

  const bgOp    = fadeIn(frame, 0, 20);
  const logoP   = spring({frame, fps: 30, config: {damping: 14, stiffness: 110, mass: 0.85}, durationInFrames: 55});
  const heading = fadeUp(frame, 22, 28);
  const sub     = fadeUp(frame, 38, 26);
  const link    = fadeUp(frame, 52, 22);

  return (
    <AbsoluteFill style={{background: C.bgDark, overflow: 'hidden', fontFamily, opacity: bgOp}}>
      <AbsoluteFill style={{transform: `scale(${zoom})`, transformOrigin: '50% 50%'}}>

        <AmbientGlow top="10%" left="30%" color={C.violet} opacity={0.22} />
        <AmbientGlow top="10%" right="25%" color={C.cyan}  opacity={0.14} />
        <LightRays opacity={0.9} />
        <Particles />

        {/* Concentric glow ring behind logo */}
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
          <div style={{
            position: 'absolute',
            width: 360, height: 360, borderRadius: '50%',
            background: `radial-gradient(ellipse, ${rgba(C.violet, 0.16)} 0%, transparent 70%)`,
            opacity: Math.min(logoP * 1.5, 1),
          }} />
        </AbsoluteFill>

        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 20}}>
          <div style={{transform: `scale(${0.45 + logoP * 0.55})`, opacity: Math.min(logoP * 1.6, 1), filter: `drop-shadow(0 0 32px ${rgba(C.cyan, 0.6)})`}}>
            <Logo size={100} />
          </div>

          <h1 style={{
            margin: 0, fontSize: 68, fontWeight: 800, color: C.white,
            textAlign: 'center', letterSpacing: -0.5,
            opacity: heading.opacity, transform: `translateY(${heading.y}px)`,
            textShadow: `0 0 40px ${rgba(C.cyan, 0.3)}`,
          }}>
            Documents received
          </h1>

          <p style={{
            margin: 0, fontSize: 26, color: C.textSub, textAlign: 'center',
            lineHeight: 1.65, maxWidth: 700,
            opacity: sub.opacity, transform: `translateY(${sub.y}px)`,
          }}>
            We're processing your documents. Once your asset snapshot is<br />
            ready and approved, we'll send it to{' '}
            <span style={{fontWeight: 700, color: C.cyan}}>user@sparengine.com</span>.
          </p>

          <div style={{
            fontSize: 20, color: C.cyan, fontWeight: 500,
            opacity: link.opacity, transform: `translateY(${link.y}px)`,
            textDecoration: 'underline',
          }}>
            Back to home
          </div>
        </AbsoluteFill>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SCENE 7 — Metrics (local 0–90 | 24–27s)
// ═══════════════════════════════════════════════════════════════════════════
const MetricCard: React.FC<{icon: string; value: string; label: string; delay: number; color: string}> = ({icon, value, label, delay, color}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const bloom = spring({frame, fps, config: {damping: 12, stiffness: 115, mass: 0.82}, delay, durationInFrames: 50});
  return (
    <div style={{
      width: 350, padding: '42px 30px',
      background: 'rgba(7,39,121,0.32)',
      border: `1px solid ${rgba(color, 0.35)}`,
      borderRadius: 22,
      boxShadow: `0 20px 50px rgba(0,0,0,0.5), 0 0 32px ${rgba(color, 0.15)}`,
      textAlign: 'center',
      transform: `scale(${0.55 + bloom * 0.45}) translateY(${(1 - bloom) * 32}px)`,
      opacity: Math.min(bloom * 1.4, 1),
    }}>
      <div style={{fontSize: 56, marginBottom: 12, filter: `drop-shadow(0 0 10px ${color})`}}>{icon}</div>
      <div style={{fontSize: 68, fontWeight: 800, color, letterSpacing: -1.5, lineHeight: 1, textShadow: `0 0 30px ${rgba(color, 0.7)}`}}>{value}</div>
      <div style={{fontSize: 21, color: C.textSub, marginTop: 12, fontWeight: 500, lineHeight: 1.4}}>{label}</div>
    </div>
  );
};

const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom  = cinZoom(frame, 90, 1.05);
  const bg    = fadeIn(frame, 0, 20);
  const title = fadeUp(frame, 8, 28);

  return (
    <AbsoluteFill style={{background: C.bgDark, overflow: 'hidden', fontFamily, opacity: bg}}>
      <AbsoluteFill style={{transform: `scale(${zoom})`, transformOrigin: '50% 50%'}}>

        <AmbientGlow top="5%"  left="20%"  color={C.violet} opacity={0.12} />
        <AmbientGlow top="50%" right="10%" color={C.cyan}   opacity={0.10} />
        <AmbientGlow top="20%" left="60%"  color={C.orange} opacity={0.07} />
        <LightRays opacity={0.7} />
        <Particles />

        {/* ── AIRCRAFT 2: air2 full-width glide — enters from right, slows to hover ── */}
        {(() => {
          const air2Enter = interpolate(frame, [0, 55], [2200, 900], {easing: EASE_OUT, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          const air2Op    = interpolate(frame, [0, 22, 68, 90], [0, 0.22, 0.22, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          const air2FloatY = Math.sin(frame * 0.06) * 10;
          return (
            <div style={{
              position: 'absolute',
              left: air2Enter,
              top: 480 + air2FloatY,
              opacity: air2Op,
              filter: `drop-shadow(0 0 50px ${rgba(C.cyan, 0.35)}) brightness(1.1)`,
              pointerEvents: 'none',
            }}>
              <Img src={staticFile('air2.png')} style={{width: 1100, height: 'auto'}} />
            </div>
          );
        })()}

        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 48}}>
          <h2 style={{
            margin: 0, fontSize: 56, fontWeight: 800, color: C.white, letterSpacing: -0.5,
            opacity: title.opacity, transform: `translateY(${title.y}px)`,
            textShadow: `0 0 30px ${rgba(C.cyan, 0.2)}`,
          }}>
            Purpose-built for aircraft records<span style={{color: C.orange}}>.</span>
          </h2>
          <div style={{display: 'flex', gap: 36}}>
            <MetricCard icon="⚡" value="10×"  label="Faster than manual review"  delay={0}  color={C.violet} />
            <MetricCard icon="📂" value="5 GB" label="Max upload — any file type" delay={18} color={C.cyan} />
            <MetricCard icon="✅" value="100%" label="Automated gap detection"    delay={36} color={C.orange} />
          </div>
        </AbsoluteFill>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SCENE 8 — CTA Outro (local 0–90 | 27–30s)
// ═══════════════════════════════════════════════════════════════════════════
const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom  = cinZoom(frame, 90, 1.07);

  const glow  = fadeIn(frame, 0, 40);
  const logoP = spring({frame, fps: 30, config: {damping: 13, stiffness: 115, mass: 0.85}, durationInFrames: 50});
  const l1    = fadeUp(frame, 18, 28);
  const l2    = fadeUp(frame, 32, 26);
  const badge = fadeUp(frame, 46, 26, 22);

  // Aircraft animations
  const air3Op    = interpolate(frame, [0, 35], [0, 0.08], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const air1SweepX = interpolate(frame, [40, 90], [-300, 2200], {easing: EASE_OUT, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const air1SweepOp = interpolate(frame, [40, 52, 78, 90], [0, 0.55, 0.45, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{background: C.bgDark, overflow: 'hidden', fontFamily}}>
      <AbsoluteFill style={{transform: `scale(${zoom})`, transformOrigin: '50% 50%'}}>

        {/* Large central bloom */}
        <AbsoluteFill style={{
          background: [
            `radial-gradient(ellipse at 50% 45%, ${rgba(C.violet, 0.20)} 0%, transparent 50%)`,
            `radial-gradient(ellipse at 50% 45%, ${rgba(C.cyan,   0.10)} 0%, transparent 70%)`,
          ].join(','),
          opacity: glow,
        }} />
        <LightRays opacity={1} />
        <Particles />

        {/* ── AIRCRAFT 3: air3 ghost silhouette — fades in large behind CTA text ── */}
        <div style={{
          position: 'absolute',
          right: -80, bottom: -60,
          opacity: air3Op,
          filter: `invert(1) brightness(3) drop-shadow(0 0 60px ${rgba(C.cyan, 0.6)})`,
          pointerEvents: 'none',
        }}>
          <Img src={staticFile('air3.png')} style={{width: 780, height: 'auto'}} />
        </div>

        {/* ── AIRCRAFT 1: air1 sweeps across at speed — cinematic flyby ── */}
        <div style={{
          position: 'absolute',
          left: air1SweepX,
          top: 60,
          opacity: air1SweepOp,
          transform: 'rotate(-10deg)',
          filter: `drop-shadow(0 0 30px ${rgba(C.cyan, 0.7)}) brightness(1.2)`,
          pointerEvents: 'none',
        }}>
          <Img src={staticFile('air1.png')} style={{width: 420, height: 'auto'}} />
        </div>

        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 24}}>

          {/* Brand lockup */}
          <div style={{
            transform: `scale(${0.5 + logoP * 0.5})`,
            opacity: Math.min(logoP * 1.5, 1),
            filter: `drop-shadow(0 0 28px ${rgba(C.cyan, 0.55)})`,
          }}>
            <BrandLockup iconSize={88} wordmarkHeight={58} />
          </div>

          {/* Main CTA */}
          <h2 style={{
            margin: 0, fontSize: 66, fontWeight: 800, color: C.white,
            textAlign: 'center', letterSpacing: -1, lineHeight: 1.15, maxWidth: 1100,
            opacity: l1.opacity, transform: `translateY(${l1.y}px)`,
          }}>
            Send your documents.<br />
            <span style={{
              background: `linear-gradient(90deg, ${C.cyan}, ${C.violet})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Get your asset snapshot.
            </span>
          </h2>

          {/* Sub CTA */}
          <p style={{
            margin: 0, fontSize: 32, color: C.textSub, fontWeight: 400,
            opacity: l2.opacity, transform: `translateY(${l2.y}px)`,
          }}>
            No account needed. No setup required.
          </p>

          {/* URL badge */}
          <div style={{
            padding: '16px 52px', borderRadius: 999,
            border: `2px solid ${rgba(C.cyan, 0.55)}`,
            background: rgba(C.cyan, 0.08),
            boxShadow: `0 0 32px ${rgba(C.cyan, 0.25)}`,
            fontSize: 30, fontWeight: 700, color: C.cyan, letterSpacing: 0.5,
            opacity: badge.opacity, transform: `translateY(${badge.y}px)`,
          }}>
            sparengine.com
          </div>

        </AbsoluteFill>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SCENE 9 — 4-Step Workflow (local 0–150 | 30–35s) — dark cinematic
// ═══════════════════════════════════════════════════════════════════════════
const WorkflowStepCard: React.FC<{
  index: number; title: string; icon: string; desc: string;
  color: string; startFrame: number; scanColor?: string;
}> = ({index, title, icon, desc, color, startFrame, scanColor}) => {
  const frame    = useCurrentFrame();
  const {fps}    = useVideoConfig();
  const localF   = frame - startFrame;
  const bloom    = localF >= 0
    ? spring({frame: localF, fps, config: {damping: 14, stiffness: 110}, durationInFrames: 40})
    : 0;
  const isActive = frame >= startFrame;
  const scanY    = scanColor ? (frame % 24) * (60 / 24) : 0;

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 18,
      opacity: bloom, transform: `translateX(${(1 - bloom) * -50}px)`,
    }}>
      <div style={{
        width: 46, height: 46, borderRadius: '50%', flexShrink: 0,
        border: `2px solid ${color}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 19, fontWeight: 800, color,
        background: rgba(color, 0.12),
        boxShadow: isActive ? `0 0 20px ${rgba(color, 0.5)}` : 'none',
      }}>
        {index + 1}
      </div>
      <div style={{
        flex: 1, padding: '16px 22px', borderRadius: 14,
        background: 'rgba(7,39,121,0.28)',
        border: `1px solid ${isActive ? rgba(color, 0.4) : 'rgba(255,255,255,0.05)'}`,
        boxShadow: isActive ? `0 0 28px ${rgba(color, 0.18)}` : 'none',
        position: 'relative', overflow: 'hidden',
      }}>
        {scanColor && isActive && (
          <div style={{
            position: 'absolute', left: 0, right: 0, height: 2, top: scanY,
            background: `linear-gradient(90deg, transparent, ${scanColor}, transparent)`,
            opacity: 0.55,
          }} />
        )}
        <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
          <span style={{fontSize: 30}}>{icon}</span>
          <div>
            <div style={{fontSize: 22, fontWeight: 700, color: '#FFFFFF', marginBottom: 3}}>{title}</div>
            <div style={{fontSize: 15, color: 'rgba(255,255,255,0.5)', fontWeight: 400}}>{desc}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Scene_Workflow: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom  = cinZoom(frame, 150, 1.07);

  const arrowPct  = interpolate(frame, [5, 118], [0, 100], {easing: EASE_IN_OUT, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const taglineOp = fadeIn(frame, 122, 18);
  const taglineY  = interpolate(frame, [122, 140], [22, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const subTagOp  = fadeIn(frame, 134, 12);
  const overlayOp = interpolate(frame, [120, 148], [0, 0.88], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  const steps = [
    {title: 'Upload Files',            icon: '📂', color: C.cyan,   desc: 'Drop your ZIP, PDFs or scans — any format accepted', startFrame: 12},
    {title: 'AI Organizes Everything', icon: '⚡',  color: C.violet, desc: 'Automatic classification, tagging and structure',     startFrame: 42},
    {title: 'Detects Gaps & Risks',    icon: '🔍', color: C.orange, desc: 'Missing pages and inconsistencies flagged instantly', startFrame: 72, scanColor: C.orange},
    {title: 'Generates Clean Dossier', icon: '✨', color: '#FFFFFF', desc: 'Audit-ready summary delivered straight to your inbox', startFrame: 102},
  ];

  return (
    <AbsoluteFill style={{background: C.bgDark, overflow: 'hidden', fontFamily}}>
      <AbsoluteFill style={{transform: `scale(${zoom})`, transformOrigin: '50% 50%'}}>

        <AbsoluteFill style={{
          background: [
            `radial-gradient(ellipse at 50% 5%,  ${rgba(C.cyan,   0.10)} 0%, transparent 45%)`,
            `radial-gradient(ellipse at 15% 80%, ${rgba(C.violet, 0.08)} 0%, transparent 40%)`,
            `radial-gradient(ellipse at 85% 60%, ${rgba(C.darkBlue, 0.18)} 0%, transparent 40%)`,
          ].join(','),
        }} />
        <LightRays opacity={0.7} />
        <Particles />

        <AbsoluteFill style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 100, paddingRight: 120}}>
          {/* Timeline arrow */}
          <div style={{width: 72, alignSelf: 'stretch', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', paddingTop: 120, paddingBottom: 120}}>
            <div style={{position: 'absolute', top: 120, bottom: 120, width: 2, background: rgba(C.cyan, 0.12), left: '50%', transform: 'translateX(-50%)', borderRadius: 999}} />
            <div style={{
              position: 'absolute', top: 120,
              height: `calc(${arrowPct}% * (100% - 240px) / 100%)`,
              width: 3,
              background: `linear-gradient(to bottom, ${C.cyan}, ${C.violet})`,
              left: '50%', transform: 'translateX(-50%)',
              borderRadius: 999, boxShadow: `0 0 14px ${C.cyan}`,
            }} />
            <div style={{
              position: 'absolute',
              top: `calc(120px + ${arrowPct / 100} * (100% - 240px) - 10px)`,
              left: '50%', transform: 'translateX(-50%)',
              width: 0, height: 0,
              borderLeft: '6px solid transparent', borderRight: '6px solid transparent',
              borderTop: `12px solid ${C.cyan}`,
              filter: `drop-shadow(0 0 8px ${C.cyan})`,
            }} />
          </div>

          {/* Step cards */}
          <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 26, justifyContent: 'center'}}>
            {steps.map((s, i) => <WorkflowStepCard key={i} index={i} {...s} />)}
          </div>
        </AbsoluteFill>

        {/* Final tagline overlay */}
        {frame >= 120 && (
          <AbsoluteFill style={{
            background: `rgba(8,16,30,${overlayOp})`,
            justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 18,
          }}>
            <div style={{
              fontSize: 78, fontWeight: 800, color: C.white,
              textAlign: 'center', letterSpacing: -1.5, lineHeight: 1.1,
              opacity: taglineOp, transform: `translateY(${taglineY}px)`,
            }}>
              Clean Records.<br />
              <span style={{
                background: `linear-gradient(90deg, ${C.cyan}, ${C.violet})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>Zero Chaos.</span>
            </div>
            <div style={{fontSize: 34, color: 'rgba(255,255,255,0.65)', fontWeight: 400, letterSpacing: 0.5, opacity: subTagOp}}>
              Just a few clicks.
            </div>
          </AbsoluteFill>
        )}

      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// ROOT COMPOSITION — 1050 frames = 35 seconds @ 30fps
// Scene 1           |   0 →  90  |  0– 3s  | Problem Hook
// Scene 2           |  90 → 180  |  3– 6s  | Brand Intro
// Scene 9 Workflow  | 180 → 330  |  6–11s  | 4-Step Workflow (dark cinematic)
// Scene 3 Flow      | 330 → 750  | 11–25s  | Upload Flow UI (14 seconds combined)
// Scene 6           | 750 → 870  | 25–29s  | Documents Received
// Scene 7           | 870 → 960  | 29–32s  | Metrics
// Scene 8           | 960 → 1050 | 32–35s  | CTA Outro
// ═══════════════════════════════════════════════════════════════════════════
export const SparenginePromoComposition: React.FC = () => {
  const {fps} = useVideoConfig();
  const f     = fps;

  return (
    <AbsoluteFill style={{background: C.bgDark, fontFamily}}>

      <Sequence from={0}       durationInFrames={3 * f}  premountFor={f}><Scene1 /></Sequence>
      <Sequence from={3  * f}  durationInFrames={3 * f}  premountFor={f}><Scene2 /></Sequence>
      <Sequence from={6  * f}  durationInFrames={5 * f}  premountFor={f}><Scene_Workflow /></Sequence>
      <Sequence from={11 * f}  durationInFrames={14 * f} premountFor={f}><Scene_UploadFlow /></Sequence>
      <Sequence from={25 * f}  durationInFrames={4 * f}  premountFor={f}><Scene6 /></Sequence>
      <Sequence from={29 * f}  durationInFrames={3 * f}  premountFor={f}><Scene7 /></Sequence>
      <Sequence from={32 * f}  durationInFrames={3 * f}  premountFor={f}><Scene8 /></Sequence>

    </AbsoluteFill>
  );
};
