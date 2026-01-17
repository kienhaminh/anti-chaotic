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
