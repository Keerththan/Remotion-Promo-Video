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
  spring,
  Audio
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
  const { fps } = useVideoConfig();
  
  // Entire scene entrance and 3D camera pan
  const sceneOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cameraZ = interpolate(frame, [0, 150], [600, 300], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rotateY = interpolate(frame, [0, 150], [-10, 5], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rotateX = interpolate(frame, [0, 150], [10, 5], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Floating animations for individual UI elements flying in from deep Z-space
  const mainDashZ = spring({ frame: frame - 10, fps, config: { damping: 14 } });
  const sidebarZ = spring({ frame: frame - 25, fps, config: { damping: 14 } });
  const topBarZ = spring({ frame: frame - 35, fps, config: { damping: 14 } });
  const statCard1Z = spring({ frame: frame - 45, fps, config: { damping: 14 } });
  const statCard2Z = spring({ frame: frame - 50, fps, config: { damping: 14 } });
  const chartCardZ = spring({ frame: frame - 60, fps, config: { damping: 14 } });

  // UI Colors matching the dark cinematic reference
  const uiBg = 'rgba(15, 20, 35, 0.7)';
  const glassBorder = '1px solid rgba(255, 255, 255, 0.1)';
  const blur = 'blur(20px)';
  const shadow = '0 30px 60px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.05)';

  return (
    <AbsoluteFill style={{ backgroundColor: '#020510', opacity: sceneOpacity, overflow: 'hidden' }}>
      
      {/* Deep cinematic background glow */}
      <AbsoluteFill>
        <div style={{
          position: 'absolute', top: -200, left: '20%', width: 1000, height: 1000,
          backgroundColor: '#00BDFF', borderRadius: '50%', filter: 'blur(250px)', opacity: 0.15
        }} />
        <div style={{
          position: 'absolute', bottom: -200, right: '10%', width: 1200, height: 800,
          backgroundColor: '#4361EE', borderRadius: '50%', filter: 'blur(300px)', opacity: 0.15
        }} />
      </AbsoluteFill>

      {/* 3D Stage Area */}
      <AbsoluteFill style={{
        perspective: 1500,
        justifyContent: 'center',
        alignItems: 'center',
        transform: `translateZ(${cameraZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d'
      }}>
        
        {/* Main Dashboard Canvas Frame */}
        <div style={{
          width: 1200, height: 700,
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}>
          
          {/* Base Glass Layer (The App Window) */}
          <div style={{
            position: 'absolute', width: '100%', height: '100%',
            backgroundColor: 'rgba(10, 15, 25, 0.6)',
            backdropFilter: blur, WebkitBackdropFilter: blur,
            borderRadius: 24, border: glassBorder, boxShadow: shadow,
            transform: `translateZ(${interpolate(mainDashZ, [0, 1], [-800, 0])}px)`,
            opacity: interpolate(mainDashZ, [0, 1], [0, 1])
          }}>
            
            {/* Sidebar */}
            <div style={{
              position: 'absolute', left: 20, top: 20, bottom: 20, width: 220,
              backgroundColor: uiBg, borderRadius: 16, border: glassBorder,
              transform: `translateZ(${interpolate(sidebarZ, [0, 1], [400, 20])}px)`,
              opacity: interpolate(sidebarZ, [0, 1], [0, 1]),
              padding: 20, display: 'flex', flexDirection: 'column', gap: 16,
              boxShadow: '20px 0 40px rgba(0,0,0,0.2)'
            }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#00BDFF', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{width: 24, height: 24, backgroundColor: '#00BDFF', borderRadius: 4, transform: 'rotate(45deg)'}} />
                Sparengine
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px', backgroundColor: 'rgba(0, 189, 255, 0.1)', borderRadius: 8, color: C.white, fontWeight: 600 }}>
                <div style={{width: 16, height: 16, backgroundColor: '#00BDFF', borderRadius: 4}} />
                Upload Data
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px', color: C.textSub, fontWeight: 500 }}>
                <div style={{width: 16, height: 16, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 4}} />
                Engine Logs
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px', color: C.textSub, fontWeight: 500 }}>
                <div style={{width: 16, height: 16, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 4}} />
                Analytics
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px', color: C.textSub, fontWeight: 500 }}>
                <div style={{width: 16, height: 16, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 4}} />
                Settings
              </div>
            </div>

            {/* Top Navigation Bar */}
            <div style={{
              position: 'absolute', left: 260, top: 20, right: 20, height: 80,
              backgroundColor: uiBg, borderRadius: 16, border: glassBorder,
              transform: `translateZ(${interpolate(topBarZ, [0, 1], [500, 30])}px)`,
              opacity: interpolate(topBarZ, [0, 1], [0, 1]),
              display: 'flex', alignItems: 'center', padding: '0 30px', justifyContent: 'space-between'
            }}>
              <div style={{ fontSize: 20, fontWeight: 600, color: C.white }}>
                Welcome back, MRO Agent
              </div>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ color: C.textSub }}>System Online</div>
                <div style={{ width: 40, height: 40, backgroundColor: '#00BDFF', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)' }} />
              </div>
            </div>

              {/* Content Area - Floating Cards */}
            <div style={{
              position: 'absolute', left: 260, top: 120, right: 20, bottom: 20,
              display: 'flex', flexWrap: 'wrap', gap: 20, transformStyle: 'preserve-3d'
            }}>
              
              {/* Stat Card 1 - Upload Title */}
              <div style={{
                width: 'calc(50% - 10px)', height: 160, backgroundColor: uiBg,
                borderRadius: 16, border: glassBorder, padding: 24,
                transform: `translateZ(${interpolate(statCard1Z, [0, 1], [600, 40])}px)`,
                opacity: interpolate(statCard1Z, [0, 1], [0, 1]),
                boxShadow: '-20px 20px 40px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'center'
              }}>
                 <div style={{fontSize: 28, fontWeight: 700, color: C.white, marginBottom: 8}}>Send your documents</div>
                 <div style={{fontSize: 16, color: C.textSub}}>Upload PDFs or a ZIP file.</div>
              </div>

              {/* Stat Card 2 - Drag & Drop Area */}
              <div style={{
                width: 'calc(50% - 10px)', height: 160, backgroundColor: 'rgba(67, 97, 238, 0.1)',
                borderRadius: 16, border: '2px dashed rgba(67, 97, 238, 0.4)', padding: 24,
                transform: `translateZ(${interpolate(statCard2Z, [0, 1], [700, 50])}px)`,
                opacity: interpolate(statCard2Z, [0, 1], [0, 1]),
                boxShadow: '-20px 20px 40px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
              }}>
                <div style={{width: 40, height: 40, backgroundColor: 'rgba(67, 97, 238, 0.2)', borderRadius: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 12}}>
                   <div style={{width: 20, height: 20, backgroundColor: '#4361EE', borderRadius: 6}} />
                </div>
                <div style={{fontSize: 18, fontWeight: 600, color: C.white}}>Drag-and-Drop Your Files</div>
                <div style={{fontSize: 14, color: C.textDim, marginTop: 4}}>Max size: 5 GB</div>
              </div>

              {/* Main Chart/Analytics Card - Upload Progress */}
              <div style={{
                width: '100%', flex: 1, backgroundColor: uiBg,
                borderRadius: 16, border: glassBorder, padding: 30, display: 'flex', flexDirection: 'column', justifyContent: 'center',
                transform: `translateZ(${interpolate(chartCardZ, [0, 1], [800, 60])}px)`,
                opacity: interpolate(chartCardZ, [0, 1], [0, 1]),
                boxShadow: '-30px 30px 60px rgba(0,0,0,0.4)'
              }}>
                 <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
                   <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                     <div style={{width: 48, height: 48, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                       <div style={{width: 20, height: 24, backgroundColor: '#00BDFF', borderRadius: 4}} />
                     </div>
                     <div>
                       <div style={{fontSize: 20, fontWeight: 600, color: C.white}}>12073_REDUCTION_GEAR.zip</div>
                       <div style={{fontSize: 14, color: C.textSub, marginTop: 4}}>
                          20.53 MB • Uploading...
                       </div>
                     </div>
                   </div>
                   <div style={{fontSize: 24, color: '#00BDFF', fontWeight: 700}}>
                     {Math.round(interpolate(frame, [60, 150], [0, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}))}%
                   </div>
                 </div>
                 <div style={{width: '100%', height: 12, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 6, overflow: 'hidden'}}>
                   <div style={{
                     width: `${interpolate(frame, [60, 150], [0, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}%`, 
                     height: '100%', backgroundColor: '#00BDFF'
                   }} />
                 </div>
                 
                 <div style={{marginTop: 40, display: 'flex', justifyContent: 'flex-end'}}>
                    <div style={{
                      padding: '16px 40px', backgroundColor: '#4361EE', color: '#fff', borderRadius: 12, fontSize: 18, fontWeight: 600,
                      boxShadow: '0 10px 20px rgba(67, 97, 238, 0.4)'
                    }}>
                      Start Analysis
                    </div>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </AbsoluteFill>
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

export const BasedReferenceComposition: React.FC = () => {
  const {fps} = useVideoConfig();
  
  return (
    <AbsoluteFill style={{backgroundColor: C.bg, fontFamily}}>
      {/* 
        Placeholder Background Music 
        To use your own track, place 'bgm.mp3' in the public folder and change src to: staticFile('bgm.mp3')
      */}
      <Audio 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
        volume={0.3} 
      />

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
