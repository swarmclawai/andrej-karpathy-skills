#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = path.resolve(new URL("..", import.meta.url).pathname);
const skillName = "karpathy-guidelines";
const canonicalSkillPath = `skills/${skillName}/SKILL.md`;
const repo = "swarmclawai/andrej-karpathy-skills";
const description =
  "Behavioral guidelines to reduce common LLM coding mistakes. Use when writing, reviewing, or refactoring code to avoid overcomplication, make surgical changes, surface assumptions, and define verifiable success criteria.";

const skillBundleDirs = {
  amp: ".config/agents/skills",
  augment: ".augment/skills",
  adal: ".adal/skills",
  bob: ".bob/skills",
  cline: ".agents/skills",
  codebuddy: ".codebuddy/skills",
  "command-code": ".commandcode/skills",
  continue: ".continue/skills",
  cortex: ".snowflake/cortex/skills",
  crush: ".config/crush/skills",
  deepagents: ".deepagents/agent/skills",
  firebender: ".firebender/skills",
  iflow: ".iflow/skills",
  junie: ".junie/skills",
  "kilo-code": ".kilocode/skills",
  kimi: ".config/agents/skills",
  kode: ".kode/skills",
  mcpjam: ".mcpjam/skills",
  "mistral-vibe": ".vibe/skills",
  mux: ".mux/skills",
  neovate: ".neovate/skills",
  openclaw: ".openclaw/skills",
  openhands: ".openhands/skills",
  pochi: ".pochi/skills",
  qoder: ".qoder/skills",
  "qwen-code": ".qwen/skills",
  replit: ".config/agents/skills",
  "roo-code": ".roo/skills",
  "trae-cn": ".trae-cn/skills",
  warp: ".agents/skills",
  windsurf: ".codeium/windsurf/skills",
  zencoder: ".zencoder/skills"
};

const directAgents = [
  {
    id: "codex",
    name: "OpenAI Codex",
    aliases: ["codex-cli"],
    summary: "Uses root AGENTS.md project instructions.",
    paths: [copy("AGENTS.md")]
  },
  {
    id: "claude",
    name: "Claude Code",
    aliases: ["claude-code", "claude-cli"],
    summary: "Uses CLAUDE.md project memory and Agent Skills folders.",
    paths: [copy("CLAUDE.md"), skillCopy(".claude/skills")],
    globalPaths: [globalSkillCopy("~/.claude/skills")]
  },
  {
    id: "cursor",
    name: "Cursor",
    aliases: ["cursor-agent", "cursor-cli"],
    summary: "Uses project rules in .cursor/rules.",
    paths: [copy(".cursor/rules/karpathy-guidelines.mdc"), skillCopy(".cursor/skills")]
  },
  {
    id: "goose",
    name: "Goose",
    aliases: [],
    summary: "Uses the shared AGENTS.md convention in SwarmVault.",
    paths: [copy("AGENTS.md")]
  },
  {
    id: "pi",
    name: "Pi",
    aliases: [],
    summary: "Uses the shared AGENTS.md convention in SwarmVault.",
    paths: [copy("AGENTS.md")]
  },
  {
    id: "gemini",
    name: "Gemini CLI",
    aliases: ["gemini-cli"],
    summary: "Uses GEMINI.md context files.",
    paths: [copy("GEMINI.md"), skillCopy(".gemini/skills")]
  },
  {
    id: "opencode",
    name: "OpenCode",
    aliases: ["opencode-cli"],
    summary: "Uses AGENTS.md rules and native Agent Skills folders.",
    paths: [copy("AGENTS.md"), skillCopy(".opencode/skills"), skillCopy(".agents/skills")]
  },
  {
    id: "aider",
    name: "Aider",
    aliases: ["aider-cli"],
    summary: "Uses CONVENTIONS.md via --read or .aider.conf.yml.",
    paths: [copy("CONVENTIONS.md"), copy(".aider.conf.yml")]
  },
  {
    id: "copilot",
    name: "GitHub Copilot",
    aliases: ["copilot-cli"],
    summary: "Uses repository custom instructions and AGENTS.md agent instructions.",
    paths: [copy(".github/copilot-instructions.md"), copy("AGENTS.md"), skillCopy(".copilot/skills")]
  },
  {
    id: "trae",
    name: "Trae",
    aliases: ["trae-cli"],
    summary: "Uses project rules in .trae/rules.",
    paths: [copy(".trae/rules/karpathy-guidelines.md")]
  },
  {
    id: "claw",
    name: "Claw",
    aliases: ["openclaw-legacy"],
    summary: "Uses a Claw/OpenClaw compatible skill folder.",
    paths: [skillCopy(".claw/skills")]
  },
  {
    id: "droid",
    name: "Factory Droid",
    aliases: ["droid-cli"],
    summary: "Uses Factory project rules in .factory/rules.",
    paths: [copy(".factory/rules/karpathy-guidelines.md")]
  },
  {
    id: "kiro",
    name: "Kiro",
    aliases: ["kiro-cli"],
    summary: "Uses steering files and skill folders.",
    paths: [skillCopy(".kiro/skills"), copy(".kiro/steering/karpathy-guidelines.md")]
  },
  {
    id: "hermes",
    name: "Hermes",
    aliases: ["hermes-agent"],
    summary: "Uses AGENTS.md plus a user-level Hermes skill.",
    paths: [copy("AGENTS.md")],
    globalPaths: [globalSkillCopy("~/.hermes/skills")]
  },
  {
    id: "antigravity",
    name: "Antigravity",
    aliases: [],
    summary: "Uses .agents rules and workflows.",
    paths: [
      copy(".agents/rules/karpathy-guidelines.md"),
      copy(".agents/workflows/karpathy-guidelines.md")
    ]
  },
  {
    id: "vscode",
    name: "VS Code Copilot Chat",
    aliases: ["github-copilot-chat"],
    summary: "Uses Copilot instructions and chat modes.",
    paths: [
      copy(".github/copilot-instructions.md"),
      copy(".github/chatmodes/karpathy-guidelines.chatmode.md")
    ]
  },
  {
    id: "windsurf",
    name: "Windsurf Rules",
    aliases: ["windsurf-cli"],
    summary: "Uses a .windsurfrules file and the Windsurf skill path.",
    paths: [copy(".windsurfrules"), skillCopy(".codeium/windsurf/skills")]
  },
  {
    id: "cline",
    name: "Cline Rules",
    aliases: ["cline-cli"],
    summary: "Uses .clinerules and also supports AGENTS.md.",
    paths: [copy(".clinerules/karpathy-guidelines.md"), copy("AGENTS.md"), skillCopy(".agents/skills")]
  }
];

