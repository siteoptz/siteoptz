# Self-Review Template

**Feature/Change**: [Name matching planning doc]

**Date**: [YYYY-MM-DD]

**Author**: [Name/Handle]

**Related Plan**: [Link to planning document]

## Implementation Summary

**What was built:**
[Brief description of what was actually implemented]

**Key files changed:**
- `file1.tsx` - [Brief description of changes]
- `file2.js` - [Brief description of changes]
- `file3.json` - [Brief description of changes]

**Deviation from plan:**
[Any changes from the original plan and why]

## Quality Checklist

### Functional Testing
- [ ] Core functionality works as expected
- [ ] Edge cases handled appropriately
- [ ] Error scenarios tested
- [ ] User flows validated end-to-end

### Code Quality
- [ ] TypeScript strict mode compliance
- [ ] ESLint rules passing
- [ ] Prettier formatting applied
- [ ] No console.log or debug code left
- [ ] Proper error handling implemented
- [ ] Comments added for complex logic

### Performance
- [ ] Bundle size impact assessed (`npm run analyze`)
- [ ] Large imports avoided or lazy-loaded
- [ ] Images optimized
- [ ] Database queries optimized (if applicable)
- [ ] Caching strategies considered

### Security
- [ ] Input validation implemented
- [ ] No hardcoded secrets or tokens
- [ ] Proper authentication/authorization
- [ ] XSS prevention measures
- [ ] Data sanitization where needed

### Accessibility
- [ ] Keyboard navigation tested
- [ ] Screen reader compatibility verified
- [ ] Color contrast meets WCAG guidelines
- [ ] Focus management implemented
- [ ] Alternative text for images
- [ ] Form labels properly associated

## SiteOptz-Specific Validation

### Data Compliance
- [ ] aiToolsData.json schema followed (if modified)
- [ ] URL formats correct (`/compare/tool1/vs/tool2`)
- [ ] Tool slugs consistent and valid
- [ ] Required fields populated

### Design System
- [ ] Dark theme styling applied
- [ ] Correct gradient backgrounds used
- [ ] Component styling consistent with design system
- [ ] Mobile responsiveness verified
- [ ] Design tokens used appropriately

### SEO and Rich Results
- [ ] Meta tags properly implemented
- [ ] Structured data schema valid
- [ ] SoftwareApplication schema complete (if applicable)
- [ ] Canonical URLs correct
- [ ] OpenGraph tags present

### Required Validations Passed
- [ ] `npm run build` succeeds
- [ ] `npm run type-check` passes
- [ ] `npm run lint` passes
- [ ] `npm run validate-urls` passes
- [ ] `npm run validate-images` passes
- [ ] `npm run validate-schema` passes
- [ ] `npm test` passes (if tests exist)

## Testing Evidence

### Manual Testing Performed
**Test Case 1**: [Description]
- **Steps**: [1, 2, 3...]
- **Expected**: [Expected result]
- **Actual**: [Actual result]
- **Status**: ✅ Pass / ❌ Fail

**Test Case 2**: [Description]
- **Steps**: [1, 2, 3...]
- **Expected**: [Expected result]
- **Actual**: [Actual result]  
- **Status**: ✅ Pass / ❌ Fail

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Performance Testing
- [ ] Lighthouse score > 90
- [ ] Core Web Vitals green
- [ ] Bundle size within limits
- [ ] Load time acceptable

## Risk Assessment

### Identified Risks
**Risk 1**: [Description]
- **Likelihood**: High/Medium/Low
- **Impact**: High/Medium/Low
- **Mitigation**: [How it's addressed]

**Risk 2**: [Description]
- **Likelihood**: High/Medium/Low
- **Impact**: High/Medium/Low
- **Mitigation**: [How it's addressed]

### Known Issues
- **Issue 1**: [Description and plan to resolve]
- **Issue 2**: [Description and plan to resolve]

## Agent Stack Compliance

### Security Review
- [ ] No new security vulnerabilities introduced
- [ ] Secret scanning passes
- [ ] Dependencies updated and secure
- [ ] No suppression rules violated

### Code Review Readiness
- [ ] Code follows architectural patterns
- [ ] Performance impact acceptable
- [ ] Style guidelines followed
- [ ] No regression risks identified

### UI/Design Review
- [ ] Design system compliance verified
- [ ] Accessibility standards met
- [ ] User experience flows tested
- [ ] Visual consistency maintained

## Deployment Readiness

### Pre-deployment Checklist
- [ ] All validation commands pass
- [ ] Environment variables configured (if needed)
- [ ] Database migrations ready (if applicable)
- [ ] Monitoring/logging configured
- [ ] Rollback plan prepared

### Rollback Plan
**Trigger conditions**: [When to rollback]

**Rollback steps**:
1. [Specific steps to revert changes]
2. [Verification steps]
3. [Communication plan]

## Lessons Learned

### What Went Well
- [Positive aspects of the implementation]

### What Could Be Improved
- [Areas for improvement in process or approach]

### Knowledge Gained
- [New learnings or insights from this work]

## Next Steps

### Immediate
- [ ] Deploy to production
- [ ] Monitor for issues
- [ ] Update documentation

### Follow-up
- [ ] Performance optimization
- [ ] Additional testing
- [ ] Feature enhancements

## Approval

**Self-Review Status**: ✅ Complete / 🔄 In Progress / ❌ Blocked

**Ready for Team Review**: Yes / No

**Additional Reviews Needed**: [Security/Performance/Design/etc.]

**Estimated Review Time**: [How long team review might take]

---

**Review Completion Date**: [YYYY-MM-DD]

**Deployment Date**: [YYYY-MM-DD or Planned]

**Post-Deployment Monitoring**: [Plan for monitoring after deployment]