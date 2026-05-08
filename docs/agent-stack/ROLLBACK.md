# Agent Stack Rollback Procedures

This document outlines how to revert agent stack changes if issues arise.

## Quick Rollback (Emergency)

To immediately disable all agent stack enforcement:

```bash
# Disable CI enforcement
git checkout HEAD~1 -- .github/workflows/agent-security.yml .github/workflows/agent-quality.yml

# Remove agent scripts from package.json
npm uninstall ajv ajv-formats

# Restore original package.json scripts (backup: package.json.backup)
git checkout HEAD~1 -- package.json
```

## Selective Rollback

### Disable Security Scanning
```bash
# Comment out security commands in CI
sed -i.bak 's/npm run agent:security:ci/# npm run agent:security:ci/' .github/workflows/agent-security.yml
```

### Disable Code Review Lanes
```bash
# Comment out review commands in CI
sed -i.bak 's/npm run agent:review:ci/# npm run agent:review:ci/' .github/workflows/agent-quality.yml
```

### Disable UI Review
```bash
# Comment out UI review commands
sed -i.bak 's/npm run agent:ui-review/# npm run agent:ui-review/' .github/workflows/agent-quality.yml
```

## File-by-File Rollback

### Remove Agent Stack Files
```bash
# Remove entire agent stack directory
rm -rf docs/agent-stack/

# Remove Claude config
rm -rf .claude/

# Remove agent scripts
rm -rf scripts/agent/

# Remove CI workflows
rm .github/workflows/agent-security.yml
rm .github/workflows/agent-quality.yml
```

### Restore Original package.json
```bash
# If backup exists
cp package.json.backup package.json

# Or manually remove agent scripts (safer)
# Remove all "agent:*" scripts from package.json
# Remove ajv, ajv-formats from devDependencies
```

## Staged Rollback (Recommended)

1. **Phase 1**: Switch from blocking to warn-only
   - Edit `ENFORCEMENT_POLICY.md`
   - Update CI workflows to use `continue-on-error: true`

2. **Phase 2**: Disable individual capabilities
   - Security scanning
   - Code review lanes
   - UI review
   - Process gates

3. **Phase 3**: Complete removal
   - Remove files and scripts
   - Clean up package.json

## Verification After Rollback

```bash
# Ensure builds still work
npm run build

# Ensure tests still pass
npm test

# Verify CI passes
git push origin feature-branch

# Check that existing dev workflows are unaffected
npm run dev
npm run lint
npm run type-check
```

## Recovery

To restore agent stack after rollback:

```bash
# Restore from git history
git checkout <commit-hash> -- docs/agent-stack/
git checkout <commit-hash> -- .github/workflows/agent-*.yml
git checkout <commit-hash> -- scripts/agent/
git checkout <commit-hash> -- package.json

# Reinstall dependencies
npm install

# Verify functionality
npm run agent:suppressions:validate
```

## Emergency Contacts

If rollback procedures fail:
1. Create emergency hotfix branch
2. Revert to last known good commit
3. Document issues in GitHub issue
4. Update this rollback guide based on lessons learned

## Backup Strategy

Before implementing agent stack:
- Backup current package.json as package.json.backup
- Document current CI workflow state
- Create rollback branch: `git checkout -b pre-agent-stack`