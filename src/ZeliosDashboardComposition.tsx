import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

// You can load external fonts, but for simplicity we rely on system fonts that look good (like system-ui)
// Or use Inter if installed.
const fontFamily = '"Inter", system-ui, -apple-system, sans-serif';

const colors = {
  bgBase: '#020617',
  gridLines: 'rgba(255, 255, 255, 0.03)',
  glowBlue: '#3b82f6',
  glowViolet: '#8b5cf6',
  panelBg: 'rgba(15, 23, 42, 0.4)',
  panelBorder: 'rgba(255, 255, 255, 0.1)',
  textPrimary: '#ffffff',
  textSecondary: '#94a3b8',
};

// -- Reusable Components --

const GlassPanel: React.FC<{
  style?: React.CSSProperties;
  children: React.ReactNode;
  className?: string;
}> = ({ style, children }) => (
  <div
    style={{
      backgroundColor: colors.panelBg,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: `1px solid ${colors.panelBorder}`,
      borderRadius: '24px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255,255,255,0.1)',
      ...style,
    }}
  >
    {children}
  </div>
);

const FloatingWidget: React.FC<{
  label: string;
  icon: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ label, icon, style }) => (
  <GlassPanel
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 20px',
      borderRadius: '16px',
      position: 'absolute',
      backgroundColor: 'rgba(59, 130, 246, 0.15)', // Tinge of blue
      border: '1px solid rgba(59, 130, 246, 0.3)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      ...style,
    }}
  >
    <div style={{ color: '#fff', display: 'flex', alignItems: 'center' }}>
      {icon}
    </div>
    <span style={{ color: '#fff', fontSize: '14px', fontWeight: 500 }}>{label}</span>
  </GlassPanel>
);

