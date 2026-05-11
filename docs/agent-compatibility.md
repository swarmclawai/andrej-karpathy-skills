# Agent Compatibility

This package makes one canonical skill usable by the common instruction and skill-discovery conventions used by current coding agents.

Generated adapter files live under `adapters/<agent-id>/...`. The installer copies those adapter sources into the real project paths each agent expects. The target matrix in [`../install/targets.json`](../install/targets.json) is the source of truth for both `source` and `target`.

- SwarmVault's installer target model: agent ids, file targets, and Agent Skills bundle directories.
- SwarmClaw's provider registry: the CLI agents it can launch and the generic CLI provider set.
- Public docs for the major instruction formats listed below.

Research date: May 11, 2026.

## Public Format References

| Format or agent | Install target | Reference |
| --- | --- | --- |
| AGENTS.md | `AGENTS.md` | https://agents.md/ |
| OpenAI Codex | `AGENTS.md` | https://openai.com/index/introducing-codex/ |
| Claude Code memory | `CLAUDE.md` | https://docs.claude.com/en/docs/claude-code/memory |
| Claude Code skills | `.claude/skills/karpathy-guidelines/SKILL.md` | https://docs.claude.com/en/docs/claude-code/skills |
| Cursor rules | `.cursor/rules/karpathy-guidelines.mdc` | https://docs.cursor.com/context/rules |
| Gemini CLI | `GEMINI.md` | https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/gemini-md.md |
| GitHub Copilot | `.github/copilot-instructions.md`, `AGENTS.md` | https://docs.github.com/en/copilot/how-tos/custom-instructions/adding-repository-custom-instructions-for-github-copilot |
| OpenCode rules | `AGENTS.md` | https://opencode.ai/docs/rules/ |
| OpenCode skills | `.opencode/skills/karpathy-guidelines/SKILL.md` | https://opencode.ai/docs/skills |
| Aider conventions | `CONVENTIONS.md` | https://aider.chat/docs/usage/conventions.html |
| OpenClaw skills | `.openclaw/skills/karpathy-guidelines/SKILL.md` | https://docs.openclaw.ai/tools/skills |
| Kiro steering | `.kiro/steering/karpathy-guidelines.md` | https://kiro.dev/docs/steering/ |
| Warp skills | `.agents/skills/karpathy-guidelines/SKILL.md` | https://docs.warp.dev/agent-platform/capabilities/skills |
| Cline rules | `.clinerules/karpathy-guidelines.md`, `AGENTS.md` | https://docs.cline.bot/features/cline-rules/overview |

## Core Targets

| Agent id | Adapter source example | Installs to |
| --- | --- | --- |
| `codex` | `adapters/codex/AGENTS.md` | `AGENTS.md` |
| `claude` | `adapters/claude/CLAUDE.md` | `CLAUDE.md` |
| `cursor` | `adapters/cursor/.cursor/rules/karpathy-guidelines.mdc` | `.cursor/rules/karpathy-guidelines.mdc` |
| `goose` | `adapters/goose/AGENTS.md` | `AGENTS.md` |
| `pi` | `adapters/pi/AGENTS.md` | `AGENTS.md` |
| `gemini` | `adapters/gemini/GEMINI.md` | `GEMINI.md` |
| `opencode` | `adapters/opencode/.opencode/skills/karpathy-guidelines/SKILL.md` | `.opencode/skills/karpathy-guidelines/SKILL.md` |
| `aider` | `adapters/aider/CONVENTIONS.md` | `CONVENTIONS.md` |
| `copilot` | `adapters/copilot/.github/copilot-instructions.md` | `.github/copilot-instructions.md` |
| `trae` | `adapters/trae/.trae/rules/karpathy-guidelines.md` | `.trae/rules/karpathy-guidelines.md` |
| `claw` | `adapters/claw/.claw/skills/karpathy-guidelines/SKILL.md` | `.claw/skills/karpathy-guidelines/SKILL.md` |
| `droid` | `adapters/droid/.factory/rules/karpathy-guidelines.md` | `.factory/rules/karpathy-guidelines.md` |
| `kiro` | `adapters/kiro/.kiro/skills/karpathy-guidelines/SKILL.md` | `.kiro/skills/karpathy-guidelines/SKILL.md` |
| `hermes` | `adapters/hermes/AGENTS.md` | `AGENTS.md` |
| `antigravity` | `adapters/antigravity/.agents/rules/karpathy-guidelines.md` | `.agents/rules/karpathy-guidelines.md` |
| `vscode` | `adapters/vscode/.github/chatmodes/karpathy-guidelines.chatmode.md` | `.github/chatmodes/karpathy-guidelines.chatmode.md` |

