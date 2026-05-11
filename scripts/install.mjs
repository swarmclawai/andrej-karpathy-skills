#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";

const rootDir = path.resolve(new URL("..", import.meta.url).pathname);
const targetsPath = path.join(rootDir, "install/targets.json");
const packagePath = path.join(rootDir, "package.json");

const args = parseArgs(process.argv.slice(2));
const matrix = JSON.parse(fs.readFileSync(targetsPath, "utf8"));
const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

if (args.help) {
  printHelp();
  process.exit(0);
}

if (args.version) {
  console.log(packageJson.version);
  process.exit(0);
}

if (args.list) {
  for (const agent of matrix.agents) {
    console.log(`${agent.id}\t${agent.name}\t${agent.summary}`);
  }
  process.exit(0);
}

if (!args.agent) {
  console.error("Missing --agent. Run with --list to see supported agents.");
  process.exit(1);
}

const agent = findAgent(args.agent);
if (!agent) {
  console.error(`Unknown agent: ${args.agent}`);
  console.error("Run with --list to see supported agents.");
  process.exit(1);
}

const dest = path.resolve(args.dest ?? process.cwd());
const selectedTargets = args.global
  ? [...(agent.paths ?? []), ...(agent.globalPaths ?? [])]
  : agent.paths ?? [];

if (!selectedTargets.length) {
  console.error(`Agent ${agent.id} has no project install targets.`);
  process.exit(1);
}

const conflicts = selectedTargets
  .map((target) => resolveTarget(dest, target.target))
  .filter((destination) => fs.existsSync(destination));

if (conflicts.length && !args.force) {
  console.error("Refusing to overwrite existing files without --force:");
  for (const destination of conflicts) console.error(`- ${destination}`);
  process.exit(1);
}

for (const target of selectedTargets) {
  const source = path.join(rootDir, target.source);
  const destination = resolveTarget(dest, target.target);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
  console.log(`${target.source} -> ${destination}`);
}

function findAgent(value) {
  return matrix.agents.find(
    (agent) => agent.id === value || (agent.aliases ?? []).includes(value)
  );
}

function resolveTarget(dest, target) {
  if (target.startsWith("~/")) {
    return path.join(os.homedir(), target.slice(2));
  }
  return path.join(dest, target);
}

function parseArgs(values) {
  const parsed = { global: false };
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (value === "--agent" || value === "-a") {
      parsed.agent = values[++index];
    } else if (value === "--dest" || value === "-d") {
      parsed.dest = values[++index];
    } else if (value === "--global") {
      parsed.global = true;
    } else if (value === "--version" || value === "-v") {
      parsed.version = true;
    } else if (value === "--list") {
      parsed.list = true;
    } else if (value === "--help" || value === "-h") {
      parsed.help = true;
    } else {
      console.error(`Unknown argument: ${value}`);
      process.exit(1);
    }
  }
  return parsed;
}

function printHelp() {
  console.log(`Install Karpathy guidelines for an agent.

Usage:
  node scripts/install.mjs --list
  node scripts/install.mjs --agent codex --dest /path/to/project
  node scripts/install.mjs --agent claude --dest /path/to/project --global
  npx @swarmclawai/andrej-karpathy-skills --agent openclaw --dest /path/to/project
  npm install -g @swarmclawai/andrej-karpathy-skills
  andrej-karpathy-skills --agent cursor --dest /path/to/project

Options:
  --agent, -a   Agent id or alias from install/targets.json
  --dest, -d    Project directory to write into (default: current directory)
  --global      Also install any supported user-level skill path
  --force       Overwrite existing files
  --list        List supported agents
  --version     Print package version
`);
}
