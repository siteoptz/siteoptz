# UI/Design Suppressions

This file manages UI and design-related suppressions for the SiteOptz agent stack.

**Last Updated**: 2026-05-07  
**Next Review**: 2026-05-21

## Active Suppressions

### UI-001 - Legacy Comparison Table Styling
- **Status**: active
- **Severity**: medium
- **Category**: design_system
- **Rule ID**: inconsistent-component-styling
- **Scope**: components/ComparisonTable/
- **Impacted Flows**: Tool comparison pages
- **Introduced**: 2026-05-07
- **Expiry**: 2026-07-07
- **Owner**: Design Team
- **Rationale**: Legacy comparison table uses custom styling that predates current design system. Refactoring requires UX research to maintain functionality while improving consistency.
- **Issue Link**: https://github.com/siteoptz/siteoptz-ai/issues/comparison-table-redesign
- **Last Reviewed**: 2026-05-07

### UI-002 - Accessibility Color Contrast Edge Cases
- **Status**: active
- **Severity**: low
- **Category**: accessibility
- **Rule ID**: color-contrast-ratio
- **Scope**: components/PricingCard/badge-elements
- **Impacted Flows**: Pricing display on tool detail pages
- **Introduced**: 2026-05-07
- **Expiry**: 2026-06-07
- **Owner**: Frontend Team
- **Rationale**: Some pricing badges use brand colors that slightly miss WCAG contrast targets. Brand guidelines take precedence for badge elements.
- **Issue Link**: https://github.com/siteoptz/siteoptz-ai/issues/pricing-badge-contrast
- **Last Reviewed**: 2026-05-07

### UI-003 - Mobile Navigation Complexity
- **Status**: active
- **Severity**: medium
- **Category**: mobile_experience
- **Rule ID**: mobile-nav-complexity
- **Scope**: components/Navigation/MobileNav.tsx
- **Impacted Flows**: Mobile site navigation
- **Introduced**: 2026-05-07
- **Expiry**: 2026-08-07
- **Owner**: UX Team
- **Rationale**: Mobile navigation includes many tool categories creating complex hierarchy. Simplification requires UX research and potential information architecture changes.
- **Issue Link**: https://github.com/siteoptz/siteoptz-ai/issues/mobile-nav-simplification
- **Last Reviewed**: 2026-05-07

## Resolved Suppressions

*No resolved suppressions yet*

## Suppression Guidelines

### Required Fields for UI Suppressions
- **Status**: Active/Resolved/Expired
- **Severity**: Critical/High/Medium/Low
- **Category**: Design System/Accessibility/Mobile Experience/Performance/User Flow
- **Rule ID**: Specific UI rule that was flagged
- **Scope**: Components or pages affected
- **Impacted Flows**: User journeys that are affected
- **Introduced**: Date when suppression was added
- **Expiry**: Maximum 60 days for active suppressions
- **Owner**: Person/team responsible for resolution
- **Rationale**: Design or UX justification for deferring the fix
- **Issue Link**: Link to tracking issue for resolution
- **Last Reviewed**: Date of most recent review

### UI Category Guidelines

#### Design System
- **Focus**: Component consistency, design token usage, brand compliance
- **Examples**: Inconsistent button styles, wrong color tokens, spacing violations
- **Max Expiry**: 60 days (design changes need careful planning)

#### Accessibility
- **Focus**: WCAG compliance, keyboard navigation, screen reader support
- **Examples**: Missing alt text, contrast issues, focus management
- **Max Expiry**: 30 days (a11y issues affect users immediately)

#### Mobile Experience
- **Focus**: Responsive design, touch targets, mobile-specific interactions
- **Examples**: Small touch targets, horizontal scroll, mobile navigation
- **Max Expiry**: 45 days (mobile issues impact large user base)

#### Performance
- **Focus**: Visual performance, animations, rendering efficiency
- **Examples**: Janky animations, layout shifts, heavy visual effects
- **Max Expiry**: 30 days (performance affects user experience)

#### User Flow
- **Focus**: Usability, information architecture, conversion optimization
- **Examples**: Confusing navigation, poor form design, unclear CTAs
- **Max Expiry**: 60 days (UX changes need research and testing)