export const ZeliosDashboardComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation logic: zoom out over the first 4 seconds (120 frames), hold for the rest.
  // We use spring for a smooth starting decel.
  const zoomScale = interpolate(
    spring({ frame, fps, config: { damping: 200, mass: 5, stiffness: 20 } }),
    [0, 1],
    [2.8, 1.0] // Start at 2.8x zoom, scale down to 1.0
  );
  
  // Background rotation/moving effect
  const bgRotation = interpolate(frame, [0, 300], [0, 5]);

  // Floating Widgets Shake and Fly Away
  // Shake intensity is active while moving backward.
  const shakeIntensity = interpolate(frame, [0, 60], [5, 0], { extrapolateRight: 'clamp' });
  const shakeX = Math.sin(frame * 1.5) * shakeIntensity;
  const shakeY = Math.cos(frame * 1.7) * shakeIntensity;

  // Fly away outward after initial zoom
  const flyOutLeft = interpolate(frame, [50, 120], [0, -1000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const flyOutRight = interpolate(frame, [50, 120], [0, 1000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  
  // Fade out as they fly
  const flyOutOpacity = interpolate(frame, [80, 120], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bgBase, fontFamily, overflow: 'hidden' }}>
      
      {/* BACKGROUND EFFECTS */}
      <div style={{
          position: 'absolute', width: '200%', height: '200%',
          top: '-50%', left: '-50%',
          backgroundImage: `
            linear-gradient(to right, ${colors.gridLines} 1px, transparent 1px),
            linear-gradient(to bottom, ${colors.gridLines} 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          transform: `rotate(${bgRotation}deg) scale(1.2)`,
          opacity: 0.5,
      }} />

      {/* Central Glowing Planet/Arc */}
      <div style={{
        position: 'absolute',
        top: '60%', 
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '1800px',
        height: '1800px',
        borderRadius: '50%',
        borderTop: '2px solid rgba(59, 130, 246, 0.8)',
        boxShadow: '0 -20px 150px 20px rgba(59, 130, 246, 0.2), inset 0 20px 100px rgba(139, 92, 246, 0.1)',
        opacity: 0.8
      }} />

      {/* Glow Orbs */}
      <div style={{
        position: 'absolute', top: '30%', left: '20%',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(60px)'
      }} />
      <div style={{
        position: 'absolute', top: '40%', right: '10%',
        width: '800px', height: '800px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(80px)'
      }} />


      {/* MAIN CAMERA SCALER */}
      <AbsoluteFill style={{
        transform: `scale(${zoomScale})`,
        transformOrigin: '48% 45%', // slightly off-center to focus on the main UI
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>

        {/* Global Branding overlay that moves with camera but is in the background context */}
        <div style={{ position: 'absolute', top: '100px', left: '100px', display: 'flex', alignItems: 'center', gap: '15px', zIndex: 1 }}>
          <div style={{ color: '#fff', fontSize: '42px', fontWeight: 700, letterSpacing: '-1px' }}>zelios</div>
        </div>

        <div style={{ position: 'absolute', top: '80px', width: '100%', textAlign: 'center', zIndex: 1 }}>
          <div style={{ color: '#fff', fontSize: '56px', fontWeight: 600, letterSpacing: '-1px' }}>Smart Control</div>
          <div style={{ color: colors.textSecondary, fontSize: '42px', fontWeight: 400, marginTop: '10px' }}>Customized Dashboard</div>
        </div>


        {/* THE NEURAFLOW DASHBOARD (Main App Window) */}
        <div style={{ position: 'relative', zIndex: 10 }}>
          
          <GlassPanel style={{
            width: '1200px',
            height: '750px',
            display: 'flex',
            overflow: 'hidden',
          }}>
            {/* SIDEBAR */}
            <div style={{
              width: '240px',
              borderRight: `1px solid ${colors.panelBorder}`,
              display: 'flex',
              flexDirection: 'column',
              padding: '24px',
              backgroundColor: 'rgba(0,0,0,0.2)'
            }}>
              <div style={{ color: '#fff', fontSize: '20px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '24px' }}>✦</span> NeuraFlow
              </div>

              {/* Profile Block */}
              <div style={{ marginTop: '40px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#475569', overflow: 'hidden' }}>
                    <div style={{ width: '100%', height: '100%', backgroundImage: 'radial-gradient(#94a3b8, #475569)' }} />
                </div>
                <div>
                  <div style={{ color: '#fff', fontSize: '14px', fontWeight: 600 }}>Mark Smith</div>
                  <div style={{ color: colors.textSecondary, fontSize: '11px' }}>Personal Account</div>
                </div>
              </div>

              {/* Nav Links */}
              <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ padding: '10px 16px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', color: '#fff', fontSize: '14px', display: 'flex', gap: '12px' }}>
                   <span>🏠</span> Dashboard
                </div>
                <div style={{ padding: '10px 16px', color: colors.textSecondary, fontSize: '14px', display: 'flex', gap: '12px' }}>
                   <span>📊</span> Tables
                </div>
                <div style={{ padding: '10px 16px', color: colors.textSecondary, fontSize: '14px', display: 'flex', gap: '12px' }}>
                   <span>🔔</span> Notifications
                </div>
              </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div style={{ flex: 1, padding: '40px', paddingBottom: '0', display: 'flex', flexDirection: 'column' }}>
              
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Search Bar */}
                <div style={{
                  width: '300px', padding: '12px 20px', borderRadius: '24px',
                  backgroundColor: 'rgba(255,255,255,0.05)', border: `1px solid ${colors.panelBorder}`,
                  color: colors.textSecondary, fontSize: '14px', display: 'flex', gap: '10px'
                }}>
                  <span>🔍</span> Search
                </div>
                {/* Actions */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>📅</div>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>💬</div>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>🔔</div>
                </div>
              </div>

              {/* Greeting */}
              <div style={{ marginTop: '40px' }}>
                <div style={{ color: '#fff', fontSize: '42px', fontWeight: 600, letterSpacing: '-1px', lineHeight: 1.2 }}>Hello, Mark</div>
                <div style={{ color: '#38bdf8', fontSize: '42px', fontWeight: 500, letterSpacing: '-1px', lineHeight: 1.2 }}>How can I help you today?</div>
              </div>

              {/* Toolbar Buttons */}
              <div style={{ display: 'flex', gap: '16px', marginTop: '30px', justifyContent: 'flex-end', paddingRight: '20px' }}>
                <div style={{ padding: '8px 20px', borderRadius: '20px', backgroundColor: '#3b82f6', color: '#fff', fontSize: '12px', fontWeight: 600 }}>✨ Ask AI</div>
                <div style={{ padding: '8px 20px', borderRadius: '20px', backgroundColor: 'rgba(255,255,255,0.05)', border: `1px solid ${colors.panelBorder}`, color: '#fff', fontSize: '12px', fontWeight: 500 }}>⚙️ Management</div>
                <div style={{ padding: '8px 20px', borderRadius: '20px', backgroundColor: 'rgba(255,255,255,0.05)', border: `1px solid ${colors.panelBorder}`, color: '#fff', fontSize: '12px', fontWeight: 500 }}>+ New project</div>
              </div>

              {/* Grid Content */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '30px' }}>
                
                {/* Welcome Back Card */}
                <GlassPanel style={{ padding: '24px', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                  <div style={{ color: colors.textSecondary, fontSize: '12px' }}>Welcome back,</div>
                  <div style={{ color: '#fff', fontSize: '28px', fontWeight: 600, marginTop: '4px' }}>Mark Smith</div>
                  <div style={{ color: colors.textSecondary, fontSize: '14px', marginTop: '16px', lineHeight: 1.5 }}>
                    Weekly review and refinement<br/>of project prototypes
                  </div>

                  <div style={{ 
                    marginTop: '24px', padding: '16px', borderRadius: '12px', 
                    backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ color: colors.textSecondary, fontSize: '11px' }}>01:30 - 02:40 pm on Tuesday</div>
                      <div style={{ color: '#fff', fontSize: '13px', marginTop: '4px' }}>Weekly review and refinement of project prototypes.</div>
                    </div>
                  </div>
                </GlassPanel>

                {/* Task Completion Card */}
                <GlassPanel style={{ padding: '24px', backgroundColor: 'rgba(255,255,255,0.02)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ color: '#fff', fontSize: '18px', fontWeight: 600 }}>Task completion</div>
                  <div style={{ color: colors.textSecondary, fontSize: '12px', marginTop: '4px' }}>From all projects</div>
                  
                  {/* Circular Progress Placeholder */}
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', marginTop: '20px' }}>
                    <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '8px solid rgba(255,255,255,0.05)', borderTopColor: '#3b82f6', borderRightColor: '#3b82f6', transform: 'rotate(-45deg)' }}></div>
                    <div style={{ position: 'absolute', color: '#fff', fontSize: '24px' }}>☑</div>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: colors.textSecondary, fontSize: '11px', marginTop: '16px' }}>
                    <span>0%</span>
                    <span style={{ color: '#fff', fontSize: '18px', fontWeight: 600 }}>65%</span>
                    <span>100%</span>
                  </div>
                </GlassPanel>

              </div>
            </div>
          </GlassPanel>

          {/* FLOATING HOVER WIDGETS (Outside Dashboard Canvas) */}
          <FloatingWidget
            label="Calendar"
            icon={<span style={{fontSize: '18px'}}>📅</span>}
            style={{ 
              left: '-60px', top: '400px',
              transform: `translate(${shakeX + flyOutLeft}px, ${shakeY}px)`,
              opacity: flyOutOpacity
            }}
          />
          <FloatingWidget
            label="Chat"
            icon={<span style={{fontSize: '18px'}}>💬</span>}
            style={{ 
              left: '-100px', top: '480px',
              transform: `translate(${shakeX + flyOutLeft}px, ${shakeY}px)`,
              opacity: flyOutOpacity
            }}
          />

          {/* Right floating advanced widget */}
          <GlassPanel style={{
            position: 'absolute',
            right: '-120px',
            top: '250px',
            width: '280px',
            padding: '24px',
            border: '1px solid rgba(139, 92, 246, 0.4)', // Violet glow border
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6), 0 0 40px rgba(139, 92, 246, 0.2)',
            transform: `translate(${shakeX + flyOutRight}px, ${shakeY}px)`,
            opacity: flyOutOpacity
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: colors.textSecondary, fontSize: '11px' }}>
              <span>New task</span>
              <span>↗</span>
            </div>
            <div style={{ color: '#fff', fontSize: '18px', fontWeight: 500, marginTop: '16px', lineHeight: 1.4 }}>
              Analyze, customize, and understand search queries
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              <div style={{ padding: '4px 12px', borderRadius: '12px', backgroundColor: 'rgba(59, 130, 246, 0.2)', color: '#93c5fd', fontSize: '11px' }}>Development</div>
              <div style={{ padding: '4px 12px', borderRadius: '12px', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: colors.textSecondary, fontSize: '11px' }}>Research</div>
            </div>
            <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '8px', color: '#fff' }}>
               <span style={{ color: '#8b5cf6' }}>☑</span> 82%
            </div>
          </GlassPanel>

        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
