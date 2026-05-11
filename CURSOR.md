# Using This Repo With Cursor

Cursor reads the generated project rule at [`.cursor/rules/karpathy-guidelines.mdc`](.cursor/rules/karpathy-guidelines.mdc). The rule is committed with `alwaysApply: true`, so opening this folder in Cursor makes the guidelines available without extra setup.

To use the same guidance in another project:

```bash
node scripts/install.mjs --agent cursor --dest /path/to/project
```

The Cursor rule is generated from [`skills/karpathy-guidelines/SKILL.md`](skills/karpathy-guidelines/SKILL.md). Edit the canonical skill and run `npm run generate` instead of editing the `.mdc` file directly.
