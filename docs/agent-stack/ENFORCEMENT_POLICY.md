# Agent Stack Enforcement Policy

This document defines the enforcement strategy for the SiteOptz agent stack, starting with warn-only mode and progressing to blocking based on capability maturity.

## Enforcement Philosophy

- **Start warn-only everywhere** to establish baselines
- **Progressive enforcement** in stages based on risk and maturity
- **Developer experience first** - avoid blocking legitimate work
- **Clear escalation path** from advisory to blocking

## Enforcement Matrix

| Capability | Local | PR | Production | Status |
|------------|-------|----|-----------:|--------|
| Security/Secrets | Warn | Warn | Block | Phase 1 |
| Correctness | Warn | Warn | Warn | Phase 2 |
| Architecture | Warn | Advisory | Advisory | Phase 3 |
| UI/A11y (Critical) | Warn | Warn | Advisory | Phase 4 |
| Process Artifacts | Advisory | Advisory | Advisory | Phase 5 |
| Release Governance | Advisory | Advisory | Block | Phase 6 |

## Phase 1: Security First (Current)

**Status**: ACTIVE
**Timeline**: Immediate implementation

### Blocking (Production Only)
- Hardcoded secrets or credentials
- High/Critical security vulnerabilities in new dependencies
- Exposed API keys or tokens

### Warning (Local + PR)
- Medium security vulnerabilities
- Dependency security advisories
- Insecure coding patterns
- Missing security headers

### Suppression Requirements
- Security suppressions require approver field
- Maximum 30-day expiry for active suppressions
- Issue link required for all security suppressions

## Phase 2: Correctness (Planned)

**Status**: Warn-only
**Target Date**: 2 weeks after Phase 1 stable

### Blocking (Production Only)
- Build failures
- TypeScript errors
- Critical test failures
- Schema validation failures

### Warning (Local + PR)
- ESLint errors
- Type inconsistencies
- Broken functionality tests
- Data integrity violations

## Phase 3: Architecture (Planned)

**Status**: Advisory-only
**Target Date**: 1 month after Phase 2

### Advisory Only
- Design pattern violations
- Component boundary issues
- Performance regressions
- Code complexity warnings

### Critical Architecture (Future Blocking)
- API breaking changes to public interfaces
- Database schema breaking changes
- Major performance degradation (>50%)

## Phase 4: UI/Accessibility (Planned)

**Status**: Advisory-only
**Target Date**: 6 weeks after Phase 1

### Warning (Critical A11y Only)
- Missing alt text on images
- Form inputs without labels
- Color contrast violations
- Keyboard navigation breaks

### Advisory
- Design token inconsistencies
- Component styling variations
- Non-semantic HTML usage
- Missing ARIA attributes

## Phase 5: Process Artifacts (Future)

**Status**: Advisory-only
**Target Date**: 8 weeks after Phase 1

### Advisory Only
- Missing plan documents for major features
- Incomplete self-review artifacts
- Missing test evidence for significant changes

### Blocking Threshold
- Changes to protected paths (auth, payments, PII) require artifacts
- Major feature releases require planning documentation

## Phase 6: Release Governance (Future)

**Status**: Advisory-only
**Target Date**: 12 weeks after Phase 1

### Blocking (Production Only)
- Production deployment without release manager approval
- Missing release readiness checklist
- Insufficient testing evidence for production changes

### Advisory
- Feature flags not used for experimental features
- Missing rollback procedures for significant changes

## Suppression Framework

### Suppression Categories

#### SEC-#### (Security)
- **Required fields**: tool, severity, approver, issue_link
- **Max expiry**: 30 days for active issues
- **Review frequency**: Weekly for critical, monthly for others

#### REV-#### (Review)
- **Required fields**: lane, severity, rationale
- **Max expiry**: 90 days
- **Review frequency**: Monthly

#### UI-#### (UI/Design)
- **Required fields**: category, impacted_flows
- **Max expiry**: 60 days
- **Review frequency**: Bi-weekly

### Suppression Rules

1. **Expiry is mandatory** for all active suppressions
2. **Owner must be assigned** and responsible for resolution
3. **Rationale must be clear** and justify the risk acceptance
4. **Issue links required** for tracking resolution
5. **Regular review cycles** ensure suppressions don't become permanent

## Escalation Procedures

### Level 1: Developer Discussion
- Work with team to understand and resolve
- Update suppressions if legitimate exception
- Document lessons learned

### Level 2: Tech Lead Review
- Review suppression rationale
- Approve temporary exceptions
- Set resolution timeline

### Level 3: Security Review (SEC only)
- Security team approval for security suppressions
- Risk assessment documentation
- Mitigation plan required

## Monitoring and Metrics

### Success Metrics
- **False positive rate** < 10%
- **Resolution time** for legitimate issues < 24h
- **Developer satisfaction** > 80%
- **Security issue detection** rate trending up

### Warning Signals
- Suppression growth rate > 20% monthly
- Consistent suppression of same rule
- Developer bypassing system
- Production issues that should have been caught

## Configuration

### CI Behavior
```yaml
# Phase 1 - Warn only mode
continue-on-error: true

# Future phases - Selective blocking
continue-on-error: false
allow-failure: ['non-critical']
```

### Local Development
- All checks run but don't block
- Clear warnings and suggestions
- Easy suppression creation for legitimate cases

## Review and Adjustment

This policy will be reviewed:
- **Weekly** during first month
- **Bi-weekly** during months 2-3
- **Monthly** thereafter
- **Immediately** after any production incidents

### Adjustment Triggers
- False positive rate > 15%
- Developer productivity impact
- Missed security/quality issues
- Tool reliability problems

## Implementation Checklist

- [ ] Phase 1 implementation complete
- [ ] Monitoring dashboards configured
- [ ] Team training completed
- [ ] Suppression validation working
- [ ] Rollback procedures tested
- [ ] Metrics collection active

Last updated: 2026-05-07
Current phase: 1 (Security First)
Next review: 2026-05-14