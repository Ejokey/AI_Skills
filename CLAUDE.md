# Personal Ops — AI Agent System

This folder is the operating base for a one-person set of role-based AI workflows.
Claude Code is the engine, skills are the specialists, `projects/` holds the work.

## Roles and their core tasks

- **Project Manager** — task/deadline tracking, status reporting, not missing anything
- **Product Manager** — comprehensive product docs, deep understanding of project ideas, works with dev team
- **CMO / Marketing** — market analysis, competitor analysis
- **Web Designer / Frontend Dev** — landing pages, UI work
- **Business Analyst** — BA docs, use-case schemas, user stories — feeds UI/UX design
- **Tender/Proposal** — reads tender descriptions, figures out which docs are actually needed, gathers them from colleagues, assembles the application
- **Presentations** — step-by-step deck building (cross-role, used by most of the above)

## Folder structure

```
/
├── CLAUDE.md              this file
├── skills/                 versioned source of truth for skills, organized by role
│   ├── project-management/
│   ├── product-management/
│   ├── marketing/
│   ├── design/
│   ├── business-analysis/
│   ├── tenders/
│   └── shared/              cross-role utilities (research, skill discovery, browser automation)
├── scripts/
│   └── install-skills.sh   syncs skills/<role>/<name> → ~/.claude/skills (runtime)
├── projects/                one folder per project/initiative: context, docs, outputs
└── templates/               reusable doc templates (PRD, BA doc, tender checklist, etc.)
```

## How skills get here

Skills are sourced from existing public repos (not written from scratch). The
`find-skills` skill (installed globally, sourced from AI_Skills) is the tool for
finding and installing candidates. Once a skill proves useful, drop its folder into
the matching `skills/<role>/` directory here so it's versioned and backed up, then
run `scripts/install-skills.sh` to sync it into the live `~/.claude/skills/` runtime
folder Claude Code actually reads from.

## Conventions

- One folder = one skill, must have `SKILL.md` with `name` + `description` frontmatter.
- Skill `name` must be unique across the whole `skills/` tree (global installer is flat).
- Every project lives in its own folder under `projects/`, named after the project/client.
- Prefer plan-first prompting on any nontrivial build: state the outcome, which skills
  to use, and constraints, then ask Claude to clarify before producing output.
