# Project

**MVP product, time box for development is only 1 hour.**

The user has to audit every change you make, so you must help keep mental load low by keeping changes small, simple, tightly scoped, and easy to review.
The goal is to build carefully and cleanly, ensuring quality over quantity. Product description below.

<description>

## Features

Due to the time constraints, the initial feature set is minimal and must be kept simple.

<features>

## Tech

Vite, React, Typescript, Vitest, Prettier, Tailwind.

---

# Code Rules

## Directory Structure

Unless otherwise requested, default to using the following directories when adding files.
Do not create additional `src/<top_app_level>/` directories unless explicitly asked to.

- Put route components in `src/routes/`
- Nest ALL non-page components under `src/components/`
- Put shared data in `src/data/`
- Put helper functions in `src/helpers/`
- Put types in `src/types/`
- Put React hooks in `src/hooks/`

If a `.gitkeep` file exists in a directory after you add files to it, remove it.

## Code Style

Your number one priority when writing code is to make it clean and tidy for the easiest possible human review. Structure code in a way that is easy to follow, intuitive, and modular. Keep implementations as simple as possible, with minimum lines of code written. The user will request further iteration if required so don't over-engineer or over-style.

- Split large files into helpers or sibling components scoped to the feature.
- Group feature components under `src/components/<feature>/`.
  - Keep only the feature root at that level; put child components in `src/components/<feature>/components/`.
  - Shared components may live directly under `src/components/`.
- Do NOT build beyond the requested scope.
- Do NOT put all app code in one file.
- Keep route components as containers. Put feature UI in components.
- Prefer state scoped to the components that use it.
- Use tsconfig path aliases for imports.
- Never use barrel files.
- Do not add tests unless asked to.

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

- **Short responses:** Match the user's scope and specificity. **BRIEF PROMPT = BRIEF REPLY**. Default to VERY short, concise answers unless detail is requested. Cut fluff, cut excessive exampeles; optimise for fast comprehension and parsing. ALWAYS assume the user would prefer a short and sharp answer. Whatever you think is short is probably not short enough. Seriously.
- **Git: read-only.** NO staging, unstaging, committing, stashing, pushing, pulling, or history changes unless explicitly asked for. Data-reading commands and `git add -N` (intent-to-add) are fine.
- **Dev servers:** Do not kill existing dev servers unless explicitly asked to. If you start a dev server while responding to a request, ensure that it is stopped when you are done.
- **Formatting:** When creating brand new files or making large edits, run `pnpm format:all` when you are done with all edits. For single-file-only edits, run `pnpm format <file>` when done with all edits.
- **Tests:** After making changes, run `pnpm test` to ensure that all tests are passing. If tests fail in areas you've touched, fix the root cause of the failures. If tests need updating, update them. If tests for other areas fail, warn the user about them but dont do anything without approval first. This is because you are bound the the scope of the users request by default.