const skillBundleAgents = Object.entries(skillBundleDirs).map(([id, dir]) => ({
  id,
  name: displayName(id),
  aliases: [`${id}-cli`],
  summary: `Uses an Agent Skills bundle under ${dir}.`,
  paths: [skillCopy(dir)]
}));

const agents = mergeAgentEntries([...directAgents, ...skillBundleAgents]);

const sourceReferences = [
  {
    id: "agents-md",
    title: "AGENTS.md open format",
    url: "https://agents.md/",
    appliesTo: ["codex", "opencode", "copilot", "goose", "pi", "cline"]
  },
  {
    id: "openai-codex",
    title: "OpenAI Codex AGENTS.md guidance",
    url: "https://openai.com/index/introducing-codex/",
    appliesTo: ["codex"]
  },
  {
    id: "claude-memory",
    title: "Claude Code memory files",
    url: "https://docs.claude.com/en/docs/claude-code/memory",
    appliesTo: ["claude"]
  },
  {
    id: "claude-skills",
    title: "Claude Code Agent Skills",
    url: "https://docs.claude.com/en/docs/claude-code/skills",
    appliesTo: ["claude"]
  },
  {
    id: "cursor-rules",
    title: "Cursor project rules",
    url: "https://docs.cursor.com/context/rules",
    appliesTo: ["cursor"]
  },
  {
    id: "gemini-md",
    title: "Gemini CLI GEMINI.md files",
    url: "https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/gemini-md.md",
    appliesTo: ["gemini"]
  },
  {
    id: "copilot-instructions",
    title: "GitHub Copilot repository custom instructions",
    url: "https://docs.github.com/en/copilot/how-tos/custom-instructions/adding-repository-custom-instructions-for-github-copilot",
    appliesTo: ["copilot", "vscode"]
  },
  {
    id: "opencode-rules",
    title: "OpenCode rules and AGENTS.md",
    url: "https://opencode.ai/docs/rules/",
    appliesTo: ["opencode"]
  },
  {
    id: "opencode-skills",
    title: "OpenCode Agent Skills",
    url: "https://opencode.ai/docs/skills",
    appliesTo: ["opencode"]
  },
  {
    id: "aider-conventions",
    title: "Aider coding conventions",
    url: "https://aider.chat/docs/usage/conventions.html",
    appliesTo: ["aider"]
  },
  {
    id: "openclaw-skills",
    title: "OpenClaw Agent Skills",
    url: "https://docs.openclaw.ai/tools/skills",
    appliesTo: ["openclaw", "claw"]
  },
  {
    id: "kiro-steering",
    title: "Kiro steering",
    url: "https://kiro.dev/docs/steering/",
    appliesTo: ["kiro"]
  },
  {
    id: "warp-skills",
    title: "Warp Agent Skills",
    url: "https://docs.warp.dev/agent-platform/capabilities/skills",
    appliesTo: ["warp"]
  },
  {
    id: "cline-rules",
    title: "Cline rules",
    url: "https://docs.cline.bot/features/cline-rules/overview",
    appliesTo: ["cline"]
  }
];

