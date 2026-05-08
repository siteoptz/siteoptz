# ✅ Simple VS Code Agent Guide (What Actually Works)

Your no-nonsense guide for VS Code + Agent Stack with working shortcuts.

## 🎯 What We Know Works

- `Cmd + J` → Terminal toggle ✅
- Terminal commands work ✅  
- Menu access works ✅

## 📋 Your Working Methods

### **Method 1: Menu Access (100% Reliable)**
1. **View → Command Palette** 
2. **Type "Tasks: Run Task"**
3. **Select your agent**

### **Method 2: Terminal Commands (Fast & Direct)**
1. **Press `Cmd + J`** to open terminal
2. **Run directly**:
   ```bash
   npm run agent:memory:check    # Memory & health check
   npm run agent:review          # Five-lane code review  
   npm run agent:security        # Security scan
   npm run agent:ui-review       # UI/design review
   ```

### **Method 3: File Access**
- **File → Open** → Navigate to AGENT_STACK.md
- **File → Open** → Navigate to CLAUDE.md  
- **Explorer panel** → Click on files

## 🚀 Quick Agent Access

### Daily Workflow
```bash
# Open terminal (Cmd + J), then run:
npm run agent:memory:check     # Start with health check
npm run agent:review          # Review your code
npm run agent:security        # Check for security issues
```

### File Access  
```bash
# Open files directly:
code AGENT_STACK.md          # Full agent guide
code CLAUDE.md               # Project instructions
```

## ✅ Test Your New Setup

**Test 1: Menu Method (✅ WORKS)**  
1. Click **View → Command Palette**
2. Type "Tasks: Run Task"
3. Do you see agent options?

**Test 3: Terminal Method**
1. Press `Cmd + J` (terminal opens)
2. Type `npm run agent:memory:check`
3. Does it run successfully?

## 🎯 Your Reliable Daily Commands

Since `Cmd + J` + terminal works perfectly, use these:

```bash
# Health check
npm run agent:memory:check

# Before committing
npm run agent:review && npm run agent:security

# Open guides  
code AGENT_STACK.md
code CLAUDE.md

# All agents health check
npm run agent:memory:check && npm run agent:review && npm run agent:security && npm run agent:ui-review
```

## 💡 Pro Tips

1. **Bookmark this file** - it's your working reference
2. **Use terminal method** when shortcuts fail
3. **Use menu method** as backup
4. **Test new shortcuts** after VS Code restart

## 🔧 If Something Doesn't Work

**Fallback sequence:**
1. `Cmd + J` → terminal → `npm run agent:memory:check`
2. View → Command Palette → "Tasks: Run Task"  
3. File → Open → navigate to AGENT_STACK.md

**Emergency commands (always work):**
```bash
npm run agent:memory:check
npm run agent:review
npm run agent:security
open AGENT_STACK.md
```

Your setup is now simplified and reliable! 🎉