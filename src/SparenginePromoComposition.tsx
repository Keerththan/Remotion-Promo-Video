import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  Img,
  spring
} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Inter';

const {fontFamily} = loadFont('normal', {
  weights: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

const C = {
  bg: '#050505',
  white: '#FFFFFF',
  blue: '#00BDFF',
  textSub: 'rgba(255, 255, 255, 0.65)',
  textDim: 'rgba(255, 255, 255, 0.35)',
};

const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
const EASE_IN_OUT = Easing.bezier(0.45, 0, 0.55, 1);

const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30, 60, 90], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE_IN_OUT
  });
  
  const textScale = interpolate(frame, [0, 90], [0.95, 1.05], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: C.bg, justifyContent: 'center', alignItems: 'center'}}>
      <div style={{
        opacity,
        transform: `scale(${textScale})`,
        color: C.white,
        fontSize: 80,
        fontWeight: 600,
        letterSpacing: '-0.02em',
        textShadow: `0 0 30px rgba(255, 255, 255, 0.4)`,
      }}>
        Aircraft records are complex.
      </div>
    </AbsoluteFill>
  );
};

const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = interpolate(frame, [0, 20, 190, 210], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  
  const zoom = interpolate(frame, [0, 210], [1.1, 1.0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  const tags = [
    { text: 'Chaos and Confusion', startX: 200, startY: 250, delay: 10 },
    { text: 'Messy documents', startX: 1100, startY: 200, delay: 25 },
    { text: 'Broken data/Missing Records', startX: 250, startY: 650, delay: 40 },
    { text: 'Warning flags', startX: 1250, startY: 700, delay: 55 },
  ];

  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
       <AbsoluteFill style={{opacity}}>
         <Img src={staticFile('problem.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6, transform: `scale(${zoom})`}} />
       </AbsoluteFill>

       <AbsoluteFill style={{opacity}}>
          {tags.map((tag, i) => {
            const tagOpacity = interpolate(frame, [tag.delay, tag.delay + 15], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
            const tagScale = spring({frame: frame - tag.delay, fps, config: {damping: 14}});
            const moveY = Math.sin((frame - tag.delay) * 0.05) * 15;
            
            return (
              <div key={i} style={{
                position: 'absolute',
                left: tag.startX,
                top: tag.startY + moveY,
                transform: `scale(${tagScale})`,
                opacity: tagOpacity,
                backgroundColor: 'rgba(10, 10, 15, 0.85)',
                color: C.white,
                padding: '24px 40px',
                borderRadius: 12,
                fontSize: 36,
                fontWeight: 600,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 59, 48, 0.2)',
                border: '2px solid rgba(255, 59, 48, 0.5)',
                letterSpacing: '-0.01em',
              }}>
                {tag.text}
              </div>
            )
         })}
       </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 20], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  
  // 1) 3D Isometric Webpage Scroll
  const scrollY = interpolate(frame, [10, 80], [0, -1400], {easing: EASE_IN_OUT, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const rotateX = interpolate(frame, [0, 80], [25, 20], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const rotateZ = interpolate(frame, [0, 80], [-25, -15], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const scale3d = interpolate(frame, [0, 80], [1.3, 1.1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  const cursorX = interpolate(frame, [50, 80], [800, 960], {easing: EASE_IN_OUT, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const cursorY = interpolate(frame, [50, 80], [400, 500], {easing: EASE_IN_OUT, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const cursorScale = frame >= 80 && frame < 85 ? 0.7 : 1;
  const cursorOp = interpolate(frame, [50, 60, 80, 85], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  // 2) Smooth Crossfade Transitions
  // Website gracefully fades out and scales slightly
  const websiteOpOut = interpolate(frame, [80, 88], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const websiteScaleOut = interpolate(frame, [80, 88], [1, 1.15], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  
  // Dashboard background gently fades in
  const dashBgOp = interpolate(frame, [82, 90], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  const isDashboard = frame >= 82;
  const dashFrame = Math.max(0, frame - 90);

  // Upload progress animation inside the dashboard
  const progress = interpolate(dashFrame, [15, 50], [0, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const showSuccess = dashFrame > 50;

  // Dashboard UI smooth, gentle float up and fade in
  const dashOp = interpolate(dashFrame, [0, 15], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const dashY = interpolate(dashFrame, [0, 20], [40, 0], {easing: EASE_OUT, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{backgroundColor: '#050505', opacity: fadeIn}}>
      
      {/* 1) 3D Isometric Full Page Website Scroll */}
      {frame < 88 && (
        <AbsoluteFill style={{overflow: 'hidden', perspective: 1800, opacity: websiteOpOut, transform: `scale(${websiteScaleOut})`}}>
           <div style={{
             width: '100%', height: '100%',
             transform: `rotateX(${rotateX}deg) rotateZ(${rotateZ}deg) scale(${scale3d})`,
             transformStyle: 'preserve-3d',
             position: 'relative', display: 'flex', justifyContent: 'center'
           }}>
             <div style={{
               position: 'absolute', top: '10%', width: '80%',
               transform: `translateY(${scrollY}px)`,
               boxShadow: '-30px 40px 100px rgba(0,0,0,0.8)',
               borderRadius: 24, overflow: 'hidden', backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)'
             }}>
               <Img src={staticFile('website-fullpage.png')} style={{width: '100%', height: 'auto', display: 'block'}} />
             </div>
             
             {/* 3D Cursor */}
             <div style={{
               position: 'absolute', top: cursorY, left: cursorX, width: 48, height: 48,
               borderRadius: '50%', backgroundColor: 'rgba(67, 97, 238, 0.9)', border: '3px solid #FFF',
               boxShadow: '0 0 30px rgba(67, 97, 238, 0.8)',
               transform: `scale(${cursorScale}) translateZ(20px)`, opacity: cursorOp, zIndex: 10
             }} />
           </div>
        </AbsoluteFill>
      )}

      {/* 2) Realistic Dashboard displaying the Upload Process */}
      {isDashboard && (
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', backgroundColor: `rgba(248, 249, 251, ${dashBgOp})`}}>
          
          <div style={{
            width: 800, backgroundColor: '#FFFFFF', borderRadius: 24, padding: 50,
            boxShadow: '0 30px 60px rgba(0,0,0,0.05)', border: '1px solid #F3F4F6',
            opacity: dashOp, transform: `translateY(${dashY}px)`, 
            display: 'flex', flexDirection: 'column', position: 'relative'
          }}>
            <div style={{display: 'flex', alignItems: 'center', gap: 20, marginBottom: 40}}>
               <div style={{width: 48, height: 48, backgroundColor: '#4361EE', borderRadius: 12, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                 <div style={{width: 20, height: 20, border: '3px solid #fff', borderRadius: 4, transform: 'rotate(45deg)'}} />
               </div>
               <div>
                 <div style={{fontSize: 28, fontWeight: 700, color: '#111'}}>Send your documents</div>
                 <div style={{fontSize: 16, color: '#6B7280', marginTop: 4}}>Upload PDFs or a ZIP file.</div>
               </div>
            </div>

            <div style={{
              border: '2px dashed #D1D5DB', borderRadius: 16, padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 30, backgroundColor: '#F9FAFB'
            }}>
              <div style={{width: 60, height: 60, backgroundColor: 'rgba(67, 97, 238, 0.1)', borderRadius: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 16}}>
                <div style={{position: 'relative', width: 30, height: 20, backgroundColor: '#4361EE', borderRadius: 10}}>
                  <div style={{position: 'absolute', top: -10, left: 4, width: 14, height: 14, backgroundColor: '#4361EE', borderRadius: 7}} />
                  <div style={{position: 'absolute', top: -14, right: 4, width: 18, height: 18, backgroundColor: '#4361EE', borderRadius: 9}} />
                </div>
              </div>
              <div style={{fontSize: 18, fontWeight: 600, color: '#111'}}>Drag-and-Drop Your Files here</div>
              <div style={{fontSize: 14, color: '#6B7280', marginTop: 8}}>Maximum upload size: 5 GB</div>
            </div>

            {dashFrame > 10 && (
              <div style={{
                border: '1px solid #E5E7EB', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column',
                backgroundColor: '#fff', boxShadow: '0 10px 20px rgba(0,0,0,0.02)'
              }}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                    <div style={{width: 32, height: 32, backgroundColor: '#F3F4F6', borderRadius: 8, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                      <div style={{width: 14, height: 18, backgroundColor: '#9CA3AF', borderRadius: 2}} />
                    </div>
                    <div>
                      <div style={{fontSize: 16, fontWeight: 600, color: '#111'}}>12073_REDUCTION_GEAR.zip</div>
                      <div style={{fontSize: 14, color: '#6B7280', marginTop: 2}}>
                         {showSuccess ? '20.53 MB • Upload Complete' : `20.53 MB • ${Math.round(progress)}% Uploading...`}
                      </div>
                    </div>
                  </div>
                  {showSuccess && <div style={{color: '#10B981', fontWeight: 700, fontSize: 16}}>✓</div>}
                </div>
                <div style={{width: '100%', height: 8, backgroundColor: '#F3F4F6', borderRadius: 4, overflow: 'hidden'}}>
                  <div style={{width: `${progress}%`, height: '100%', backgroundColor: showSuccess ? '#10B981' : '#4361EE'}} />
                </div>
              </div>
            )}

            <div style={{marginTop: 30, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div style={{fontSize: 14, color: '#6B7280', fontWeight: 500}}>
                {showSuccess ? 'Ready for processing' : 'Preparing environment...'}
              </div>
              <div style={{
                padding: '14px 32px', backgroundColor: showSuccess ? '#10B981' : '#111', color: '#fff', borderRadius: 8, fontSize: 16, fontWeight: 600,
                opacity: dashFrame < 10 ? 0.5 : 1
              }}>
                {showSuccess ? 'Start Analysis' : 'Upload Files'}
              </div>
            </div>
            
            {/* Cursor interacting inside the dashboard */}
            <div style={{
              position: 'absolute',
              top: interpolate(dashFrame, [5, 15], [300, 480], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
              left: interpolate(dashFrame, [5, 15], [600, 680], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
              width: 24, height: 24, borderRadius: '50%', backgroundColor: 'rgba(67, 97, 238, 0.8)',
              boxShadow: '0 0 20px rgba(67, 97, 238, 0.6)',
              opacity: interpolate(dashFrame, [5, 10, 18, 20], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
              transform: `scale(${dashFrame >= 15 && dashFrame < 18 ? 0.7 : 1})`,
              zIndex: 20
            }} />
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fadeIn = interpolate(frame, [0, 15], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  // Exact text and structure from finding.png
  const findings = [
    { 
      dot: '#10B981', 
      title: "No preservation certificate", 
      tag: "Engine",
      desc: "Engine is IN STORAGE since Nov 2024 but logbook storage pages (Section A, p.6-9) are blank. No preservation method, date, or expiry recorded.", 
      rec: "Request preservation records. May require borescope before return to service."
    },
    { 
      dot: '#3B82F6',
      title: "AD 2019-0110 not verified", 
      tag: "Engine",
      desc: "SB 292 72 2868 compliance not found in logbook. Must verify before return to service.", 
      rec: "Request compliance evidence from operator/MRO."
    },
    { 
      dot: '#10B981',
      title: "HMU calendar expired", 
      tag: "HMU",
      desc: "HMU (P/N 0292861840, SN 977B) calendar limit was 2023-04-15 — expired over 3 years ago.", 
      rec: "HMU requires overhaul or replacement before return to service."
    },
    { 
      dot: '#10B981',
      title: "Released without test", 
      tag: "Engine",
      desc: "Both EASA Form 1 certificates state 'ENGINE RELEASED WITHOUT TEST'. Test cell run may be required.", 
      rec: "Confirm with NAA whether ground/test run is required."
    }
  ];

  return (
    <AbsoluteFill style={{opacity: fadeIn, overflow: 'hidden', backgroundColor: '#050505'}}>
      
      {/* Animated Glowing Orbs for Glassmorphism Background */}
      <AbsoluteFill>
        <div style={{
          position: 'absolute', top: -100, left: 100, width: 800, height: 800,
          backgroundColor: '#4361EE', borderRadius: '50%', filter: 'blur(180px)', opacity: 0.35,
          transform: `translate(${Math.sin(frame * 0.02) * 100}px, ${Math.cos(frame * 0.02) * 100}px)`
        }} />
        <div style={{
          position: 'absolute', bottom: -100, right: 100, width: 800, height: 800,
          backgroundColor: '#8B5CF6', borderRadius: '50%', filter: 'blur(180px)', opacity: 0.35,
          transform: `translate(${Math.cos(frame * 0.02) * 100}px, ${Math.sin(frame * 0.02) * 100}px)`
        }} />
      </AbsoluteFill>

      {/* Screenshot Header Structure (FINDINGS 9 / CRITICAL (4)) */}
      <div style={{
        position: 'absolute', top: 60, left: '50%', transform: `translateX(-50%) translateY(${interpolate(frame, [10, 30], [20, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px)`, 
        width: 1000,
        opacity: interpolate(frame, [10, 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
      }}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8}}>
           <div style={{color: 'rgba(255,255,255,0.7)', fontSize: 24, fontWeight: 600, letterSpacing: '0.02em'}}>ⓘ FINDINGS</div>
           <div style={{backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#EF4444', padding: '4px 12px', borderRadius: 8, fontWeight: 700, fontSize: 18}}>9</div>
        </div>
        <div style={{color: '#EF4444', fontSize: 16, fontWeight: 700, letterSpacing: '0.05em'}}>CRITICAL (4)</div>
      </div>

      {/* Glassmorphism Findings List - One below the other */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 16,
        position: 'absolute', top: 160, left: '50%', transform: 'translateX(-50%)', width: 1000
      }}>
        {findings.map((finding, i) => {
          const delay = i * 30 + 30; // Staggered entry delay
          const itemSpring = spring({frame: frame - delay, fps, config: {damping: 14}});
          const yOffset = interpolate(itemSpring, [0, 1], [60, 0]);
          
          return (
            <div key={i} style={{
              display: 'flex', flexDirection: 'column', padding: '24px 32px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)', // Glass effect base
              backdropFilter: 'blur(24px)', // The glassmorphism blur
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(239, 68, 68, 0.2)', // Light red glass border to signify CRITICAL
              borderRadius: 16,
              boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 0 20px rgba(255,255,255,0.02)',
              opacity: itemSpring,
              transform: `translateY(${yOffset}px)`,
              position: 'relative', overflow: 'hidden'
            }}>
              {/* Header Row */}
              <div style={{display: 'flex', alignItems: 'center', marginBottom: 12}}>
                <div style={{width: 8, height: 8, backgroundColor: finding.dot, borderRadius: 4, marginRight: 10}} />
                <div style={{color: '#EF4444', marginRight: 12, fontSize: 18}}>⚠️</div>
                <div style={{color: '#FFF', fontSize: 20, fontWeight: 600, marginRight: 12}}>{finding.title}</div>
                <div style={{color: 'rgba(255,255,255,0.4)', fontSize: 14, fontWeight: 500}}>{finding.tag}</div>
              </div>

              {/* Description */}
              <div style={{color: 'rgba(255,255,255,0.8)', fontSize: 16, lineHeight: 1.5, marginBottom: 12}}>
                {finding.desc}
              </div>

              {/* Recommendation */}
              <div style={{display: 'flex', alignItems: 'flex-start', color: 'rgba(255,255,255,0.5)', fontSize: 15}}>
                <span style={{marginRight: 8, color: '#EF4444', fontWeight: 600}}>{'>'}</span>
                <span>{finding.rec}</span>
              </div>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  );
};

const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  // Animation: "Everything clicks into place" -> 4 data beams snapping into the center
  const snapSpring = spring({frame, fps, config: {damping: 12, mass: 0.5}}); 
  
  // The dot expands into a line
  const expandSpring = spring({frame: frame - 15, fps, config: {damping: 16}});
  
  // Text fade in gracefully
  const textOp = interpolate(frame, [20, 35], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const textY = interpolate(spring({frame: frame - 20, fps, config: {damping: 14}}), [0, 1], [30, 0]);

  // "One clean output" -> 
  // Beams hitting the center causing a bright flash, representing a clean resolution
  const beamOp = interpolate(frame, [0, 10, 16], [0, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const beamDist = interpolate(snapSpring, [0, 1], [1500, 0]);
  const flash = interpolate(frame, [14, 18, 30], [0, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{backgroundColor: '#050505', opacity: fadeIn, justifyContent: 'center', alignItems: 'center', overflow: 'hidden'}}>
      
      {/* 4 incoming high-speed light beams representing chaotic data */}
      <div style={{position: 'absolute', top: '50%', left: `calc(50% - ${beamDist}px - 200px)`, width: 200, height: 4, backgroundColor: '#4361EE', boxShadow: '0 0 30px #4361EE', opacity: beamOp, transform: 'translateY(-50%)'}} />
      <div style={{position: 'absolute', top: '50%', right: `calc(50% - ${beamDist}px - 200px)`, width: 200, height: 4, backgroundColor: '#4361EE', boxShadow: '0 0 30px #4361EE', opacity: beamOp, transform: 'translateY(-50%)'}} />
      <div style={{position: 'absolute', left: '50%', top: `calc(50% - ${beamDist}px - 200px)`, width: 4, height: 200, backgroundColor: '#4361EE', boxShadow: '0 0 30px #4361EE', opacity: beamOp, transform: 'translateX(-50%)'}} />
      <div style={{position: 'absolute', left: '50%', bottom: `calc(50% - ${beamDist}px - 200px)`, width: 4, height: 200, backgroundColor: '#4361EE', boxShadow: '0 0 30px #4361EE', opacity: beamOp, transform: 'translateX(-50%)'}} />

      {/* Central Flash when everything clicks into place */}
      <div style={{
        position: 'absolute', width: 1000, height: 1000, borderRadius: '50%',
        backgroundColor: '#4361EE', opacity: flash * 0.4, filter: 'blur(150px)', pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', width: 400, height: 400, borderRadius: '50%',
        backgroundColor: '#FFFFFF', opacity: flash * 0.8, filter: 'blur(50px)', pointerEvents: 'none'
      }} />

      {/* The Clean Output Sentence */}
      <div style={{
        position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center',
        opacity: textOp, transform: `translateY(${textY}px)`
      }}>
        {/* Subtle glowing accent line above text indicating a system output */}
        <div style={{
          width: interpolate(expandSpring, [0, 1], [0, 120]), height: 4, backgroundColor: '#4361EE',
          boxShadow: '0 0 20px #4361EE', borderRadius: 2, marginBottom: 40
        }} />

        <div style={{
          color: '#FFF', fontSize: 68, fontWeight: 700, letterSpacing: '-0.02em', textAlign: 'center',
          textShadow: '0 10px 40px rgba(0,0,0,0.5)', maxWidth: 1400, lineHeight: 1.2
        }}>
          Know what's in your records<br />
          <span style={{color: '#4361EE'}}>before it costs you.</span>
        </div>
      </div>

    </AbsoluteFill>
  );
};

const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  
  // Smooth fade in from black, and fade out at the very end
  const fadeIn = interpolate(frame, [0, 30], [0, 1], {easing: EASE_OUT, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const fadeOut = interpolate(frame, [150, 180], [1, 0], {easing: EASE_OUT, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  
  // Graceful slow zoom-in animation over the entire duration
  const scale = interpolate(frame, [0, 180], [1.0, 1.15], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{backgroundColor: '#050505', justifyContent: 'center', alignItems: 'center'}}>
      <AbsoluteFill style={{opacity: fadeIn * fadeOut, overflow: 'hidden'}}>
        <Img 
          src={staticFile('ending image.jpg')} 
          style={{
            width: '100%', height: '100%', objectFit: 'cover', 
            transform: `scale(${scale})`, transformOrigin: 'center center'
          }} 
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const SparenginePromoComposition: React.FC = () => {
  const {fps} = useVideoConfig();
  
  return (
    <AbsoluteFill style={{backgroundColor: C.bg, fontFamily}}>
      <Sequence from={0} durationInFrames={3 * fps}>
        <Scene1 />
      </Sequence>
      <Sequence from={3 * fps} durationInFrames={7 * fps}>
        <Scene2 />
      </Sequence>
      <Sequence from={10 * fps} durationInFrames={5 * fps}>
        <Scene3 />
      </Sequence>
      <Sequence from={15 * fps} durationInFrames={7 * fps}>
        <Scene4 />
      </Sequence>
      <Sequence from={22 * fps} durationInFrames={2 * fps}>
        <Scene5 />
      </Sequence>
      <Sequence from={24 * fps} durationInFrames={6 * fps}>
        <Scene6 />
      </Sequence>
    </AbsoluteFill>
  );
};
