import {Easing, AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

const palette = {
  cream: '#F7E7CE',
  latte: '#E5C9A8',
  caramel: '#B67A44',
  darkRoast: '#4B2E1F',
  cocoa: '#2E1A12',
};

export const CoffeeBrandComposition: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeProgress = interpolate(frame, [8, 72], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const textOpacity = fadeProgress;
  const textY = interpolate(fadeProgress, [0, 1], [40, 0]);
  const glowOpacity = interpolate(frame, [0, 45, 120, 149], [0.15, 0.3, 0.22, 0.18], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 35%, ${palette.latte} 0%, ${palette.caramel} 45%, ${palette.darkRoast} 100%)`,
        color: palette.cream,
        fontFamily: "'Georgia', 'Times New Roman', serif",
        overflow: 'hidden',
      }}
    >
      <AbsoluteFill
        style={{
          background: `linear-gradient(135deg, rgba(247, 231, 206, 0.28), rgba(46, 26, 18, 0.1) 55%, rgba(247, 231, 206, 0.18))`,
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            padding: '42px 68px',
            borderRadius: 24,
            backdropFilter: 'blur(4px)',
            backgroundColor: 'rgba(46, 26, 18, 0.34)',
            border: '1px solid rgba(247, 231, 206, 0.2)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.35)',
          }}
        >
          <h1
            style={{
              margin: 0,
              opacity: textOpacity,
              transform: `translateY(${textY}px)`,
              letterSpacing: 1.2,
              fontSize: 130,
              lineHeight: 1.05,
              fontWeight: 600,
              textAlign: 'center',
              textShadow: `0 0 24px rgba(247, 231, 206, ${glowOpacity}), 0 8px 24px rgba(0, 0, 0, 0.45)`,
            }}
          >
            Fresh Coffee Daily
          </h1>
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background: 'radial-gradient(circle at center, transparent 40%, rgba(0, 0, 0, 0.24) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};
