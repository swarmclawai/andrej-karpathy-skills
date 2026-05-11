# Karpathy-Inspired Agent Skills

Karpathy-inspired coding-agent guidelines packaged for Claude Code, Codex, Cursor, Gemini CLI, OpenCode, Aider, GitHub Copilot, OpenClaw, Warp, Windsurf, Cline, and the wider SwarmVault/SwarmClaw agent matrix.

The canonical source is [`skills/karpathy-guidelines/SKILL.md`](skills/karpathy-guidelines/SKILL.md). Agent-specific files are generated under [`adapters/`](adapters/) so the repository root stays readable while every supported tool receives the same behavioral guidance.

English | [Simplified Chinese](./README.zh.md)

## What This Adds

These guidelines address four common LLM coding failure modes described by Andrej Karpathy:

| Principle | Prevents |
| --- | --- |
| Think Before Coding | Silent assumptions, hidden confusion, missing tradeoffs |
| Simplicity First | Over-engineering, bloated abstractions, speculative features |
| Surgical Changes | Drive-by rewrites, unrelated cleanup, accidental behavior changes |
| Goal-Driven Execution | Vague completion criteria and unverified changes |

The content is intentionally short. It is meant to merge with project-specific instructions, not replace them.

## Quick Install

Clone once, then copy the right adapter into any project. The installer reads [`install/targets.json`](install/targets.json), copies from `adapters/<agent-id>/...`, and writes to the real path your agent expects.

```bash
git clone https://github.com/swarmclawai/andrej-karpathy-skills.git
cd andrej-karpathy-skills
node scripts/install.mjs --list
node scripts/install.mjs --agent codex --dest /path/to/project
```

Use `--force` if you intentionally want to overwrite an existing instruction file:

```bash
node scripts/install.mjs --agent claude --dest /path/to/project --force
node scripts/install.mjs --agent openclaw --dest /path/to/project --force
```

Use `--global` for agents with supported user-level skill locations:

```bash
node scripts/install.mjs --agent claude --global --force
node scripts/install.mjs --agent hermes --global --force
```

## Adapter Layout

If you only need one file, copy the adapter source to the install target shown below:

| Agent | Adapter source | Installs to |
| --- | --- |
| Codex | `adapters/codex/AGENTS.md` | `AGENTS.md` |
| Claude Code | `adapters/claude/CLAUDE.md` | `CLAUDE.md` |
| Cursor | `adapters/cursor/.cursor/rules/karpathy-guidelines.mdc` | `.cursor/rules/karpathy-guidelines.mdc` |
| Gemini CLI | `adapters/gemini/GEMINI.md` | `GEMINI.md` |
| Aider | `adapters/aider/CONVENTIONS.md` | `CONVENTIONS.md` |
| GitHub Copilot | `adapters/copilot/.github/copilot-instructions.md` | `.github/copilot-instructions.md` |
| VS Code Copilot Chat | `adapters/vscode/.github/chatmodes/karpathy-guidelines.chatmode.md` | `.github/chatmodes/karpathy-guidelines.chatmode.md` |
| OpenClaw | `adapters/openclaw/.openclaw/skills/karpathy-guidelines/SKILL.md` | `.openclaw/skills/karpathy-guidelines/SKILL.md` |
| Warp or shared Agent Skills | `adapters/warp/.agents/skills/karpathy-guidelines/SKILL.md` | `.agents/skills/karpathy-guidelines/SKILL.md` |
| Windsurf | `adapters/windsurf/.windsurfrules` | `.windsurfrules` |

The full target matrix lives in [`install/targets.json`](install/targets.json).

## Supported Agent Matrix

The matrix is based on SwarmVault's installer targets and SwarmClaw's agent provider registry, then cross-checked with public agent documentation where available.

Core targets:

`codex`, `claude`, `cursor`, `goose`, `pi`, `gemini`, `opencode`, `aider`, `copilot`, `trae`, `claw`, `droid`, `kiro`, `hermes`, `antigravity`, `vscode`.

Extended Agent Skills targets:

`amp`, `augment`, `adal`, `bob`, `cline`, `codebuddy`, `command-code`, `continue`, `cortex`, `crush`, `deepagents`, `firebender`, `iflow`, `junie`, `kilo-code`, `kimi`, `kode`, `mcpjam`, `mistral-vibe`, `mux`, `neovate`, `openclaw`, `openhands`, `pochi`, `qoder`, `qwen-code`, `replit`, `roo-code`, `trae-cn`, `warp`, `windsurf`, `zencoder`.

See [`docs/agent-compatibility.md`](docs/agent-compatibility.md) for the research notes and source links.

## Claude Code Plugin

This repo still includes Claude plugin metadata at the root because plugin tooling expects it there:

```text
.claude-plugin/plugin.json
.claude-plugin/marketplace.json
skills/karpathy-guidelines/SKILL.md
```

When published as a Claude plugin marketplace entry, the plugin exposes the same canonical skill used by every other adapter.

## Maintain The Package

Edit the canonical skill, then regenerate and verify:

```bash
npm run generate
npm run verify
```

Generated adapters live under `adapters/<agent-id>/` and start with a comment that names their source. Do not edit generated adapters by hand; update `skills/karpathy-guidelines/SKILL.md` or `scripts/generate.mjs`.

## Attribution

This package is based on the original [`forrestchang/andrej-karpathy-skills`](https://github.com/forrestchang/andrej-karpathy-skills) repository and preserves the MIT license attribution.

## License

MIT
