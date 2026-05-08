# Code Review Suppressions

This file manages code review-related suppressions for the SiteOptz agent stack.

**Last Updated**: 2026-05-07  
**Next Review**: 2026-05-21

## Active Suppressions

### REV-001 - Legacy Data Structure Complexity
- **Status**: active
- **Severity**: medium
- **Lane**: architecture
- **Rule ID**: complex-data-structure
- **Scope**: public/data/aiToolsData.json
- **Introduced**: 2026-05-07
- **Expiry**: 2026-08-07
- **Owner**: Development Team
- **Rationale**: Single large JSON file serves as database for 700+ tools. Refactoring to database would be major architectural change affecting entire application.
- **Issue Link**: https://github.com/siteoptz/siteoptz-ai/issues/data-structure-refactor
- **Last Reviewed**: 2026-05-07

### REV-002 - Component Prop Drilling
- **Status**: active
- **Severity**: low
- **Lane**: style
- **Rule ID**: prop-drilling-depth
- **Scope**: components/ComparisonTable/
- **Introduced**: 2026-05-07
- **Expiry**: 2026-07-07
- **Owner**: Frontend Team
- **Rationale**: Comparison components require deep prop passing for tool data. Context API would add complexity for this specific use case.
- **Issue Link**: https://github.com/siteoptz/siteoptz-ai/issues/context-refactor
- **Last Reviewed**: 2026-05-07

### REV-003 - Mixed Async Patterns
- **Status**: active  
- **Severity**: low
- **Lane**: correctness
- **Rule ID**: async-pattern-inconsistency
- **Scope**: utils/dataHelpers.js
- **Introduced**: 2026-05-07
- **Expiry**: 2026-06-07
- **Owner**: Backend Team
- **Rationale**: Legacy utility functions use different async patterns. Standardization planned for next refactor cycle.
- **Issue Link**: https://github.com/siteoptz/siteoptz-ai/issues/async-standardization
- **Last Reviewed**: 2026-05-07

## Resolved Suppressions

*No resolved suppressions yet*

## Suppression Guidelines

### Required Fields for Review Suppressions
- **Status**: active/Resolved/Expired
- **Severity**: Critical/High/Medium/Low
- **Lane**: Correctness/Architecture/Style/Performance/Regression
- **Rule ID**: Specific review rule that was flagged
- **Scope**: File paths or components affected
- **Introduced**: Date when suppression was added
- **Expiry**: Maximum 90 days for active suppressions
- **Owner**: Person responsible for resolution
- **Rationale**: Technical justification for deferring the fix
- **Issue Link**: Link to tracking issue for resolution
- **Last Reviewed**: Date of most recent review

### Review Lane Categories

#### Correctness
- **Focus**: Bugs, logic errors, type safety
- **Examples**: Type mismatches, null reference errors, incorrect calculations
- **Max Expiry**: 30 days for critical bugs, 60 days for minor issues

#### Architecture  
- **Focus**: Design patterns, component structure, data flow
- **Examples**: Tight coupling, circular dependencies, pattern violations
- **Max Expiry**: 90 days (architectural changes take time)

#### Style
- **Focus**: Code formatting, naming, conventions
- **Examples**: Inconsistent naming, formatting issues, comment style
- **Max Expiry**: 30 days (style issues are quick to fix)

#### Performance
- **Focus**: Speed, memory usage, bundle size
- **Examples**: Inefficient algorithms, memory leaks, large bundle impact
- **Max Expiry**: 60 days (performance fixes may require research)

#### Regression
- **Focus**: Changes that break existing functionality
- **Examples**: API changes, behavior modifications, compatibility issues
- **Max Expiry**: 14 days (regressions should be fixed quickly)

### Severity Guidelines

#### Critical
- Production-breaking issues
- Security implications
- Data corruption risks
- **Max Expiry**: 7 days

#### High
- Major functionality issues
- Significant performance degradation  
- API breaking changes
- **Max Expiry**: 14 days

#### Medium
- Moderate code quality issues
- Minor performance impacts
- Maintainability concerns
- **Max Expiry**: 30 days

#### Low
- Style inconsistencies
- Minor optimizations
- Documentation gaps
- **Max Expiry**: 90 days

### Review Process

1. **Weekly Review** (Critical/High)
   - Check progress on resolution
   - Escalate if blocking factors exist
   - Consider breaking into smaller tasks

2. **Bi-weekly Review** (Medium)
   - Assess if issue can be resolved quickly
   - Consider bundling with related changes
   - Update timeline if needed

3. **Monthly Review** (Low)
   - Validate suppression is still needed
   - Archive if no longer relevant
   - Consider batching similar fixes

### Adding New Suppressions

1. **Identify Root Cause**: Understand why the issue exists
2. **Estimate Effort**: Time required to properly resolve
3. **Create Tracking Issue**: Link for progress tracking
4. **Set Realistic Expiry**: Based on effort and severity
5. **Assign Owner**: Specific person responsible
6. **Document Context**: Rationale and any constraints

### Lane-Specific Guidelines

#### Correctness Lane
- Focus on functional accuracy over style
- Prioritize user-facing bugs
- Consider impact on data integrity

#### Architecture Lane  
- Look for pattern compliance
- Assess long-term maintainability
- Consider performance implications

#### Style Lane
- Enforce consistent conventions
- Check readability and clarity
- Validate documentation completeness

#### Performance Lane
- Monitor bundle size impact
- Check for memory leaks
- Assess Core Web Vitals impact

#### Regression Lane
- Compare against baseline functionality
- Check for breaking changes
- Validate backward compatibility

## SiteOptz-Specific Considerations

### Data Integrity
- Changes to aiToolsData.json structure require careful review
- URL format consistency critical for SEO
- Schema validation must pass

### SEO Impact  
- Review changes affecting meta tags
- Validate structured data compliance
- Check canonical URL generation

### Performance
- Bundle size monitoring for component changes
- Image optimization requirements
- Core Web Vitals maintenance

### Design System
- Dark theme compliance
- Component styling consistency
- Accessibility standards

## Monitoring

### Metrics
- **Active Suppressions by Lane**: Target < 5 per lane
- **Overdue Suppressions**: Target = 0  
- **Average Resolution Time**: Target < 30 days
- **Suppression Growth Rate**: Target < 10% monthly

### Alerts
- Suppression expires in 7 days
- High/Critical suppression added
- Suppression count exceeds lane threshold
- Pattern of repeated suppressions

## Contact

For questions about code review suppressions:
- **Tech Lead**: tech-lead@siteoptz.ai
- **Architecture Review**: arch-review@siteoptz.ai
- **Code Quality**: code-quality@siteoptz.ai