const generated = buildGeneratedFiles();
const checkOnly = process.argv.includes("--check");

if (checkOnly) {
  const mismatches = [];
  for (const [relativePath, expected] of generated) {
    const absolutePath = path.join(rootDir, relativePath);
    const actual = fs.existsSync(absolutePath) ? fs.readFileSync(absolutePath, "utf8") : null;
    if (actual !== expected) {
      mismatches.push(relativePath);
    }
  }

  if (mismatches.length) {
    console.error("Generated files are out of date:");
    for (const file of mismatches) console.error(`- ${file}`);
    process.exit(1);
  }

  console.log(`All ${generated.size} generated files are up to date.`);
} else {
  for (const [relativePath, contents] of generated) {
    const absolutePath = path.join(rootDir, relativePath);
    fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
    fs.writeFileSync(absolutePath, contents);
  }
  console.log(`Wrote ${generated.size} generated files.`);
}

function buildGeneratedFiles() {
  const { body, frontmatter } = readCanonicalSkill();
  const files = new Map();

  set(files, "AGENTS.md", instructionFile(body, "AGENTS.md"));
  set(files, "CLAUDE.md", instructionFile(body, "CLAUDE.md"));
  set(files, "GEMINI.md", instructionFile(body, "GEMINI.md"));
  set(files, "CONVENTIONS.md", instructionFile(body, "CONVENTIONS.md"));
  set(files, ".windsurfrules", instructionFile(body, ".windsurfrules"));
  set(files, ".clinerules/karpathy-guidelines.md", instructionFile(body, ".clinerules/karpathy-guidelines.md"));
  set(files, ".trae/rules/karpathy-guidelines.md", instructionFile(body, ".trae/rules/karpathy-guidelines.md"));
  set(files, ".factory/rules/karpathy-guidelines.md", instructionFile(body, ".factory/rules/karpathy-guidelines.md"));
  set(files, ".kiro/steering/karpathy-guidelines.md", instructionFile(body, ".kiro/steering/karpathy-guidelines.md"));
  set(files, ".agents/rules/karpathy-guidelines.md", instructionFile(body, ".agents/rules/karpathy-guidelines.md"));
  set(files, ".agents/workflows/karpathy-guidelines.md", workflowFile(body));
  set(files, ".github/copilot-instructions.md", instructionFile(body, ".github/copilot-instructions.md"));
  set(files, ".github/chatmodes/karpathy-guidelines.chatmode.md", chatModeFile(body));
  set(files, ".cursor/rules/karpathy-guidelines.mdc", cursorRuleFile(body));
  set(files, ".aider.conf.yml", aiderConfigFile());

  for (const agent of agents) {
    for (const target of agent.paths ?? []) {
      if (target.kind === "skill") {
        set(files, target.target, renderSkill(frontmatter, body));
      }
    }
  }

  set(files, ".claude-plugin/plugin.json", json(pluginJson()));
  set(files, ".claude-plugin/marketplace.json", json(marketplaceJson()));
  set(files, "install/targets.json", json(targetMatrix()));

  return files;
}

function readCanonicalSkill() {
  const fullPath = path.join(rootDir, canonicalSkillPath);
  const text = fs.readFileSync(fullPath, "utf8");
  const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    throw new Error(`${canonicalSkillPath} must include YAML frontmatter`);
  }
  const frontmatter = {};
  for (const line of match[1].split("\n")) {
    const index = line.indexOf(":");
    if (index === -1) continue;
    frontmatter[line.slice(0, index).trim()] = line.slice(index + 1).trim();
  }
  return { frontmatter, body: match[2].trimEnd() };
}

function instructionFile(body, target) {
  return `${generatedHeader(target)}

${body}
`;
}

function workflowFile(body) {
  return `${generatedHeader(".agents/workflows/karpathy-guidelines.md")}

# Karpathy Guidelines Workflow

Use this workflow whenever an agent is about to write, review, or refactor code.

1. Read the behavioral guidelines below.
2. State assumptions and success criteria before making non-trivial edits.
3. Keep the change minimal and verify it with the narrowest useful check.
4. Report anything ambiguous or unrelated instead of silently changing it.

${body}
`;
}

function chatModeFile(body) {
  return `---
description: Apply Karpathy-inspired coding-agent guidelines.
tools: ["codebase", "editFiles", "runCommands", "search"]
---

${generatedHeader(".github/chatmodes/karpathy-guidelines.chatmode.md")}

${body}
`;
}

