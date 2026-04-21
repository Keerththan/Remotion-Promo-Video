# 🎬 SparEngine — 30-Second Promo Video Plan
*(Updated with real screenshots & UI analysis)*

## About SparEngine

**SparEngine** is an AI-powered platform that automates the processing and organization of aircraft records. It transforms messy, unstructured documentation (PDFs, scans, spreadsheets) into structured, searchable, audit-ready dossiers for aircraft transactions.

**Tagline:** *"Understand the Asset, Not the Paperwork."*

**Target Audience:** Aircraft Brokers, Lessors, MROs, Operators

---

## 🎨 Brand Identity (from screenshots)

> [!IMPORTANT]
> The actual website uses a **LIGHT theme** — white/light-grey background, NOT dark. The video will use a light theme matching the real product.

### Logo
- **Shape:** Triangular / chevron icon with a **purple-to-blue gradient** (left=purple, right=blue)
- **Name:** `Sparengine` in dark semi-bold text (navbar)
- **Success screen:** Logo centered prominently on clean white page

### Color Palette (corrected)
| Role | Color | Hex |
|------|-------|-----|
| Background | Clean White / Light Grey | `#F8F9FB` |
| Page White | Pure White | `#FFFFFF` |
| Primary Blue | Electric Blue (progress bar, links) | `#4361EE` |
| Logo Gradient Start | Purple | `#8B5CF6` |
| Logo Gradient End | Blue | `#3B82F6` |
| Text Primary | Near Black | `#1A1A2E` |
| Text Secondary | Mid Grey | `#6B7280` |
| Upload Zone Border | Dashed Medium Grey | `#D1D5DB` |
| Progress Fill | Solid Blue | `#4361EE` |
| Progress Track | Light Grey | `#E5E7EB` |
| Success Accent | Purple-Blue gradient | logo colors |

### Typography (from screenshots)
- **Font:** Inter or similar clean sans-serif
- **"Send your documents":** Bold ~28px dark heading
- **Sub-copy:** Regular, grey `#6B7280`
- **Labels:** Small, light grey
- **Button (Upload):** Dark rounded pill, white text

### UI Aesthetic (from screenshots)
- **Clean, minimal, professional** — no dark glassmorphism
- Dashed-border drag-and-drop zone with cloud-upload SVG icon (blue)
- White rounded cards for file list entries
- Progress bar: full-width, blue fill on grey track
- Success screen: centered logo + bold text on white — very calm and reassuring

---

## 🎥 Video Specs

| Property | Value |
|----------|-------|
| Duration | 30 seconds (900 frames) |
| FPS | 30 |
| Resolution | 1920 × 1080 (Full HD) |
| Composition ID | `sparengine-promo` |
| Output | `out/sparengine-promo.mp4` |

---

## 📋 Scene Storyboard (based on real upload flow screenshots)

---

### Scene 1 — Problem Hook (Frames 0–90 | 0–3s)

**Goal:** Show the painful reality of aircraft document chaos.

**Visuals:**
- Light grey background (`#F8F9FB`) fades in — matching real site
- Multiple doc file icons (📄 PDF, 📊 XLS, 🗂 ZIP) float in from random positions, overlapping chaotically
- Subtle desaturation / slight red tint to convey stress
- Text fades in: **"Aircraft records. Thousands of pages."**
- Sub-text appears: *"Messy. Time-consuming. Easy to miss critical gaps."*

**Animation:**
- Icons: staggered random entry using `spring()` with different delays
- Text: slide-up + fade using `interpolate()` with bezier easing
- Jitter/wobble on icons: small oscillating rotation via `Math.sin(frame)`

---

### Scene 2 — Brand Intro (Frames 90–180 | 3–6s)

**Goal:** Introduce SparEngine as the elegant solution.

**Visuals:**
- Document icons scatter + fade away (reverse spring, scale → 0)
- **SparEngine logo** (triangular purple→blue gradient icon) blooms in from center
- `Sparengine` text types/fades in beside logo
- Tagline below: *"No account needed. Upload. We handle the rest."*
- Background: clean white, soft purple radial glow behind logo

**Animation:**
- Logo icon: `spring({ damping: 12, stiffness: 110 })` scale 0.5 → 1
- Text: staggered character/word fade-in using `interpolate()`
- Radial gradient halo: `interpolate(frame, [90, 150], [0, 1])` opacity
- Subtle logo shimmer gradient animation (purple → blue → purple loop)

---

### Scene 3 — Upload Page UI (Frames 180–330 | 6–11s)

**Goal:** Show the real upload interface — "Send your documents."

