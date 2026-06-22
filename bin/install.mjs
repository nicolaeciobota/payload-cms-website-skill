#!/usr/bin/env node
/**
 * payload-cms-website-skill — installer
 *
 * Copies the `payload-website-template` skill into your Claude Code skills directory.
 * Zero dependencies: uses only Node built-ins, so `npx` runs instantly.
 *
 * Usage:
 *   npx github:nicolaeciobota/payload-cms-website-skill            # global  (~/.claude/skills)
 *   npx github:nicolaeciobota/payload-cms-website-skill --project  # project (./.claude/skills)
 *   npx github:nicolaeciobota/payload-cms-website-skill --force    # overwrite without notice
 */

import { existsSync, cpSync, mkdirSync, rmSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const SKILL_NAME = 'payload-website-template'
const here = dirname(fileURLToPath(import.meta.url))
const src = resolve(here, '..', 'skills', SKILL_NAME)

const args = process.argv.slice(2)
const projectScope = args.includes('--project') || args.includes('--local')
const force = args.includes('--force')
const wantsHelp = args.includes('--help') || args.includes('-h')

// Tiny ANSI helpers (no dependency).
const wrap = (code, s) => `\x1b[${code}m${s}\x1b[0m`
const bold = (s) => wrap('1', s)
const dim = (s) => wrap('2', s)
const red = (s) => wrap('31', s)
const green = (s) => wrap('32', s)
const yellow = (s) => wrap('33', s)
const cyan = (s) => wrap('36', s)

function fail(msg) {
  console.error('\n' + red('✖ ') + msg + '\n')
  process.exit(1)
}

if (wantsHelp) {
  console.log(`
${bold('payload-cms-website-skill')} — install the ${cyan('payload-website-template')} Claude Code skill

${bold('Usage')}
  npx github:nicolaeciobota/payload-cms-website-skill [options]

${bold('Options')}
  --project, --local   Install into ./.claude/skills (current repo) instead of global
  --force              Overwrite an existing install without the "updated" note
  --help, -h           Show this help

${bold('Default')} installs into ${dim('~/.claude/skills/' + SKILL_NAME)}
`)
  process.exit(0)
}

if (!existsSync(src)) {
  fail(`Could not find the skill source at:\n  ${src}\nThe package looks incomplete — please re-run or open an issue.`)
}

const baseDir = projectScope
  ? resolve(process.cwd(), '.claude', 'skills')
  : join(homedir(), '.claude', 'skills')
const dest = join(baseDir, SKILL_NAME)
const existed = existsSync(dest)

try {
  mkdirSync(baseDir, { recursive: true })
  if (existed) rmSync(dest, { recursive: true, force: true })
  cpSync(src, dest, { recursive: true })
} catch (err) {
  fail(`Install failed: ${err.message}`)
}

const scopeLabel = projectScope ? 'project' : 'global'
const verb = existed && !force ? yellow('updated') : green('installed')

console.log(`
${green('✔')} ${bold(SKILL_NAME)} skill ${verb} ${dim(`(${scopeLabel})`)}
  ${dim('→')} ${dest}

${bold('Invoke it in Claude Code:')}
  ${cyan('/' + SKILL_NAME)}
  ${cyan('/' + SKILL_NAME + ' design the homepage, plan first')}

${dim('Or just say: "use the ' + SKILL_NAME + ' skill".')}
${dim('If it does not show up yet, start a new Claude Code session.')}
`)
