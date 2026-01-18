---
trigger: glob
globs: **/*.{ts,tsx,js,jsx,py,go,java,rb,c,cpp,h,hpp,rs,css,html}
---

# Clean Code Standards

You must adhere to these clean code principles when generating or modifying code.

## Core Principles

- **SOLID**: Follow Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion principles.
- **DRY (Don't Repeat Yourself)**: Extract common logic into functions or constants.
- **KISS (Keep It Simple, Stupid)**: Avoid over-engineering. Code should be easy to understand.
- **YAGNI (You Aren't Gonna Need It)**: Do not implement features or abstraction "just in case".

## Naming Conventions

- Variables and functions should be descriptive (e.g., `isUserLoggedIn` instead of `flag`).
- Use consistent casing appropriate for the language (e.g., camelCase for JS/TS functions, snake_case for Python).
- Boolean variables should start with `is`, `has`, `should`, or `can`.

## Functions

- Functions should ideally do one thing and do it well.
- Keep functions short. If a function is too long, break it down.
- Limit the number of arguments (3 or fewer is ideal).

## Comments

- Comments should explain "why" something is done, not "what" the code does (unless it's complex/unintuitive).
- Remove commented-out code.

## Error Handling

- Context-aware error handling. Do not silently swallow errors.
- Use explicit error types where possible.

## Testing

- Write testable code. Avoid global state and side effects where possible.

## File Length Limits

Files should be kept concise and focused. If a file exceeds these limits, consider splitting it:

| File Type                   | Max Lines | Notes                                          |
| --------------------------- | --------- | ---------------------------------------------- |
| Components (`.tsx`, `.jsx`) | 200-300   | Split into smaller components or extract hooks |
| Utility/Helper files        | 150-200   | Group related utilities, split by domain       |
| API Routes/Handlers         | 100-150   | Extract business logic to services             |
| Test files                  | 300-400   | Group by feature, use describe blocks          |
| Styles (`.css`)             | 200-300   | Use CSS modules or split by component          |
| Config files                | 100       | Keep minimal, use separate config files        |

**When to split:**

- When a file has multiple responsibilities (violates SRP)
- When scrolling becomes difficult to follow logic
- When imports section becomes excessively long (>15 imports)
- When the file has multiple large functions that could be independent

## File Header Comments

Every new file MUST include a header comment at the top describing its purpose:

**Format for TypeScript/JavaScript:**

```typescript
/**
 * @file [filename]
 * @description [Brief description of what this file contains and its purpose]
 *
 * @example (optional - for utilities/hooks)
 * // Usage example here
 */
```

**Format for CSS:**

```css
/**
 * @file [filename]
 * @description [Brief description of styles contained]
 * 
 * Sections:
 * - [List main sections if applicable]
 */
```

**Format for Python:**

```python
"""
[filename]

[Brief description of what this module contains and its purpose]

Example (optional):
    >>> usage_example()
"""
```

**Requirements:**

- `@file`: The filename (e.g., `user.service.ts`)
- `@description`: 1-3 sentences explaining the file's purpose
- Keep headers concise but informative
- Update headers when file purpose changes significantly
