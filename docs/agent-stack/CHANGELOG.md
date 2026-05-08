# Agent Stack Changelog

All notable changes to the agent stack configuration will be documented in this file.

## [1.0.0] - 2026-05-07

### Added
- Initial agent stack implementation
- Five-lane code review system (correctness, architecture, style, performance, regression)
- Security scanning with secret detection
- Frontend design quality enforcement
- Cross-session memory system
- Multi-role orchestration (gStack)
- Suppression management pipeline
- CI/CD integration with GitHub Actions
- Standard templates for planning and self-review

### Security
- Secret scanning enabled in warn-only mode
- Vulnerability scanning for dependencies
- Baseline security suppressions framework

### Changed
- Added agent-specific npm scripts to package.json
- Created standardized directory structure under docs/agent-stack/
- Configured enforcement policies (initially warn-only)

### Notes
- All enforcement starts in warn-only mode
- Progressive rollout planned per ENFORCEMENT_POLICY.md
- Rollback procedures documented in ROLLBACK.md