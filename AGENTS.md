## Tech

- Nix flake dev shell
- direnv loads the flake shell
- Node 24 with pnpm
- React + Vite foundation
- Vite + React
- TypeScript
- Vitest
- Prettier
- Tailwind

## Rules

- **Formatting:** When creating brand new files or making large edits, run `pnpm format:all` when you are done with all edits. For single-file-only edits, run `pnpm format <file>` when done with all edits.
- **Dev servers:** Do not kill existing dev servers unless explicitly asked to. If you start a dev server while responding to a request, ensure that it is stopped when you are done.
