# Using These Guidelines With Cursor

Cursor reads project rules from `.cursor/rules/`. This repository keeps the generated Cursor adapter under [`adapters/cursor/.cursor/rules/karpathy-guidelines.mdc`](adapters/cursor/.cursor/rules/karpathy-guidelines.mdc) so the repo root stays clean.

Install it into another project with:

```bash
node scripts/install.mjs --agent cursor --dest /path/to/project
```

That command copies the adapter to `.cursor/rules/karpathy-guidelines.mdc` in the destination project. The Cursor rule is generated from [`skills/karpathy-guidelines/SKILL.md`](skills/karpathy-guidelines/SKILL.md); edit the canonical skill and run `npm run generate` instead of editing the adapter directly.
