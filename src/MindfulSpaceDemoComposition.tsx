import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const COLORS = {
  blue: '#4A90E2',
  purple: '#B084CC',
  mist: '#EAF2FF',
  deepText: '#2A3F66',
  white: '#FFFFFF',
};

const fadeIn = (frame: number, start: number, duration: number) => {
  return interpolate(frame, [start, start + duration], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};

const featureCardStyle = {
  width: 980,
  display: 'flex',
  justifyContent: 'space-between',
  gap: 20,
} as const;

const phoneMockStyle = {
  width: 420,
  height: 760,
  borderRadius: 42,
  backgroundColor: 'rgba(255,255,255,0.78)',
  boxShadow: '0 28px 60px rgba(42, 63, 102, 0.22)',
  border: '1px solid rgba(255,255,255,0.9)',
  backdropFilter: 'blur(6px)',
  padding: 28,
} as const;

const LotusIcon: React.FC<{frame: number}> = ({frame}) => {
  const bloom = spring({
    frame,
    fps: 30,
    config: {
      damping: 13,
      stiffness: 120,
      mass: 0.9,
    },
    durationInFrames: 55,
  });

  const rotate = interpolate(frame % 180, [0, 180], [0, 360], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const petalBase = {
    position: 'absolute' as const,
    width: 52,
    height: 84,
    borderRadius: '50% 50% 50% 50% / 68% 68% 32% 32%',
    background: 'linear-gradient(180deg, rgba(176, 132, 204, 0.95), rgba(74, 144, 226, 0.8))',
    transformOrigin: 'center 78%',
  };

  return (
    <div
      style={{
        position: 'relative',
        width: 220,
        height: 180,
        transform: `scale(${0.85 + bloom * 0.2})`,
        opacity: 0.85 + bloom * 0.15,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '52%',
          width: 180,
          height: 120,
          transform: `translate(-50%, -50%) rotate(${rotate * 0.12}deg)`,
        }}
      >
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, idx) => (
          <div
            key={deg}
            style={{
              ...petalBase,
              left: 64,
              top: 6,
              opacity: idx % 2 === 0 ? 0.92 : 0.66,
              transform: `rotate(${deg}deg) translateY(-42px)`,
            }}
          />
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '60%',
          width: 48,
          height: 48,
          borderRadius: 999,
          background: 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #B084CC 55%, #4A90E2 100%)',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 30px rgba(176, 132, 204, 0.45)',
        }}
      />
    </div>
  );
};

