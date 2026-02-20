---
name: mobile-developer
type: skill
domain: mobile
status: stable
version: "2.0.0"
estimated_tokens: 8000
description: React Native & Expo development. Use for iOS/Android apps, native features, mobile navigation, and app store deployment.
---

# Mobile Developer

Expert guidelines for React Native and Expo development.

## Knowledge Graph

- **extends**: [[frontend-developer]]
- **requires**: []
- **suggests**: [[backend-developer]], [[devops-engineer]]
- **conflicts**: []
- **enhances**: [[frontend-developer]] (shared patterns via Expo Router)
- **moc**: [[mobile-development-moc]]

## Sub-Skills

| Sub-Skill | Path | Use For |
|-----------|------|---------|
| **api-routes** | [[mobile-developer/api-routes]] | Expo Router API routes |
| **building-ui** | [[mobile-developer/building-ui]] | UI, navigation, animations |
| **data-fetching** | [[mobile-developer/data-fetching]] | Networking, caching |
| **deployment** | [[mobile-developer/deployment]] | App Store/Play Store |
| **dev-client** | [[mobile-developer/dev-client]] | Development builds |
| **tailwind-setup** | [[mobile-developer/tailwind-setup]] | NativeWind config |
| **upgrading-expo** | [[mobile-developer/upgrading-expo]] | SDK upgrades |
| **use-dom** | [[mobile-developer/use-dom]] | WebView, DOM components |
| **cicd-workflows** | [[mobile-developer/cicd-workflows]] | EAS CI/CD |

## Core Philosophy

1. **Expo Go First** — Test in Expo Go before custom builds
2. **Native Performance** — Use native modules when critical
3. **Cross-Platform** — Write once, test on iOS and Android
4. **User Experience** — 60fps, instant feedback, offline-ready

## Quick Rules

- **File naming**: kebab-case (`comment-card.tsx`)
- **Routes**: Never co-locate components in `app/`
- **Imports**: Use path aliases, avoid relative imports
- **State**: TanStack Query (server), Zustand (client)
- **Images**: Use `expo-image`, not RN Image

## Library Preferences

| Use This | Not This |
|----------|----------|
| `expo-audio` | `expo-av` (deprecated) |
| `expo-video` | `expo-av` (deprecated) |
| `expo-symbols` | `@expo/vector-icons` (prefer SF Symbols) |
| `react-native-safe-area-context` | RN SafeAreaView |
| `expo-sqlite` / `AsyncStorage` | Deprecated storage |

## Triggers

- pattern: "expo"
- pattern: "react-native"
- pattern: "ios|android"
- file: "app/_layout.tsx" (Expo Router)

## Related Skills

- [[frontend-developer]] — Shared React patterns
- [[react-nextjs]] — Expo Router shares Next.js concepts
- [[backend-developer]] — API integration
- [[designer]] — UI/UX implementation
- [[devops-engineer]] — CI/CD with EAS

---

*Extends [[frontend-developer]] | Part of [[mobile-development-moc]]*
