---
name: remotion-best-practices
type: capability
domain: video
status: stable
version: "2.0.0"
estimated_tokens: 25000
description: Video creation with Remotion. Use for programmatic video, animations, and rendering in React.
---

# Remotion Best Practices

Programmatic video creation using React and TypeScript.

## Knowledge Graph

- **extends**: []
- **requires**: [[frontend-developer]]
- **suggests**: []
- **conflicts**: []
- **enhances**: [[marketer]] (video content)
- **moc**: [[video-production-moc]]

## Rule Topics

| Topic | File |
|:------|:-----|
| **3D** | `rules/3d.md` — Three.js, React Three Fiber |
| **Animations** | `rules/animations.md` — Core animation patterns |
| **Audio** | `rules/audio.md` — Sound, volume, pitch |
| **Assets** | `rules/assets.md` — Images, fonts, videos |
| **Captions** | `rules/display-captions.md`, `rules/import-srt-captions.md`, `rules/transcribe-captions.md` |
| **Charts** | `rules/charts.md` — Data visualization |
| **Compositions** | `rules/compositions.md` — Defining scenes |
| **Media Utils** | `rules/can-decode.md`, `rules/extract-frames.md`, `rules/get-audio-duration.md`, `rules/get-video-dimensions.md`, `rules/get-video-duration.md` |
| **Text** | `rules/fonts.md`, `rules/measuring-text.md`, `rules/text-animations.md` |
| **Timing** | `rules/sequencing.md`, `rules/timing.md`, `rules/transitions.md`, `rules/trimming.md` |
| **Styling** | `rules/tailwind.md` — Tailwind in Remotion |

## Core Concepts

- **Compositions** — Video scenes with props and duration
- **Timing** — Frames, spring animations, interpolation
- **Media** — Images, video, audio synchronized to timeline
- **Rendering** — SSR, Lambda, local rendering

## Related Skills

- [[frontend-developer]] — Required foundation (load `react-nextjs/` sub-capability)
- [[ai-engineer]] — For AI-generated video content
- [[marketer]] — Content strategy

---

*Requires [[frontend-developer]] | Part of [[video-production-moc]]*
