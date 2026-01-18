---
trigger: model_decision
description: Apply this rule when generating images, icons, or visual assets using generate_image tool.
---

# Generate Image Usage Guide

## 1. The Prompting Formula

To maximize image quality, ALWAYS structure your prompt using this progression. Do not just send a raw description.

**`[Core Subject]` + `[Visual Style]` + `[Lighting/Color]` + `[Technical/Quality specs]`**

### Examples:

- **Bad**: "A robot"
- **Good**: "Cute round robot avatar, flat vector art style, soft indigo and white lighting, minimal UI icon, high resolution"

- **Bad**: "Dashboard background"
- **Good**: "Abstract geometric patterns, soft cyberpunk aesthetic, dark slate and neon blue dark mode, subtle texture, 4k wallpaper"

## 2. Capability & Constraints

- **Naming**: You **MUST** use `snake_case` with a maximum of **3 words**.
  - ✅ `hero_robot_icon`
  - ❌ `HeroRobotIcon` (CamelCase not allowed)
  - ❌ `blue_hero_robot_floating_in_space` (Too long)
- **Text Handling**: The tool cannot render legible text. **NEVER** ask for text inside the image (e.g., "A button that says Start"). Request the _button shape_ only.
- **Composition**: It excels at single objects (Icons, Avatars) and abstract backgrounds. It struggles with complex multi-character scenes or precise UI layouts.

## 3. High-Leverage Keywords

Use these specific keywords to steer the model towards specific outcomes:

| Goal            | Keywords to Inject                                                                                 |
| :-------------- | :------------------------------------------------------------------------------------------------- |
| **UI Icons**    | `vector icon`, `flat design`, `minimalist`, `app icon`, `white background`, `svg style`            |
| **Game Assets** | `game sprite`, `isometric view`, `digital painting`, `character concept`, `unreal engine 5 render` |
| **Backgrounds** | `abstract`, `bokeh`, `gradient`, `blur`, `texture`, `wallpaper`, `geometric`                       |
| **Styling**     | `soft lighting`, `cinematic`, `volumetric light`, `rule of thirds`, `ultra detailed`               |

## 4. Operational Best Practices

1.  **One Concept per Request**: Don't try to generate a "Dashboard with a sidebar and a chart". Generate the "Sidebar background" and the "Chart graphic" separately.
2.  **Color Accuracy**: Use descriptive color names ("Emerald Green", "Midnight Blue") rather than just Hex codes, as models understand names better visually.
3.  **Iteration**: If the first specific result isn't perfect, generalize the prompt slightly (remove strict constraints) and try again.
