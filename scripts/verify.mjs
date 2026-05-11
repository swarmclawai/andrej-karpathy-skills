#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const rootDir = path.resolve(new URL("..", import.meta.url).pathname);

run("node", ["scripts/generate.mjs", "--check"]);
run("node", ["scripts/install.mjs", "--list"]);

const targets = JSON.parse(fs.readFileSync(path.join(rootDir, "install/targets.json"), "utf8"));
assert(targets.schemaVersion === 1, "install/targets.json must use schemaVersion 1");
assert(targets.canonicalSkill === "skills/karpathy-guidelines/SKILL.md", "canonical skill path changed");
assert(targets.agents.length >= 48, "expected the SwarmVault core and extended agent matrix");

for (const requiredAgent of [
  "codex",
  "claude",
  "cursor",
  "gemini",
  "opencode",
  "aider",
  "copilot",
  "openclaw",
  "warp",
  "windsurf"
]) {
  assert(targets.agents.some((agent) => agent.id === requiredAgent), `missing ${requiredAgent}`);
}

for (const requiredPath of [
  "AGENTS.md",
  "CLAUDE.md",
  "GEMINI.md",
  "CONVENTIONS.md",
  ".cursor/rules/karpathy-guidelines.mdc",
  ".github/copilot-instructions.md",
  ".github/chatmodes/karpathy-guidelines.chatmode.md",
  ".agents/skills/karpathy-guidelines/SKILL.md",
  ".openclaw/skills/karpathy-guidelines/SKILL.md"
]) {
  assert(fs.existsSync(path.join(rootDir, requiredPath)), `missing ${requiredPath}`);
}

console.log("Verification passed.");

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: rootDir,
    stdio: "inherit"
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}
