2# 🤖 Agent Stack - Quick Access Guide

Your one-stop command center for the SiteOptz multi-agent engineering workflow.

## 🚀 Quick Commands

### Core Agent Workflows
```bash
# 🧠 Memory & Planning
npm run agent:memory:check        # Cross-session project memory
npm run agent:plan               # Interactive planning assistant

# 🔍 Five-Lane Code Review
npm run agent:review             # Run all review lanes
npm run agent:review:ci          # CI mode (non-interactive)
npm run agent:self-review        # Self-review checklist

# 🔒 Security Scanning
npm run agent:security           # Interactive security scan
npm run agent:security:ci        # CI mode security scan

# 🎨 UI/Design Quality
npm run agent:ui-review          # Frontend design review

# 🎯 Multi-Role Orchestration
npm run agent:orchestrate        # CEO/EM/QA/Release coordination

# 📋 Suppression Management
npm run agent:suppressions:parse      # Parse markdown suppressions
npm run agent:suppressions:validate   # Validate all suppressions
```

## 🎭 The Six Agents

### 1. 🧠 **Memory Agent** - Cross-Session Context
**Purpose**: Maintains project knowledge across sessions  
**Command**: `npm run agent:memory:check`  
**What it does**:
- Tracks project context and requirements
- Maintains technical debt inventory
- Provides session continuity
- Monitors critical project metrics

**When to use**: 
- Start of each work session
- After major changes
- When onboarding team members

---

### 2. 📋 **Planning Agent** - Obra Superpowers
**Purpose**: Plan → Tests → Implement → Review discipline  
**Command**: `npm run agent:plan`  
**What it does**:
- Creates structured implementation plans
- Generates test scenarios
- Enforces process gates for protected paths
- Tracks planning artifacts

**When to use**:
- Before starting new features
- Changes to auth/payments/PII
- Non-trivial implementations (>50 lines)

---

### 3. 🔍 **Review Agent** - Five-Lane Analysis
**Purpose**: Comprehensive parallel code review  
**Command**: `npm run agent:review`  
**What it does**:
- **Correctness Lane**: Bugs, types, functionality
- **Architecture Lane**: Design patterns, structure
- **Style Lane**: Code style, conventions
- **Performance Lane**: Optimization opportunities
- **Regression Lane**: Historical context, breaking changes

**When to use**:
- Before commits to main
- PR reviews
- Post-implementation validation

---

### 4. 🔒 **Security Agent** - Vulnerability Scanner
**Purpose**: Secret detection and security analysis  
**Command**: `npm run agent:security`  
**What it does**:
- Scans for hardcoded secrets
- Checks dependency vulnerabilities
- Analyzes insecure code patterns
- Validates file permissions

**When to use**:
- Before every commit
- Adding new dependencies
- Deploying to production
- Security audits

---

### 5. 🎨 **Design Agent** - Frontend Quality
**Purpose**: UI/UX consistency and accessibility  
**Command**: `npm run agent:ui-review`  
**What it does**:
- Enforces design system tokens
- Validates accessibility standards
- Checks component consistency
- Reviews user experience flows

**When to use**:
- UI component changes
- New page implementations
- Accessibility reviews
- Design system updates

---

### 6. 🎯 **Orchestration Agent** - gStack Release
**Purpose**: Multi-role coordination without auto-deploy  
**Command**: `npm run agent:orchestrate`  
**What it does**:
- CEO perspective: Business impact
- EM perspective: Resource planning
- QA perspective: Testing strategy
- Release perspective: Deployment readiness

**When to use**:
- Release planning
- Feature launch coordination
- Cross-team alignment
- Production deployments

## 📊 Dashboard Commands

### System Status
```bash
# Quick health check
npm run agent:memory:check && npm run agent:review && npm run agent:security

# Full system validation
npm run agent:suppressions:validate && \
npm run agent:memory:check && \
npm run agent:review:ci && \
npm run agent:security:ci && \
npm run agent:ui-review
```

### Reporting
```bash
# View latest reports
cat docs/agent-stack/generated/reviews/latest-review.json
cat docs/agent-stack/generated/security/latest-security.json

# Open generated reports directory
open docs/agent-stack/generated/
```

## 🛠 Configuration Files

| File | Purpose |
|------|---------|
| `docs/agent-stack/ENFORCEMENT_POLICY.md` | Blocking vs advisory rules |
| `docs/agent-stack/security-suppressions.md` | Security rule exceptions |
| `docs/agent-stack/review-suppressions.md` | Review rule exceptions |
| `docs/agent-stack/ui-suppressions.md` | UI rule exceptions |
| `docs/agent-stack/suppression.schema.json` | Validation schema |

## 🎯 Typical Workflows

### 🚀 **Starting New Feature**
```bash
npm run agent:memory:check     # Get project context
npm run agent:plan            # Create implementation plan
# ... implement feature ...
npm run agent:review          # Comprehensive review
npm run agent:security        # Security check
npm run agent:ui-review       # UI validation
```

### 🔒 **Pre-Commit Security Check**
```bash
npm run agent:security        # Full security scan
npm run agent:suppressions:validate  # Check suppressions
```

### 📦 **Pre-Release Validation**
```bash
npm run agent:orchestrate     # Multi-role coordination
npm run agent:review:ci       # Final review
npm run agent:security:ci     # Security validation
npm run build                 # Ensure builds pass
```

### 🩺 **Daily Health Check**
```bash
npm run agent:memory:check    # Project health
npm run agent:suppressions:validate  # Suppression hygiene
```

## 🚨 Emergency Commands

### Bypass Protection (Use Sparingly)
```bash
# Skip all checks (emergency only)
CI_SKIP_AGENTS=true npm run build

# Security emergency suppression (24h)
echo "## SEC-EMERGENCY" >> docs/agent-stack/security-suppressions.md
```

### Rollback Agent Stack
```bash
# See rollback instructions
cat docs/agent-stack/ROLLBACK.md
```

## 📈 Monitoring & Metrics

### Key Metrics Dashboard
- **Security Status**: Critical/High/Medium/Low issues
- **Review Coverage**: Lanes passed/failed
- **Suppression Health**: Active/Expired/Overdue
- **Memory Integrity**: Context completeness

### Alert Thresholds
- 🔴 **Critical**: >0 critical security issues
- 🟠 **High**: >10 high-priority issues
- 🟡 **Medium**: >5 review failures
- 🔵 **Info**: Suppression expiring in 7 days

## 🎓 Team Training

### New Team Member Setup
1. Read this file
2. Run `npm run agent:memory:check`
3. Review `docs/agent-stack/ENFORCEMENT_POLICY.md`
4. Practice with `npm run agent:plan`

### Advanced Usage
- Custom suppression creation
- Multi-agent orchestration
- CI/CD integration patterns
- Performance optimization

## 🔗 Related Documentation

- [Agent Stack README](docs/agent-stack/README.md) - Detailed documentation
- [Enforcement Policy](docs/agent-stack/ENFORCEMENT_POLICY.md) - Rules and phases
- [Rollback Guide](docs/agent-stack/ROLLBACK.md) - Emergency procedures
- [SiteOptz Claude Guide](CLAUDE.md) - Project-specific instructions

---

**💡 Pro Tip**: Bookmark this file and use it as your daily workflow reference. All agents are designed to work together for maximum development velocity and quality.

**🆘 Need Help?**: Run `npm run agent:orchestrate` for multi-perspective guidance on complex decisions.