# Agent Stack Documentation

This directory contains the standardized multi-agent engineering workflow implementation for SiteOptz.

## Overview

The agent stack provides:
- Plan → test → implement → review discipline
- Frontend design quality enforcement
- Five-lane code review system
- Security and vulnerability scanning
- Cross-session project memory
- Multi-role orchestration

## Structure

- `templates/` - Standard templates for planning and reviews
- `*.md` files - Policy and configuration documentation
- `suppression*.md` files - Rule suppressions and exceptions

## Commands

Run agent commands via npm:

```bash
# Memory and planning
npm run agent:memory:check
npm run agent:plan

# Review system
npm run agent:review           # All lanes
npm run agent:review:ci        # CI mode
npm run agent:self-review

# Security
npm run agent:security
npm run agent:security:ci

# UI/Design
npm run agent:ui-review

# Orchestration
npm run agent:orchestrate

# Suppressions
npm run agent:suppressions:parse
npm run agent:suppressions:validate
```

## Getting Started

1. Review `ENFORCEMENT_POLICY.md` for current blocking vs advisory rules
2. Check `BASELINE.md` for project standards
3. Use templates in `templates/` for consistent planning
4. Configure suppressions as needed in `*-suppressions.md` files

## Rollback

See `ROLLBACK.md` for reverting any agent stack changes.