function cursorRuleFile(body) {
  return `---
description: ${description}
alwaysApply: true
---

${generatedHeader(".cursor/rules/karpathy-guidelines.mdc")}

${body}
`;
}

function aiderConfigFile() {
  return `# Generated from ${canonicalSkillPath}. Edit scripts/generate.mjs if the adapter path changes.
read:
  - CONVENTIONS.md
`;
}

function renderSkill(frontmatter, body) {
  return `---
name: ${frontmatter.name ?? skillName}
description: ${frontmatter.description ?? description}
---

${body}
`;
}

function generatedHeader(target) {
  return `<!-- Generated from ${canonicalSkillPath} for ${target}. Do not edit this file by hand. -->`;
}

function pluginJson() {
  return {
    name: "andrej-karpathy-skills",
    description,
    version: "1.0.0",
    author: {
      name: "SwarmClaw AI and contributors",
      url: "https://github.com/swarmclawai"
    },
    license: "MIT",
    keywords: [
      "agent-skills",
      "agents-md",
      "coding-agents",
      "guidelines",
      "best-practices",
      "karpathy"
    ],
    skills: [`./${canonicalSkillPath.slice(0, -"/SKILL.md".length)}`]
  };
}

function marketplaceJson() {
  return {
    name: "karpathy-skills",
    id: "karpathy-skills",
    owner: {
      name: "swarmclawai",
      url: "https://github.com/swarmclawai"
    },
    metadata: {
      description,
      version: "1.0.0",
      repository: `https://github.com/${repo}`,
      tags: [
        "agent-skills",
        "agents-md",
        "coding-agents",
        "claude-code",
        "codex",
        "cursor",
        "gemini-cli",
        "openclaw",
        "karpathy"
      ]
    },
    plugins: [
      {
        name: "andrej-karpathy-skills",
        source: "./",
        description,
        version: "1.0.0",
        author: {
          name: "SwarmClaw AI and contributors"
        },
        keywords: [
          "agent-skills",
          "agents-md",
          "coding-agents",
          "karpathy"
        ],
        category: "workflow"
      }
    ]
  };
}

function targetMatrix() {
  return {
    schemaVersion: 1,
    repository: repo,
    canonicalSkill: canonicalSkillPath,
    generatedBy: "scripts/generate.mjs",
    description,
    agents,
    sources: sourceReferences
  };
}

function copy(target) {
  return { kind: "file", source: target, target };
}

function skillCopy(baseDir) {
  return {
    kind: "skill",
    source: canonicalSkillPath,
    target: `${baseDir}/${skillName}/SKILL.md`
  };
}

function globalSkillCopy(baseDir) {
  return {
    kind: "skill",
    source: canonicalSkillPath,
    target: `${baseDir}/${skillName}/SKILL.md`
  };
}

function set(files, relativePath, contents) {
  files.set(relativePath, contents.endsWith("\n") ? contents : `${contents}\n`);
}

function json(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function displayName(id) {
  const knownIds = {
    codebuddy: "CodeBuddy",
    deepagents: "Deep Agents",
    openclaw: "OpenClaw",
    openhands: "OpenHands",
    "trae-cn": "TRAE CN"
  };
  if (knownIds[id]) return knownIds[id];
  return id
    .split("-")
    .map((part) => {
      const known = {
        adal: "AdaL",
        iflow: "iFlow",
        mcpjam: "MCPJam",
        qwen: "Qwen",
        cn: "CN"
      };
      return known[part] ?? `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`;
    })
    .join(" ");
}

function mergeAgentEntries(entries) {
  const byId = new Map();
  for (const entry of entries) {
    const existing = byId.get(entry.id);
    if (!existing) {
      byId.set(entry.id, normalizeEntry(entry));
      continue;
    }
    existing.aliases = unique([...(existing.aliases ?? []), ...(entry.aliases ?? [])]);
    existing.paths = uniqueTargets([...(existing.paths ?? []), ...(entry.paths ?? [])]);
    existing.globalPaths = uniqueTargets([...(existing.globalPaths ?? []), ...(entry.globalPaths ?? [])]);
  }
  return [...byId.values()];
}

function normalizeEntry(entry) {
  return {
    id: entry.id,
    name: entry.name,
    aliases: unique(entry.aliases ?? []),
    summary: entry.summary,
    paths: uniqueTargets(entry.paths ?? []),
    globalPaths: uniqueTargets(entry.globalPaths ?? [])
  };
}

function unique(values) {
  return [...new Set(values)].sort();
}

function uniqueTargets(targets) {
  const seen = new Set();
  const result = [];
  for (const target of targets) {
    const key = `${target.kind}:${target.source}:${target.target}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(target);
  }
  return result;
}