## Extended Agent Skills Targets

These follow the SwarmVault Agent Skills bundle convention. Each target receives a copy of `skills/karpathy-guidelines/SKILL.md` from an adapter source under `adapters/<agent-id>/`.

| Agent id | Skill target |
| --- | --- |
| `amp` | `.config/agents/skills/karpathy-guidelines/SKILL.md` |
| `augment` | `.augment/skills/karpathy-guidelines/SKILL.md` |
| `adal` | `.adal/skills/karpathy-guidelines/SKILL.md` |
| `bob` | `.bob/skills/karpathy-guidelines/SKILL.md` |
| `cline` | `.agents/skills/karpathy-guidelines/SKILL.md`, plus `.clinerules/karpathy-guidelines.md` |
| `codebuddy` | `.codebuddy/skills/karpathy-guidelines/SKILL.md` |
| `command-code` | `.commandcode/skills/karpathy-guidelines/SKILL.md` |
| `continue` | `.continue/skills/karpathy-guidelines/SKILL.md` |
| `cortex` | `.snowflake/cortex/skills/karpathy-guidelines/SKILL.md` |
| `crush` | `.config/crush/skills/karpathy-guidelines/SKILL.md` |
| `deepagents` | `.deepagents/agent/skills/karpathy-guidelines/SKILL.md` |
| `firebender` | `.firebender/skills/karpathy-guidelines/SKILL.md` |
| `iflow` | `.iflow/skills/karpathy-guidelines/SKILL.md` |
| `junie` | `.junie/skills/karpathy-guidelines/SKILL.md` |
| `kilo-code` | `.kilocode/skills/karpathy-guidelines/SKILL.md` |
| `kimi` | `.config/agents/skills/karpathy-guidelines/SKILL.md` |
| `kode` | `.kode/skills/karpathy-guidelines/SKILL.md` |
| `mcpjam` | `.mcpjam/skills/karpathy-guidelines/SKILL.md` |
| `mistral-vibe` | `.vibe/skills/karpathy-guidelines/SKILL.md` |
| `mux` | `.mux/skills/karpathy-guidelines/SKILL.md` |
| `neovate` | `.neovate/skills/karpathy-guidelines/SKILL.md` |
| `openclaw` | `.openclaw/skills/karpathy-guidelines/SKILL.md` |
| `openhands` | `.openhands/skills/karpathy-guidelines/SKILL.md` |
| `pochi` | `.pochi/skills/karpathy-guidelines/SKILL.md` |
| `qoder` | `.qoder/skills/karpathy-guidelines/SKILL.md` |
| `qwen-code` | `.qwen/skills/karpathy-guidelines/SKILL.md` |
| `replit` | `.config/agents/skills/karpathy-guidelines/SKILL.md` |
| `roo-code` | `.roo/skills/karpathy-guidelines/SKILL.md` |
| `trae-cn` | `.trae-cn/skills/karpathy-guidelines/SKILL.md` |
| `warp` | `.agents/skills/karpathy-guidelines/SKILL.md` |
| `windsurf` | `.codeium/windsurf/skills/karpathy-guidelines/SKILL.md`, plus `.windsurfrules` |
| `zencoder` | `.zencoder/skills/karpathy-guidelines/SKILL.md` |

## Maintenance Rules

- Update `skills/karpathy-guidelines/SKILL.md` first.
- Run `npm run generate` to refresh generated adapters and `install/targets.json`.
- Run `npm run verify` before committing.
- Add new agents to `scripts/generate.mjs`, not directly to generated files.