**Visuals (faithful recreation of screenshot 1):**
- White page card slides in from bottom: `spring()` translateY
- **Page title:** `Send your documents` — bold, dark, centered
- Sub-copy: *"No account needed. Enter your email, upload PDFs or a ZIP..."*
- **Email field** with placeholder `user@example.com` — types in character by character
- **Drag-and-drop zone:** dashed-border rounded card with:
  - Cloud upload SVG icon (blue `#4361EE`) bounces in
  - `Drag-and-Drop Your Files here` label fades in
  - *"Maximum upload size: 5 GB per file."* sub-text
- **Select** (outlined) + **Upload** (dark pill) buttons

**Animation:**
- Card: `spring()` slide up from Y+60 → 0, opacity 0 → 1
- Email typing: `interpolate()` reveals characters over 30 frames
- Dashed border of drop zone: animated `strokeDashoffset` drawing effect
- Cloud icon: `spring()` bounce on entry
- Buttons: staggered fade-slide in

---

### Scene 4 — File Selected (Frames 330–420 | 11–14s)

**Goal:** Show a ZIP file being selected, ready to upload.

**Visuals (faithful recreation of screenshot 2):**
- A file entry card appears below the drop zone with:
  - 📄 Document icon on left
  - **Filename:** `12073 M01, REDUCTION GEAR .zip`
  - **Size:** `20.53 MB · Ready to upload`
  - ✕ dismiss button on right
- **Upload button** glows / pulses once to invite click

**Animation:**
- File card: `spring()` slide down from Y-20 → 0 with soft shadow appearing
- "Ready to upload" text: fade-in after card settles
- Upload button: gentle scale pulse `interpolate(frame, [390,405,420], [1,1.04,1])`

---

### Scene 5 — Preparing & Uploading (Frames 420–600 | 14–20s)

**Goal:** Show the progress bar from 0% → 100% — the core "wow" moment.

**This scene is split into two micro-phases:**

#### Phase A — Preparing (Frames 420–480 | 14–16s)
- Upload button gets spinner: `⟳ Upload` (button turns grey, disabled)
- Progress bar appears below drop zone with label: `Preparing files...` and `0%`
- Progress bar fill: starts at width 0, animates to ~5% slowly

**Animation:**
- Button: fade from black → grey, spinner SVG rotates with `interpolate(frame % 30, [0,30], [0,360])`
- Bar track: fade-in with `spring()`
- Fill: `interpolate(frame, [440, 480], [0, 0.05])` → width as percentage

#### Phase B — Uploading to Server (Frames 480–600 | 16–20s)
- Label changes to: `Uploading to server...`
- Percentage counter ticks up: `33%` → `67%` → `100%` with smooth `interpolate()`
- Blue progress bar fills left to right across full width
- At 100%: brief green flash / checkmark blink on the bar

**Animation:**
- Fill width: `interpolate(frame, [480, 580], [0.05, 1])` — smooth linear fill
- Percentage text: `Math.round(interpolate(frame, [480, 580], [5, 100]))` + `%`
- Progress bar color: blue `#4361EE` throughout, glow shadow pulses subtly
- At frame 580: fill turns briefly green + ✓ icon appears

---

### Scene 6 — Documents Received (Frames 600–720 | 20–24s)

**Goal:** Show the reassuring success state — exactly like screenshot 5.

**Visuals (faithful recreation of success screen):**
- Clean white screen fades in
- **SparEngine logo** (triangular icon, gradient) centered, scaled ~80px
- **"Documents received"** — bold, dark, centered
- Sub-copy: *"We're processing your documents. Once your asset snapshot is ready and approved, we'll send it to your email."*
- `Back to home` link fades in below

**Animation:**
- White background: `interpolate(frame, [600, 630], [0, 1])` opacity
- Logo: `spring({ damping: 14 })` scale bloom from 0.6 → 1
- "Documents received": slide up + fade, starts 15 frames after logo
- Sub-copy: fade-in after heading settles
- Logo gradient animates — slow hue rotation for a premium feel

---

### Scene 7 — Metrics (Frames 720–810 | 24–27s)

**Goal:** Credibility punch — show the real numbers.

**Visuals:**
- Light background, 3 white rounded metric cards side by side
- Each card: icon + large number + label

| Card | Number | Label |
|------|--------|-------|
| ⚡ | **10×** | Faster than manual review |
| 📋 | **5 GB** | Max upload — any file size |
| ✅ | **100%** | Automated gap detection |

**Animation:**
- Cards: staggered `spring()` pop-in, each 18 frames apart
- Numbers: count-up via `interpolate()` (0 → target over 40 frames)
- Border: subtle animated gradient border (purple → blue) on hover-state

---

### Scene 8 — CTA Outro (Frames 810–900 | 27–30s)