### Severity Guidelines

#### Critical
- **Impact**: Blocks core user flows
- **Examples**: Broken checkout, inaccessible key features
- **Max Expiry**: 7 days

#### High
- **Impact**: Significantly degrades user experience
- **Examples**: Major accessibility violations, broken mobile experience
- **Max Expiry**: 14 days

#### Medium
- **Impact**: Noticeable but doesn't block functionality
- **Examples**: Design inconsistencies, minor accessibility issues
- **Max Expiry**: 30 days

#### Low
- **Impact**: Minor visual or interaction improvements
- **Examples**: Spacing inconsistencies, minor animation issues
- **Max Expiry**: 60 days

### Review Process

1. **Weekly Review** (Critical/High)
   - Check if blocking user flows
   - Prioritize based on user impact
   - Coordinate with UX research if needed

2. **Bi-weekly Review** (Medium)
   - Assess design system impact
   - Consider bundling with related changes
   - Validate with design team

3. **Monthly Review** (Low)
   - Check if still relevant
   - Consider including in next design sprint
   - Archive if no longer applicable

### SiteOptz-Specific UI Standards

#### Dark Theme Compliance
All new components must use:
- Background: `bg-gradient-to-br from-black via-gray-900 to-black`
- Cards: `bg-black border border-gray-800`
- Text: Primary `text-white`, Secondary `text-gray-300/400`
- Buttons: `bg-gradient-to-r from-blue-600 to-purple-600`

#### Component Consistency
- Follow existing component patterns in `/components/`
- Use Tailwind utility classes consistently
- Maintain responsive breakpoints: sm, md, lg, xl, 2xl

#### Accessibility Standards
- Minimum contrast ratio 4.5:1 for normal text
- Minimum touch target size 44px
- Keyboard navigation support for all interactive elements
- Screen reader friendly markup and ARIA labels

### Adding New Suppressions

1. **Assess User Impact**: How does this affect user experience?
2. **Design Review**: Get input from design team
3. **Research Needs**: Does this require UX research?
4. **Create Issue**: Link to tracking issue with design mocks if needed
5. **Set Timeline**: Based on complexity and user impact
6. **Assign Owner**: Design or frontend team member

### Common Suppression Patterns

#### Design System Migration
When migrating to new design system:
- Batch related components together
- Plan migration phases
- Maintain visual consistency during transition

#### Accessibility Improvements
For a11y issues:
- Prioritize by user impact
- Consider temporary workarounds
- Test with actual screen readers

#### Mobile Optimization
For mobile issues:
- Test on actual devices
- Consider progressive enhancement
- Validate touch interaction patterns

## Monitoring

### Metrics
- **Active Suppressions by Category**: Target < 8 per category
- **Critical/High Suppressions**: Target = 0
- **Average Resolution Time**: Target < 30 days
- **User Impact Score**: Track severity × affected user count

### Alerts
- Critical UI suppression added
- Suppression expires in 7 days
- Accessibility violation in core user flow
- Multiple suppressions in same component

### Testing Integration

#### Automated Testing
- Visual regression testing for suppressed components
- Accessibility scanning with exceptions
- Mobile viewport testing
- Performance monitoring

#### Manual Testing
- Regular accessibility audits
- Mobile device testing
- Design system compliance reviews
- User flow validation

## Resources

### Design System
- **Figma Library**: [Link to design system]
- **Component Library**: `/components/` directory
- **Design Tokens**: `tailwind.config.js`

### Accessibility
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
- **Testing Tools**: axe-core, WAVE, screen readers
- **Internal Guidelines**: `docs/accessibility-guidelines.md`

### Mobile Testing
- **Device Lab**: [Testing device list]
- **Emulation**: Chrome DevTools device mode
- **Real Device Testing**: BrowserStack/Sauce Labs

## Contact

For questions about UI/design suppressions:
- **Design Team**: design@siteoptz.ai
- **Frontend Team**: frontend@siteoptz.ai
- **Accessibility**: a11y@siteoptz.ai
- **UX Research**: ux-research@siteoptz.ai