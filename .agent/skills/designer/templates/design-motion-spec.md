---
id: MOTION-SPEC-{ID}
type: specification
status: draft
owner: @designer
linked-to: [[User-Story-ID]]
---

# Motion Specification: {Title}

**Purpose**: {Why are we animating this? Orientation / Feedback / Focus / Delight}
**Trigger**: {Load / Hover / Click / Scroll / State Change}
**Element**: {Component or Element Name, e.g., Primary Button, Hero Image}

## Animation Timeline

| Time | Element   | Property | Start Value | End Value | Duration | Easing   | Delay |
| :--- | :-------- | :------- | :---------- | :-------- | :------- | :------- | :---- |
| 0ms  | Container | Scale    | 0.9         | 1.0       | 300ms    | ease-out | 0ms   |
| 50ms | Icon      | Opacity  | 0           | 1         | 200ms    | linear   | 50ms  |
| ...  | ...       | ...      | ...         | ...       | ...      | ...      | ...   |

## Behavior Description

{Describe the behavior in plain English. Example: "The container should spring open, and then the icon fades in slightly later to lead the eye."}

## Development Reference

- **Standard Curve**: `cubic-bezier(0, 0, 0.2, 1)` (Decelerate)
- **Reduced Motion**: {Fade in only / None}
