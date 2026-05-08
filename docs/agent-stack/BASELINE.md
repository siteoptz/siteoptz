# Agent Stack Baseline

This document establishes the baseline standards and expectations for the SiteOptz agent stack implementation.

## Project Context

- **Repository**: SiteOptz AI tool comparison platform
- **Stack**: Next.js 14.2.31, TypeScript, React
- **Architecture**: Static generation with serverless API routes
- **Data**: Single source of truth in `public/data/aiToolsData.json`
- **Deployment**: Vercel with automated builds

## Quality Standards

### Code Quality
- TypeScript strict mode compliance
- ESLint with Next.js and a11y rules
- Prettier formatting consistency
- Component reusability and proper separation of concerns

### Security Baseline
- No hardcoded secrets or credentials
- Proper environment variable usage
- Secure API route implementations
- Input validation and sanitization

### Performance Standards
- Next.js bundle size limits: client 512kB, server 1MB
- Image optimization required
- SEO compliance with structured data
- Core Web Vitals optimization

### UI/UX Standards
- Dark theme consistency (mandatory styling)
- Accessibility compliance (jsx-a11y rules)
- Responsive design principles
- Design system adherence

## Data Integrity

### Critical Data Files
- `public/data/aiToolsData.json` - Single source of truth
- Schema validation required for all tool additions
- URL format compliance: `/compare/tool1/vs/tool2`
- Rich results structured data implementation

### Image Management
- Logo validation before deployment
- SVG format preference
- Consistent naming: `/images/tools/[tool-slug]-logo.svg`

## Development Workflow

### Required Checks
- `npm run validate-urls` - URL format validation
- `npm run validate-images` - Image validation
- `npm run validate-schema` - Schema compliance
- `npm run type-check` - TypeScript validation
- `npm run lint` - Code quality

### Testing Standards
- Integration tests for core functionality
- Schema validation tests
- API endpoint testing
- Template validation

## Enforcement Levels

### Critical (Must Block)
- Security vulnerabilities
- Data corruption risks
- Build failures
- Schema violations

### High (Should Warn)
- Code quality issues
- Performance regressions
- A11y violations
- SEO compliance issues

### Medium (Advisory)
- Style inconsistencies
- Documentation gaps
- Minor optimizations

## Suppression Guidelines

### Acceptable Suppressions
- Third-party library limitations
- Legacy code compatibility
- Performance vs. security tradeoffs (documented)
- Temporary hotfixes (with expiry dates)

### Unacceptable Suppressions
- Security vulnerabilities
- Data integrity issues
- Core functionality breaks
- User experience degradation

## Metrics and Monitoring

### Success Metrics
- Build success rate > 95%
- Security scan pass rate > 98%
- Code coverage > 80%
- Performance budget compliance

### Review Metrics
- Review completion time < 24h
- False positive rate < 10%
- Developer satisfaction scores
- Rollback frequency

## Integration Points

### Existing Tools
- Vercel deployment pipeline
- GitHub Actions CI/CD
- ESLint + Prettier
- TypeScript compiler
- Husky + lint-staged

### New Integrations
- Agent review lanes
- Security scanning
- Memory system
- Orchestration framework

## Risk Assessment

### High Risk Areas
- Payment processing (if applicable)
- User authentication
- Data export functionality
- External API integrations

### Medium Risk Areas
- Content management
- SEO data integrity
- Performance optimizations
- Third-party integrations

### Low Risk Areas
- UI styling changes
- Content updates
- Documentation
- Development tooling

## Baseline Exceptions

### Known Issues
- Legacy redirect handling (308 -> 301 migration)
- Rich results compliance (ongoing improvement)
- Image optimization (batch processing needed)

### Technical Debt
- Monolithic data file structure
- Component prop drilling
- Inconsistent error handling
- Limited test coverage

## Review and Updates

This baseline will be reviewed:
- Monthly for metric accuracy
- After major feature releases
- Following security incidents
- When tools or stack change

Last updated: 2026-05-07
Next review: 2026-06-07