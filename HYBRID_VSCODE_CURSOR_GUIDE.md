# 🎯 VS Code in Cursor - Agent Stack Guide

Your complete guide for using the agent stack with **VS Code running within Cursor**.

## 🔍 Your Hybrid Setup

- **Main Editor**: Cursor (AI-powered)
- **Integrated Editor**: VS Code within Cursor
- **Agent Stack**: Configured for both environments
- **Best of Both Worlds**: VS Code familiarity + Cursor AI features

## 📋 Working Reference Card (Hybrid Setup)

| Task | Primary Method | Fallback Method | Notes |
|------|---------------|-----------------|--------|
| **Command Palette** | **View → Command Palette** | `F1` or Menu | Avoid Cmd+Shift+P conflicts |
| **Agent Tasks** | **Menu → Tasks** | Terminal commands | Most reliable method |
| **Terminal** | `Cmd + J` | View → Terminal | Opens/closes terminal |
| **Agent Stack Guide** | `Cmd + K, A` | Manual file open | Should work in both |
| **Claude Guide** | `Cmd + K, C` | Manual file open | Should work in both |
| **Cursor AI Chat** | `Cmd + L` | Sidebar AI icon | Cursor-specific feature |

## 🎯 Step-by-Step Instructions

### 1. Accessing Command Palette (Hybrid Method)

**Primary Method (Always Works):**
1. Click **View** in the menu bar
2. Click **Command Palette...**
3. Search box opens with ">" prompt
4. Type your command

**Alternative Method:**
1. Press `F1` (if not intercepted by system)
2. Command palette should open
3. Type your command

**What NOT to use:**
- `Cmd + Shift + P` (conflicts with Perplexity/system)

### 2. Running Agent Tasks

**Method A: Via Command Palette**
1. **View → Command Palette**
2. Type: `Tasks: Run Task`
3. Select from available tasks:
   - Agent Memory Check
   - Agent Review
   - Agent Security
   - Agent UI Review
   - All Agents Health Check

**Method B: Direct Terminal (Fastest)**
1. Press `Cmd + J` to open terminal
2. Run commands directly:
   ```bash
   npm run agent:memory:check    # Memory check
   npm run agent:review          # Five-lane review
   npm run agent:security        # Security scan
   npm run agent:ui-review       # UI/design review
   ```

**Method C: Using Cursor CLI**
```bash
cursor AGENT_STACK.md          # Open agent guide
npm run agent:memory:check     # Run agents
```

### 3. File Access Shortcuts

These should work in your hybrid setup:

#### Quick File Access
- `Cmd + K, A` → Opens AGENT_STACK.md
- `Cmd + K, C` → Opens CLAUDE.md
- `Cmd + K, P` → Opens package.json

#### Manual File Access
1. **File → Open** → Navigate to file
2. **Explorer panel** → Click on files
3. **Cursor AI** → Ask to open specific files

### 4. Cursor AI Integration with Agent Stack

**Leverage Cursor's AI for Agent Tasks:**

1. **Open Cursor AI Chat** (`Cmd + L`)
2. **Ask questions like:**
   - "Explain the output of my agent memory check"
   - "What should I do about these security findings?"
   - "Help me understand the five-lane review results"
   - "Create a plan based on these agent recommendations"

## 🔧 Hybrid Workflow Examples

### Daily Startup Workflow
1. **Open project in Cursor**
2. **Press `Cmd + J`** → Terminal opens
3. **Run**: `npm run agent:memory:check`
4. **Press `Cmd + L`** → Ask Cursor AI to summarize results
5. **Plan your work** based on AI + agent recommendations

### Pre-Commit Workflow
1. **View → Command Palette**
2. **Run**: Tasks: Run Task → Agent Review
3. **Run**: Tasks: Run Task → Agent Security
4. **Press `Cmd + L`** → Ask Cursor AI: "Review these agent findings"
5. **Address issues** with AI assistance

### Feature Development Workflow
1. **`Cmd + K, A`** → Open Agent Stack guide
2. **View → Command Palette** → Tasks: Run Task → Agent Plan
3. **Use Cursor AI** to refine the plan
4. **Implement feature**
5. **Run all agents** before committing

## 🚀 Testing Your Hybrid Setup

### Test Sequence 1: Basic Access
1. **Click View → Command Palette** ✓ Should open
2. **Type "Tasks"** ✓ Should show "Tasks: Run Task"
3. **Press Escape** to close

### Test Sequence 2: Terminal + Agents  
1. **Press `Cmd + J`** ✓ Terminal opens/closes
2. **Type**: `npm run agent:memory:check` ✓ Should run
3. **Check output** for agent results

### Test Sequence 3: File Shortcuts
1. **Press `Cmd + K, A`** ✓ Should open AGENT_STACK.md
2. **Press `Cmd + K, C`** ✓ Should open CLAUDE.md

### Test Sequence 4: Cursor AI Integration
1. **Press `Cmd + L`** ✓ Should open AI chat
2. **Ask**: "What are my agent stack commands?" ✓ Should respond
3. **Ask**: "Help me run a security scan" ✓ Should provide guidance

## 💡 Pro Tips for Your Hybrid Setup

### 1. Best Practices
- **Use terminal** (`Cmd + J`) for quick agent commands
- **Use View menu** when shortcuts conflict
- **Use Cursor AI** to interpret agent results
- **Pin important tabs** for quick access

### 2. Workflow Optimization
- **Keep AGENT_STACK.md pinned** as a reference tab
- **Use Cursor AI** to explain complex agent output
- **Combine agent findings** with AI-suggested improvements
- **Use split panels** to view code + agent results simultaneously

### 3. Troubleshooting
- **If shortcuts don't work**: Use View menu
- **If tasks don't appear**: Check you're in project directory
- **If commands fail**: Run manually in terminal
- **If confused**: Ask Cursor AI for help

## 🎯 Your Ultimate Hybrid Command Reference

### Quick Commands (Terminal)
```bash
# Agent commands
npm run agent:memory:check     # Project health
npm run agent:review          # Code review  
npm run agent:security        # Security scan
npm run agent:ui-review       # UI quality

# File access
cursor AGENT_STACK.md         # Open guide
cursor CLAUDE.md              # Open instructions
```

### Keyboard Shortcuts
```
Cmd + J                       # Toggle terminal
Cmd + L                       # Cursor AI chat
Cmd + K, A                    # Agent Stack guide
Cmd + K, C                    # Claude guide
F1                            # Command palette (backup)
```

### Menu Navigation
```
View → Command Palette        # Always works
View → Terminal              # Terminal access
File → Open                  # Manual file access
```

## ✅ Success Indicators

You'll know everything is working when:
- **View → Command Palette** opens search box with ">"
- **Cmd + J** toggles terminal open/closed
- **npm commands** run and show agent output
- **Cmd + L** opens Cursor AI chat
- **File shortcuts** open your guides instantly

Your hybrid VS Code-in-Cursor setup gives you the best of both worlds: familiar VS Code interface with powerful Cursor AI assistance! 🚀