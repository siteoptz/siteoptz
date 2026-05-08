# 🎯 Cursor + Agent Stack - Complete Guide

Your step-by-step guide for using the agent stack with **Cursor AI** editor.

## 🔍 What You're Using

- **Editor**: Cursor (AI-powered VS Code fork)
- **Location**: `/Applications/Cursor.app/`
- **Features**: Built-in AI chat, VS Code compatibility
- **Agent Stack**: Fully implemented and ready

## 📋 Working Reference Card for Cursor

| Task | Method | Exact Steps |
|------|--------|-------------|
| **Command Palette** | `Cmd + Shift + P` | 1. Press Cmd + Shift + P<br>2. Command palette opens (not Perplexity!)<br>3. Type your command |
| **Agent Tasks Menu** | Menu or Shortcut | 1. View → Command Palette<br>2. Type "Tasks: Run Task"<br>3. Select your agent |
| **Open Agent Stack Guide** | `Cmd + K, A` | 1. Press Cmd + K (release)<br>2. Press A<br>3. File opens |
| **Open Claude Guide** | `Cmd + K, C` | 1. Press Cmd + K (release)<br>2. Press C<br>3. File opens |
| **Terminal** | `Cmd + J` | 1. Press Cmd + J<br>2. Terminal toggles open/closed |
| **Cursor AI Chat** | `Cmd + L` | 1. Press Cmd + L<br>2. AI chat opens in sidebar |

## 🎯 Cursor-Specific Instructions

### 1. Access Command Palette (The Right Way)

**In Cursor, you have two main interfaces:**

#### Option A: Command Palette (`Cmd + Shift + P`)
1. Press `Cmd + Shift + P`
2. **If this opens Perplexity**: That's a system conflict
3. **If this opens Cursor's Command Palette**: Perfect! Type "Tasks"

#### Option B: Menu Method (Always Works)
1. Click **View** in the menu bar
2. Click **Command Palette...**
3. Type "Tasks: Run Task"

### 2. Running Agent Tasks in Cursor

**Method 1: Via Command Palette**
1. `Cmd + Shift + P` (or View → Command Palette)
2. Type: `Tasks: Run Task`
3. Select from your agent options:
   - Agent Memory Check
   - Agent Review
   - Agent Security
   - Agent UI Review
   - All Agents Health Check

**Method 2: Via Terminal**
1. `Cmd + J` to open terminal
2. Run directly:
   ```bash
   npm run agent:memory:check
   npm run agent:review
   npm run agent:security
   npm run agent:ui-review
   ```

### 3. File Access Shortcuts (Should Work)

#### Agent Stack Guide
- `Cmd + K, A` → Opens AGENT_STACK.md
- Or: Command Palette → "Open Agent Stack Guide"

#### Claude Guide  
- `Cmd + K, C` → Opens CLAUDE.md
- Or: Command Palette → "Open Claude Guide"

### 4. Cursor AI Integration

**Bonus: Use Cursor's AI with Your Agent Stack!**

1. **Open a file** (like AGENT_STACK.md)
2. **Press `Cmd + L`** to open Cursor AI chat
3. **Ask questions** like:
   - "Explain the agent memory check process"
   - "What's the best workflow for security scanning?"
   - "Help me understand the five-lane review system"

## 🔧 Troubleshooting Cursor Issues

### Issue: `Cmd + Shift + P` Opens Perplexity
**Solution**: Use the menu instead
1. Click **View** → **Command Palette**
2. Type your command

### Issue: Shortcuts Don't Work
**Possible causes**:
- Cursor has different default shortcuts than VS Code
- System shortcuts interfering

**Solutions**:
1. Use **View** menu for Command Palette
2. Use **Terminal** (`Cmd + J`) for direct commands
3. Use Cursor's AI chat (`Cmd + L`) for guidance

### Issue: Tasks Don't Show Up
1. Make sure you're in the project directory
2. Check terminal: `pwd` (should show `/Users/siteoptz/siteoptz`)
3. Try running directly: `npm run agent:memory:check`

## 🚀 Recommended Cursor + Agent Workflow

### Daily Startup Sequence
1. **Open Cursor** with your project
2. **Press `Cmd + J`** → Terminal opens
3. **Run**: `npm run agent:memory:check`
4. **Review results** and plan your work

### Before Committing Code
1. **Press `Cmd + Shift + P`** → Command Palette
2. **Type**: "Tasks: Run Task"
3. **Run**: Agent Review
4. **Run**: Agent Security
5. **Address any issues** found

### Working with Cursor AI
1. **Press `Cmd + L`** → AI chat opens
2. **Ask**: "Review my agent stack setup"
3. **Get AI guidance** on agent recommendations

## 📱 Alternative Methods (If Shortcuts Fail)

### Menu-Based Access
1. **View** → **Command Palette** → Type command
2. **Terminal** → **New Terminal** → Run npm commands
3. **File** → **Open** → Navigate to files manually

### Direct Terminal Commands
```bash
# Quick agent commands
npm run agent:memory:check
npm run agent:review  
npm run agent:security
npm run agent:ui-review

# Open files
cursor AGENT_STACK.md
cursor CLAUDE.md
```

## ✅ Test Your Cursor Setup

Try this sequence to verify everything works:

### Test 1: Command Palette
1. **Click View → Command Palette**
2. **Type "Tasks"** 
3. **See if "Tasks: Run Task" appears**

### Test 2: File Shortcuts
1. **Try `Cmd + K, A`** 
2. **Should open AGENT_STACK.md**

### Test 3: Terminal
1. **Press `Cmd + J`**
2. **Should open/close terminal**
3. **Type**: `npm run agent:memory:check`

### Test 4: Cursor AI
1. **Press `Cmd + L`**
2. **Should open AI chat**
3. **Ask**: "What are the agent stack commands?"

## 🎓 Cursor Pro Tips

1. **Use Cursor AI** (`Cmd + L`) to get help with agent output
2. **Pin important tabs** (right-click → Pin Tab)
3. **Use terminal** (`Cmd + J`) for quick agent commands
4. **Leverage AI chat** for understanding agent recommendations

## 📞 Quick Help

**If you get stuck:**
1. **Use the menu**: View → Command Palette
2. **Use terminal**: `Cmd + J` then type npm commands
3. **Ask Cursor AI**: `Cmd + L` then ask for help

**Emergency commands** (always work in terminal):
```bash
npm run agent:memory:check
npm run agent:review
npm run agent:security
open AGENT_STACK.md
```

---

**💡 Pro Tip**: Cursor combines VS Code functionality with AI assistance. Use both the agent stack AND Cursor's AI for maximum productivity!