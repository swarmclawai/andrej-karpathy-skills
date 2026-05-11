# Karpathy 启发的 Agent Skills

面向 Claude Code、Codex、Cursor、Gemini CLI、OpenCode、Aider、GitHub Copilot、OpenClaw、Warp、Windsurf、Cline 以及 SwarmVault/SwarmClaw agent 矩阵的 Karpathy 风格编码智能体指南。

规范来源是 [`skills/karpathy-guidelines/SKILL.md`](skills/karpathy-guidelines/SKILL.md)。其他 agent 专用文件都生成在 [`adapters/`](adapters/) 下，避免根目录被大量隐藏目录占满。

[English](./README.md) | 简体中文

## 解决什么问题

这些规则针对 Andrej Karpathy 提到的常见 LLM 编码问题：

| 原则 | 避免的问题 |
| --- | --- |
| 编码前思考 | 静默假设、隐藏困惑、缺少权衡 |
| 简洁优先 | 过度工程、臃肿抽象、未要求的功能 |
| 精准修改 | 顺手重构、无关清理、意外行为变化 |
| 目标驱动执行 | 成功标准模糊、修改后未验证 |

## 快速安装

```bash
git clone https://github.com/swarmclawai/andrej-karpathy-skills.git
cd andrej-karpathy-skills
node scripts/install.mjs --list
node scripts/install.mjs --agent codex --dest /path/to/project
```

如需覆盖已有规则文件，加入 `--force`：

```bash
node scripts/install.mjs --agent claude --dest /path/to/project --force
node scripts/install.mjs --agent openclaw --dest /path/to/project --force
```

部分 agent 支持用户级 skill 目录，可加入 `--global`：

```bash
node scripts/install.mjs --agent claude --global --force
node scripts/install.mjs --agent hermes --global --force
```

## Adapter 布局

如果只想手动复制一个文件，请从 adapter source 复制到目标项目里的 install target：

| Agent | Adapter source | Install target |
| --- | --- |
| Codex | `adapters/codex/AGENTS.md` | `AGENTS.md` |
| Claude Code | `adapters/claude/CLAUDE.md` | `CLAUDE.md` |
| Cursor | `adapters/cursor/.cursor/rules/karpathy-guidelines.mdc` | `.cursor/rules/karpathy-guidelines.mdc` |
| Gemini CLI | `adapters/gemini/GEMINI.md` | `GEMINI.md` |
| Aider | `adapters/aider/CONVENTIONS.md` | `CONVENTIONS.md` |
| GitHub Copilot | `adapters/copilot/.github/copilot-instructions.md` | `.github/copilot-instructions.md` |
| OpenClaw | `adapters/openclaw/.openclaw/skills/karpathy-guidelines/SKILL.md` | `.openclaw/skills/karpathy-guidelines/SKILL.md` |
| Warp / 通用 Agent Skills | `adapters/warp/.agents/skills/karpathy-guidelines/SKILL.md` | `.agents/skills/karpathy-guidelines/SKILL.md` |
| Windsurf | `adapters/windsurf/.windsurfrules` | `.windsurfrules` |

完整矩阵见 [`install/targets.json`](install/targets.json)，调研说明见 [`docs/agent-compatibility.md`](docs/agent-compatibility.md)。

## 维护方式

只编辑规范来源，然后重新生成：

```bash
npm run generate
npm run verify
```

生成的 adapter 文件都位于 `adapters/<agent-id>/` 下，顶部会标明来源。不要直接修改生成文件。

## 署名

本仓库基于原始项目 [`forrestchang/andrej-karpathy-skills`](https://github.com/forrestchang/andrej-karpathy-skills)，并保留 MIT 许可署名。

## 许可

MIT
