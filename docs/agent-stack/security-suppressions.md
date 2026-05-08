# Security Suppressions

This file manages security-related suppressions for the SiteOptz agent stack.

**Last Updated**: 2026-05-07  
**Next Review**: 2026-05-14

## Active Suppressions

### SEC-001 - Legacy OAuth Implementation
- **Status**: active
- **Severity**: medium
- **Tool**: oauth-security-scanner
- **Rule ID**: oauth-deprecated-flow
- **Scope**: pages/api/auth/oauth/
- **Introduced**: 2026-05-07
- **Expiry**: 2026-06-07
- **Owner**: Development Team
- **Rationale**: Using legacy OAuth flow for Google Ads API compatibility. Modern PKCE flow causes issues with existing integrations.
- **Issue Link**: https://github.com/siteoptz/siteoptz-ai/issues/xxx
- **Last Reviewed**: 2026-05-07
- **Mitigation**: Isolated to specific API routes, input validation in place
- **Approver**: Security Team Lead

### SEC-002 - Third-party Analytics Scripts
- **Status**: active
- **Severity**: low
- **Tool**: csp-analyzer
- **Rule ID**: inline-script-unsafe
- **Scope**: components/Analytics/
- **Introduced**: 2026-05-07
- **Expiry**: 2026-06-07
- **Owner**: Marketing Team
- **Rationale**: Google Analytics and other tracking scripts require inline execution for proper functionality
- **Issue Link**: https://github.com/siteoptz/siteoptz-ai/issues/yyy
- **Last Reviewed**: 2026-05-07
- **Mitigation**: Strict CSP in place, scripts loaded from trusted domains only

### SEC-003 - Environment Example Files
- **Status**: active
- **Severity**: low
- **Tool**: secrets-scanner
- **Rule ID**: API Keys
- **Scope**: .env*.example
- **Introduced**: 2026-05-07
- **Expiry**: 2026-08-07
- **Owner**: Development Team
- **Rationale**: Example environment files contain placeholder API key patterns for documentation purposes
- **Issue Link**: https://github.com/siteoptz/siteoptz-ai/issues/env-examples
- **Last Reviewed**: 2026-05-07
- **Mitigation**: Example files contain no real secrets, only documentation templates

### SEC-004 - Development Environment Files
- **Status**: active
- **Severity**: medium
- **Tool**: secrets-scanner
- **Rule ID**: API Keys
- **Scope**: .env.local
- **Introduced**: 2026-05-07
- **Expiry**: 2026-05-14
- **Owner**: Development Team
- **Rationale**: Local development environment file, not committed to production
- **Issue Link**: https://github.com/siteoptz/siteoptz-ai/issues/env-local
- **Last Reviewed**: 2026-05-07
- **Mitigation**: File is in .gitignore and contains only development test keys
- **Approver**: Tech Lead

## Resolved Suppressions

*No resolved suppressions yet*

## Suppression Guidelines

### Required Fields for Security Suppressions
- **Status**: active/Resolved/Expired
- **Severity**: Critical/High/Medium/Low
- **Tool**: Security scanning tool that flagged the issue
- **Rule ID**: Specific rule that was violated
- **Scope**: File paths or components affected
- **Introduced**: Date when suppression was added
- **Expiry**: Maximum 30 days for active suppressions
- **Owner**: Person responsible for resolution
- **Rationale**: Business justification for accepting the risk
- **Issue Link**: Link to tracking issue for resolution
- **Last Reviewed**: Date of most recent review
- **Approver**: Required for Critical/High severity (Security Team Lead)

### Severity Guidelines

#### Critical
- Remote code execution vulnerabilities
- Authentication bypasses
- Data exposure risks
- **Max Expiry**: 7 days
- **Approval Required**: Security Team Lead

#### High  
- Privilege escalation
- XSS vulnerabilities
- Injection attacks
- **Max Expiry**: 14 days
- **Approval Required**: Security Team Lead

#### Medium
- Information disclosure
- CSRF vulnerabilities
- Deprecated security practices
- **Max Expiry**: 30 days
- **Approval Required**: Tech Lead

#### Low
- Security headers missing
- Non-critical configuration issues
- Development/testing artifacts
- **Max Expiry**: 90 days
- **Approval Required**: None (auto-approved)

### Review Process

1. **Weekly Review** (Critical/High)
   - Assess progress toward resolution
   - Update expiry if needed (with justification)
   - Escalate if blocking resolution

2. **Monthly Review** (Medium/Low)
   - Validate suppressions are still needed
   - Check if underlying issue can be resolved
   - Archive resolved or expired suppressions

3. **Quarterly Audit**
   - Review all active suppressions
   - Identify patterns and systemic issues
   - Update suppression guidelines as needed

### Adding New Suppressions

1. **Create Issue**: Link to tracking issue for resolution
2. **Justify Risk**: Clear business rationale for acceptance
3. **Set Expiry**: Based on severity guidelines
4. **Assign Owner**: Specific person responsible for resolution
5. **Get Approval**: If required by severity level
6. **Document**: Add to this file with all required fields

### Escalation

If suppression cannot be resolved before expiry:
1. **Assess Risk**: Re-evaluate if risk is still acceptable
2. **Update Justification**: Document why extension is needed
3. **Get Approval**: Required approval for any extension
4. **Set New Expiry**: Cannot exceed original maximum timeframe
5. **Plan Resolution**: Concrete steps and timeline for resolution

## Emergency Suppressions

For production incidents requiring immediate suppression:
1. **Immediate**: Add suppression with 24-hour expiry
2. **Document**: Create detailed issue within 4 hours
3. **Review**: Security team review within 24 hours
4. **Resolve or Extend**: Decision required before expiry

## Monitoring

### Metrics
- **Active Suppressions**: Target < 10
- **Overdue Suppressions**: Target = 0
- **Average Resolution Time**: Target < 14 days
- **Repeat Violations**: Target < 5%

### Alerts
- Suppression expires in 7 days
- Suppression expires in 24 hours
- New critical/high severity suppression added
- Suppression count exceeds threshold

## Contact

For questions about security suppressions:
- **Security Team**: security@siteoptz.ai
- **Tech Lead**: tech-lead@siteoptz.ai
- **Emergency**: Create high-priority issue in GitHub