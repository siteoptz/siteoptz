# 🚀 Portable Agent Stack Setup Guide

Yes! You can use this agent stack on **every single project**. Here's how to set it up universally.

## 🎯 What You Can Reuse

✅ **Agent Scripts** - All 6 agents work on any codebase  
✅ **VS Code Configuration** - Keybindings, tasks, settings  
✅ **Documentation** - Guides, policies, schemas  
✅ **Workflow** - Same commands across all projects  
✅ **CI Integration** - GitHub Actions for any repo  

## 📋 Quick Setup for New Projects

### Method 1: Copy from SiteOptz (Recommended)

```bash
# Navigate to your new project
cd /path/to/new-project

# Copy agent stack files
cp -r /Users/siteoptz/siteoptz/docs/agent-stack docs/
cp -r /Users/siteoptz/siteoptz/scripts/agent scripts/
cp -r /Users/siteoptz/siteoptz/.vscode .vscode/

# Copy guide files
cp /Users/siteoptz/siteoptz/AGENT_STACK.md .
cp /Users/siteoptz/siteoptz/SIMPLE_VSCODE_GUIDE.md .
```

### Method 2: Manual Setup

1. **Create directories**:
   ```bash
   mkdir -p docs/agent-stack scripts/agent .vscode
   ```

2. **Copy key files from SiteOptz**:
   - `docs/agent-stack/` (entire directory)
   - `scripts/agent/` (entire directory)  
   - `.vscode/keybindings.json`
   - `.vscode/settings.json`
   - `.vscode/tasks.json`

## 📦 Add Agent Scripts to Any package.json

Add these to your project's `package.json`:

```json
{
  "scripts": {
    "agent:memory:check": "node scripts/agent/memory-check.js",
    "agent:plan": "node scripts/agent/plan.js",
    "agent:self-review": "node scripts/agent/self-review.js", 
    "agent:review": "node scripts/agent/review.js",
    "agent:review:ci": "node scripts/agent/review-ci.js",
    "agent:security": "node scripts/agent/security.js",
    "agent:security:ci": "node scripts/agent/security-ci.js",
    "agent:ui-review": "node scripts/agent/ui-review.js",
    "agent:orchestrate": "node scripts/agent/orchestrate.js",
    "agent:suppressions:parse": "node scripts/agent/suppressions-parser.js --strict=false",
    "agent:suppressions:validate": "node scripts/agent/suppressions-parser.js && node scripts/agent/validate-suppressions.js"
  },
  "devDependencies": {
    "ajv": "^8.12.0",
    "ajv-formats": "^2.1.0"
  }
}
```

## 🔧 Project-Specific Customization

### 1. Update Project Context

Edit `docs/agent-stack/memory-bootstrap.md`:
```markdown
# Project: [Your Project Name]
# Purpose: [Brief description]
# Tech Stack: [Technologies used]
# Key Requirements: [Project-specific needs]
```

### 2. Customize Suppressions

Update suppression files for your project:
- `docs/agent-stack/security-suppressions.md`
- `docs/agent-stack/review-suppressions.md`
- `docs/agent-stack/ui-suppressions.md`

### 3. Adjust Enforcement Policy

Modify `docs/agent-stack/ENFORCEMENT_POLICY.md` for your project's needs:
- Risk tolerance
- Team size
- Deployment frequency
- Compliance requirements

## 🌍 Universal Patterns

### Any Language/Framework
The agent stack works with:
- **JavaScript/TypeScript** (Node.js, React, Vue, etc.)
- **Python** (Django, Flask, FastAPI, etc.)
- **Java** (Spring, Maven, Gradle, etc.) 
- **C#** (.NET, ASP.NET, etc.)
- **Go** (any Go project)
- **PHP** (Laravel, Symfony, etc.)
- **Ruby** (Rails, Sinatra, etc.)

### Any Project Size
- **Personal projects** - Simplified enforcement
- **Team projects** - Full workflow with reviews
- **Enterprise projects** - Strict governance mode
- **Open source** - Community-friendly policies

### Any Environment
- **Local development** - Interactive agents
- **CI/CD pipelines** - Automated CI modes
- **Production** - Release governance
- **Multiple environments** - Environment-specific configs

## 🚀 Quick Test Setup

After copying files to a new project:

```bash
# Install dependencies
npm install

# Test agents
npm run agent:memory:check
npm run agent:review
npm run agent:security

# Open VS Code with agent stack
code AGENT_STACK.md
```

## 🎯 Project Types & Configurations

### Frontend Projects (React, Vue, Angular)
- Enable UI review agent
- Focus on accessibility checks
- Component design consistency
- Performance monitoring

### Backend APIs (Node.js, Python, etc.) 
- Emphasize security scanning
- API design review
- Database query analysis
- Authentication checks

### Full-Stack Projects
- All agents enabled
- Cross-layer security checks
- Integration testing focus
- End-to-end review

### Mobile Apps (React Native, Flutter)
- UI/UX agent focused on mobile patterns
- Performance-critical security
- Platform-specific considerations
- App store compliance

## 📊 Global Agent Configuration

Create a global config file for consistency across projects:

```bash
# ~/.agent-stack-global
export AGENT_STACK_ENFORCEMENT_LEVEL="warn"  # warn|enforce
export AGENT_STACK_REVIEW_MODE="full"        # quick|full
export AGENT_STACK_SECURITY_LEVEL="strict"   # normal|strict
```

## ✅ Migration Checklist

When adding to existing projects:

- [ ] Copy agent stack files
- [ ] Add npm scripts
- [ ] Install dependencies  
- [ ] Update project context
- [ ] Customize suppressions
- [ ] Test all agents
- [ ] Train team on workflow
- [ ] Integrate with CI/CD
- [ ] Document project-specific setup

## 🎉 Benefits of Universal Agent Stack

### Consistency
- Same workflow across all projects
- Standardized quality gates
- Familiar commands and shortcuts
- Shared team knowledge

### Efficiency  
- No setup time for new projects
- Reusable configurations
- Automated quality checks
- Reduced manual reviews

### Quality
- Comprehensive coverage
- Multiple review perspectives
- Security by default
- Continuous improvement

### Scalability
- Works for 1 developer or 100+
- Adapts to project complexity
- Grows with your needs
- Enterprise-ready governance

---

**🎯 Bottom Line**: Set it up once, use it everywhere! The agent stack becomes your universal development companion across all projects and teams.