export const MindfulSpaceDemoComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const scene1Frames = 5 * fps;
  const scene2Frames = 10 * fps;
  const scene3Frames = 10 * fps;
  const scene4Frames = 5 * fps;

  return (
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(circle at 20% 20%, rgba(176, 132, 204, 0.26) 0%, rgba(74, 144, 226, 0.17) 40%, rgba(255,255,255,0.9) 100%), linear-gradient(140deg, #f8fbff, #eef4ff 60%, #f8f0ff)',
        color: COLORS.deepText,
        fontFamily: "'Trebuchet MS', 'Segoe UI', sans-serif",
        overflow: 'hidden',
      }}
    >
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(circle at 80% 18%, rgba(74, 144, 226, 0.16) 0%, transparent 35%), radial-gradient(circle at 10% 86%, rgba(176, 132, 204, 0.18) 0%, transparent 38%)',
        }}
      />

      <Sequence from={0} durationInFrames={scene1Frames}>
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
          <div
            style={{
              textAlign: 'center',
              opacity: fadeIn(frame, 0, 45),
              transform: `translateY(${interpolate(frame, [0, 45], [24, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })}px)`,
            }}
          >
            <div
              style={{
                width: 140,
                height: 140,
                margin: '0 auto 28px auto',
                borderRadius: 999,
                background:
                  'linear-gradient(135deg, rgba(74, 144, 226, 0.95), rgba(176, 132, 204, 0.95))',
                display: 'grid',
                placeItems: 'center',
                color: COLORS.white,
                fontWeight: 700,
                fontSize: 48,
                boxShadow: '0 20px 48px rgba(74, 144, 226, 0.3)',
              }}
            >
              MS
            </div>
            <h1 style={{margin: 0, fontSize: 86, letterSpacing: 0.6}}>MindfulSpace</h1>
            <p style={{margin: '16px 0 0 0', fontSize: 42, color: '#3F5C8D'}}>Find Your Inner Peace</p>
          </div>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={scene1Frames} durationInFrames={scene2Frames}>
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', gap: 40}}>
          <div style={phoneMockStyle}>
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.2), rgba(176, 132, 204, 0.24))',
                borderRadius: 24,
                padding: 20,
                marginBottom: 18,
              }}
            >
              <div style={{fontSize: 28, fontWeight: 600, marginBottom: 6}}>Welcome back</div>
              <div style={{fontSize: 22, opacity: 0.75}}>How do you feel today?</div>
            </div>
            {['Morning Calm', 'Deep Sleep', 'Breath Focus', 'Stress Reset'].map((item, i) => (
              <div
                key={item}
                style={{
                  borderRadius: 16,
                  padding: '16px 18px',
                  marginTop: 10,
                  fontSize: 24,
                  backgroundColor: i % 2 === 0 ? 'rgba(74, 144, 226, 0.13)' : 'rgba(176, 132, 204, 0.14)',
                }}
              >
                {item}
              </div>
            ))}
          </div>

          <div style={featureCardStyle}>
            {['Guided meditation sessions', 'Sleep stories', 'Breathing exercises'].map((feature, i) => {
              const start = i * 28;
              const opacity = fadeIn(frame, scene1Frames + start, 26);
              const pop = interpolate(frame, [scene1Frames + start, scene1Frames + start + 26], [0.96, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });

              return (
                <div
                  key={feature}
                  style={{
                    flex: 1,
                    padding: '26px 22px',
                    borderRadius: 18,
                    backgroundColor: 'rgba(255,255,255,0.72)',
                    border: '1px solid rgba(74, 144, 226, 0.2)',
                    boxShadow: '0 14px 30px rgba(42, 63, 102, 0.14)',
                    opacity,
                    transform: `scale(${pop}) translateY(${(1 - opacity) * 14}px)`,
                    textAlign: 'center',
                    fontSize: 30,
                    fontWeight: 600,
                    color: COLORS.deepText,
                  }}
                >
                  {feature}
                </div>
              );
            })}
          </div>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={scene1Frames + scene2Frames} durationInFrames={scene3Frames}>
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
          <div
            style={{
              textAlign: 'center',
              width: 1240,
              backgroundColor: 'rgba(255,255,255,0.62)',
              border: '1px solid rgba(176, 132, 204, 0.28)',
              borderRadius: 28,
              padding: '56px 44px',
              boxShadow: '0 24px 50px rgba(63, 92, 141, 0.16)',
              opacity: fadeIn(frame, scene1Frames + scene2Frames, 32),
            }}
          >
            <div style={{display: 'grid', placeItems: 'center', marginBottom: 24}}>
              <LotusIcon frame={frame - (scene1Frames + scene2Frames)} />
            </div>
            <h2 style={{margin: 0, fontSize: 66, lineHeight: 1.15, color: '#355382'}}>Reduce stress in just 10 minutes a day</h2>
          </div>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={scene1Frames + scene2Frames + scene3Frames} durationInFrames={scene4Frames}>
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
          <div
            style={{
              textAlign: 'center',
              opacity: fadeIn(frame, scene1Frames + scene2Frames + scene3Frames, 24),
              transform: `translateY(${interpolate(
                frame,
                [scene1Frames + scene2Frames + scene3Frames, scene1Frames + scene2Frames + scene3Frames + 24],
                [16, 0],
                {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                },
              )}px)`,
            }}
          >
            <h2 style={{fontSize: 78, margin: 0, color: '#315181'}}>Start Your Free Trial Today</h2>
            <p
              style={{
                marginTop: 22,
                fontSize: 44,
                letterSpacing: 1.1,
                color: '#5B5EA6',
                fontWeight: 600,
              }}
            >
              www.mindfulspace.app
            </p>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