**Goal:** Drive action — visit the site, try it now.

**Visuals:**
- Soft white background with subtle purple radial glow
- SparEngine logo + name centered, larger
- **Main CTA:** `"Send your documents. Get your snapshot."` — bold
- **Sub-CTA:** *"No account needed."* — grey
- URL badge: `sparengine.com` — pill shape, blue border, blue text
- Brief floating document particles in background (same icons from scene 1, now calm and organised)

**Animation:**
- Logo: `spring()` scale in
- CTA lines: staggered slide-up, 12 frames apart
- URL badge: slide up from Y+30 → 0 with spring
- Particles: slow float upwards, `interpolate(frame, [810,900], [0,1])` opacity

---

## 🎨 Key UI Elements to Build in Code

| Element | Notes |
|---------|-------|
| **SparEngine Logo Icon** | SVG triangle/chevron shape with `linearGradient` purple→blue |
| **Email Input Field** | Rounded rect, border `#E5E7EB`, typing animation |
| **Upload Drop Zone** | Dashed border, cloud SVG icon in blue, centred text |
| **File Entry Card** | White rounded card, doc icon, filename, size, ✕ button |
| **Progress Bar** | Grey track, blue fill, label left + percent right |
| **Progress Spinner** | Rotating ⟳ on Upload button (grey state) |
| **Success Screen** | White, centered logo + bold heading + sub-copy |
| **Metric Cards** | White rounded, count-up number, icon, label |
| **CTA Badge** | Pill with border, `sparengine.com` in blue |

---

## 🧩 Component Architecture

```
src/
├── Root.tsx                                (modify — add composition)
└── SparenginePromoComposition.tsx          [NEW] — 900-frame main file
    ├── SparEngineLogo                      # SVG triangle gradient icon
    ├── Scene1_ProblemHook                  # frames 0–90
    ├── Scene2_BrandIntro                   # frames 90–180
    ├── Scene3_UploadPage                   # frames 180–330
    │   ├── EmailField                      # typing animation
    │   ├── DropZone                        # dashed border + cloud icon
    │   └── ActionButtons                   # Select/Upload buttons
    ├── Scene4_FileSelected                 # frames 330–420
    │   └── FileEntryCard                   # file name, size, dismiss
    ├── Scene5_UploadProgress               # frames 420–600
    │   ├── ProgressBar                     # fill + counter animating
    │   └── SpinnerButton                   # disabled Upload with spinner
    ├── Scene6_SuccessScreen                # frames 600–720
    ├── Scene7_Metrics                      # frames 720–810
    │   └── MetricCard (×3)                 # count-up + icon
    └── Scene8_CTA                          # frames 810–900
```

---

## 🎞 Frame Timeline Summary

| Scene | Frames | Time | Content |
|-------|--------|------|---------|
| 1 — Problem Hook | 0–90 | 0–3s | Chaotic docs, pain copy |
| 2 — Brand Intro | 90–180 | 3–6s | Logo bloom, tagline |
| 3 — Upload Page UI | 180–330 | 6–11s | Real UI recreation |
| 4 — File Selected | 330–420 | 11–14s | ZIP file card appears |
| 5A — Preparing 0% | 420–480 | 14–16s | Spinner, bar at 0% |
| 5B — Uploading 0→100% | 480–600 | 16–20s | Progress fills up |
| 6 — Documents Received | 600–720 | 20–24s | Success screen |
| 7 — Metrics | 720–810 | 24–27s | 3 count-up cards |
| 8 — CTA Outro | 810–900 | 27–30s | Logo + CTA + URL |

---

## 🛠 Remotion Implementation Notes

- Use `<Sequence from={x} durationInFrames={y}>` for each scene
- Use `spring()` for all bouncy/elastic entries (cards, logo, icons, file cards)
- Use `interpolate()` with `Easing.bezier(0.22, 1, 0.36, 1)` for smooth slides
- Use `useCurrentFrame()` and `useVideoConfig()` throughout
- **Font:** Inter — `<style>{@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap')}</style>` injected via `<AbsoluteFill>`
- All inline styles only — Remotion best practice
- `extrapolateLeft: 'clamp', extrapolateRight: 'clamp'` everywhere
- Progress bar fill: controlled via `width: interpolated_value * 100 + '%'`
- Spinner rotation: `rotate(${interpolate(frame % 30, [0,30], [0,360])}deg)`

---

## ✅ Approval Checklist

- [ ] 8-scene structure approved
- [ ] Upload flow scenes (3,4,5) match the real screenshots
- [ ] Brand: light theme, triangular gradient logo, blue progress bar
- [ ] Metrics values confirmed
- [ ] Ready to start coding `SparenginePromoComposition.tsx`
