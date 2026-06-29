# Project

**MVP product, time box for development is only 1 hour.**

The user must audit every change, so keep their mental load low: make changes small, scoped, simple, and easy to review.

Prioritise clean implementation over feature volume. Build only what is requested, avoid speculative features and unrelated refactors, and prefer obvious code over clever abstractions.

Use minimal code comments only when they make non-obvious logic faster to review.

If you must make an assumption or fill a gap, choose the smallest reasonable option and call it out separately under `Assumptions / Gap Filling`.

Product description:

```
Simple DOM-based canvas editor.
```

## Features

Due to the time constraints, the initial feature set is minimal and must be kept simple. The following defines the current feature scope unless the user explicitly expands it:

```
- add element to canvas (box/text)
- drag / resize
- change color (background or text)
- change z-index
- edit text
- focus indication/state
```

## Tech

pnpm, Vite (with React Compiler), React, Typescript, Vitest, Prettier, Tailwind

## Commands

- Install: `pnpm install`
- Dev server: `pnpm dev`
- Build: `pnpm build`
- Typecheck: `pnpm typecheck`
- Test: `pnpm test`
- Lint: `pnpm lint`
- Format all: `pnpm format:all`
- Format file: `pnpm format <file>`

---

# Code Rules

## Directory Structure

- Put route components in `src/routes/`
- Nest ALL non-page components under `src/components/`
  - Shared components live directly under `src/components/`
  - Feature components live under `src/components/<feature>/`
    - Keep the feature root at `src/components/<feature>/<Feature>.tsx`
    - Put feature-specific child components under `src/components/<feature>/components/`
- Put helper functions in `src/helpers/`
- Put React hooks in `src/hooks/`

If a `.gitkeep` file exists in a directory after you add files to it, remove it.

## Code Style

Your number one priority when writing code is to make it clean and tidy for the easiest possible human review. Structure code in a way that is easy to follow, intuitive, and modular. Keep implementations as simple as possible, with minimum lines of code written. The user will request further iteration if required so AVOID over-engineering/over-styling at all costs.

- Do NOT build beyond the requested scope.
- Do NOT put all app code in one file.
- Keep route components as containers. Put feature UI in components.
- Prefer state scoped to the components that use it.
- Use tsconfig path aliases for imports.
- Never use barrel files.
- Do not add tests unless asked to.
- Tests, when the user asks for them, should be created alongside the components they are testing. eg `<Component>.test.tsx`
- React Compiler is being used, so in most cases you can **skip memoization**.
- **Types:**
  - Prefer `type` over `interface`.
  - Prefer to keep types in the file where they are used.
  - If a type is shared within a feature, place it at `src/components/<feature>/types.ts`.
  - If a type is shared across features or shared components, place it at `src/components/types.ts`.
  - If a type is used outside `src/components/`, place it in the narrowest sensible shared location.

# Design Rules

**Keep the UI simple, light, and utilitarian.**

- **Design tokens:** Shared design tokens live in `src/index.css` under `@theme {}`.
  - Reference existing tokens when making design choices and keep them up to date.
  - Add or update tokens before introducing new reusable colors, spacing, radii, typography, or interaction values.
- **Default styling:**
  - Prefer semantic tokens for page backgrounds, surfaces, borders, text, actions, controls, spacing, radius, and typography.
  - Keep hover, focus, disabled, and selected states consistent and token-backed.
  - Avoid one-off visual values unless the design need is genuinely local.
- **Aesthetic considerations:**
  - Avoid overuse of cards and boxes, especially nested cards. Prefer dividing lines over nested boxes/frames.
  - Prefer layouts where work areas and controls feel directly connected, with no unnecessary chrome or padding between them.
- Keep UI copy product-facing. Do not include prompt-derived language, implementation commentary, or meta descriptions like “simple”, “minimal”, “basic”, “MVP”, “clone”, or “built with X”. Use only labels and text that help the user operate the app.

# General Rules

- **Short responses:** Match the user's scope and specificity. **BRIEF PROMPT = BRIEF REPLY**. Default to VERY short, concise answers unless detail is requested. Cut fluff, cut excessive examples; optimise for fast comprehension and parsing. ALWAYS assume the user would prefer a short and sharp answer. Whatever you think is short is probably not short enough. Seriously.
- **Git: read-only.** NO staging, unstaging, committing, stashing, pushing, pulling, or history changes unless explicitly asked for. Data-reading commands and `git add -N` (intent-to-add) are fine.
- **Dev servers:** Do not kill existing dev servers unless explicitly asked to. If you start a dev server while responding to a request, ensure that it is stopped when you are done.
- **Formatting:** When creating brand new files or making large edits, run `pnpm format:all` when you are done with all edits. For single-file-only edits, run `pnpm format <file>` when done with all edits.
- **Validation:** After making changes, run `pnpm test`, `pnpm lint`, and `pnpm typecheck`.
  - If tests fail in areas you touched, fix the root cause or update affected tests when behavior intentionally changed. If unrelated tests fail, do not modify them without approval; report the failure and keep the response scoped to the request.
  - If lint or typecheck fails, make light-touch fixes (no hacks/workarounds) as needed.

## Before Editing

- Before non-trivial edits, briefly state the intended files and approach. Keep it short.

## Final Response

**BEFORE final response:** Quickly self-review the diff for scope creep, unnecessary abstraction, inconsistent styling, missing verification, and assumptions that should be called out.

Keep final responses brief and audit-friendly:

- `Changed:` files and behavior changed
- `Assumptions / Gap Filling:` any conservative choices not explicitly requested
- `Verified:` commands run, or why not run

---

When in doubt: keep scope small, keep code obvious, preserve reviewability, and do not build beyond the request.
