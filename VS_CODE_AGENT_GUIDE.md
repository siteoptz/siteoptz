# 🎯 VS Code + Agent Stack - Step-by-Step Guide

Your complete guide to using the agent stack with VS Code on macOS.

## 🚀 Quick Start Checklist

- ✅ VS Code installed in Applications
- ✅ Agent stack implemented
- ✅ Custom keybindings configured
- ✅ Working shortcuts identified

## 📋 Working Reference Card

| Task | Method | Exact Steps |
|------|--------|-------------|
| **Open Command Palette** | `Cmd + ;` | 1. Press Cmd + ;<br>2. Command palette opens at top |
| **Run Agent Tasks** | `Cmd + Shift + ;` | 1. Press Cmd + Shift + ;<br>2. Select your agent directly |
| **Open Agent Stack Guide** | `Cmd + K, A` | 1. Press Cmd + K (release)<br>2. Press A<br>3. File opens |
| **Open Claude Guide** | `Cmd + K, C` | 1. Press Cmd + K (release)<br>2. Press C<br>3. File opens |
| **Quick Agent Memory** | `Cmd + Shift + A, M` | 1. Press Cmd + Shift + A (release)<br>2. Press M<br>3. Task runs |
| **Quick Agent Review** | `Cmd + Shift + A, R` | 1. Press Cmd + Shift + A (release)<br>2. Press R<br>3. Task runs |
| **Quick Agent Security** | `Cmd + Shift + A, S` | 1. Press Cmd + Shift + A (release)<br>2. Press S<br>3. Task runs |
| **Quick Agent UI Review** | `Cmd + Shift + A, U` | 1. Press Cmd + Shift + A (release)<br>2. Press U<br>3. Task runs |

## 🎯 Detailed Step-by-Step Instructions

### 1. Opening the Command Palette

**Goal**: Access VS Code's command palette to run tasks

**Steps**:
1. Make sure VS Code is the active window (click on it)
2. Press `Cmd + ;` (hold Cmd, press semicolon, release both)
3. You should see a search box at the top with ">" symbol
4. This is the Command Palette

**What you'll see**:
```
> 
```

**If it doesn't work**: Click "View" in the menu bar → "Command Palette"

### 2. Running Agent Tasks via Command Palette

**Goal**: Run any agent (memory, review, security, UI) through VS Code

**Steps**:
1. Press `Cmd + Shift + ;` to open Tasks directly (FASTER!)
   OR
   Press `Cmd + ;` to open Command Palette, then type "Tasks: Run Task"
2. You'll see your agent tasks immediately
4. You'll see a list of available tasks:
   - Agent Memory Check
   - Agent Review
   - Agent Security
   - Agent UI Review
   - All Agents Health Check
5. Use arrow keys to select the task you want
6. Press Enter to run it

**What you'll see**:
```
> Tasks: Run Task
  Tasks: Run Task
  ...other options...
```

Then:
```
Select the task to run:
> Agent Memory Check
  Agent Review  
  Agent Security
  Agent UI Review
  All Agents Health Check
```

### 3. Opening Files with Keyboard Shortcuts

#### Agent Stack Guide (`Cmd + K, A`)
**Steps**:
1. Press and hold `Cmd`
2. Press `K` (while holding Cmd)
3. Release both keys
4. Press `A`
5. The AGENT_STACK.md file opens

#### Claude Guide (`Cmd + K, C`)
**Steps**:
1. Press and hold `Cmd`
2. Press `K` (while holding Cmd)
3. Release both keys
4. Press `C`
5. The CLAUDE.md file opens

### 4. Quick Agent Commands (Multi-Key Shortcuts)

#### Agent Memory Check (`Cmd + Shift + A, M`)
**Steps**:
1. Press and hold `Cmd + Shift`
2. Press `A` (while holding Cmd + Shift)
3. Release all keys
4. Press `M`
5. Agent memory check runs in terminal

#### Agent Review (`Cmd + Shift + A, R`)
**Steps**:
1. Press and hold `Cmd + Shift`
2. Press `A` (while holding Cmd + Shift)
3. Release all keys
4. Press `R`
5. Five-lane code review runs

#### Agent Security (`Cmd + Shift + A, S`)
**Steps**:
1. Press and hold `Cmd + Shift`
2. Press `A` (while holding Cmd + Shift)
3. Release all keys
4. Press `S`
5. Security scan runs

#### Agent UI Review (`Cmd + Shift + A, U`)
**Steps**:
1. Press and hold `Cmd + Shift`
2. Press `A` (while holding Cmd + Shift)
3. Release all keys
4. Press `U`
5. UI/design review runs

## 🎯 Common Workflows

### Daily Workflow: Check Project Health
1. Open VS Code
2. `Cmd + K, A` → Opens Agent Stack guide for reference
3. `Cmd + Shift + A, M` → Run memory check
4. `Cmd + Shift + A, R` → Run code review
5. `Cmd + Shift + A, S` → Run security scan

### Before Committing Code
1. `Cmd + Shift + A, R` → Review your changes
2. `Cmd + Shift + A, S` → Security check
3. If UI changes: `Cmd + Shift + A, U` → UI review

### Working on New Feature
1. `Cmd + K, A` → Open Agent Stack guide
2. `Cmd + J` → Command palette
3. Type "Tasks: Run Task" → Select "Agent Plan"
4. Follow the planning process

## 🔧 Troubleshooting

### Command Palette Doesn't Open with Cmd + J
**Solution**: 
- Click "View" in menu bar → "Command Palette"
- Or try clicking inside the VS Code editor first, then `Cmd + J`

### Shortcuts Don't Work
**Possible causes**:
- Other apps intercepting shortcuts (like Perplexity)
- VS Code not in focus
- Typing too fast between key sequences

**Solutions**:
1. Make sure VS Code is the active window
2. Use slower, deliberate key presses
3. Fall back to Command Palette method: `Cmd + J` → type command

### Tasks Don't Show Up
**Solution**:
1. Make sure you're in the project directory
2. Check that .vscode/tasks.json exists
3. Reload VS Code window: `Cmd + J` → "Developer: Reload Window"

### Agent Commands Fail
**Solution**:
1. Open terminal in VS Code: `View` → `Terminal`
2. Run manually: `npm run agent:memory:check`
3. Check for errors in terminal output

## 📱 Alternative Methods (If Shortcuts Don't Work)

### Menu Bar Method
1. **View** → **Command Palette** → Type task name
2. **Terminal** → **New Terminal** → Type npm commands manually

### Right-Click Method
1. Right-click in file explorer
2. Look for task options
3. Or open terminal and run commands

### Mouse-Only Method
1. Click **View** menu
2. Click **Command Palette**
3. Type and select task
4. Click to run

## ✅ Success Indicators

When everything is working correctly, you should see:

### Command Palette Opens (`Cmd + J`)
```
>
```
A search box appears at the top of VS Code

### Tasks Run Successfully
```
🔍 Starting five-lane code review...
✅ correctness lane completed
✅ architecture lane completed
...
```

### Files Open Correctly
- AGENT_STACK.md opens with full guide
- CLAUDE.md opens with project instructions

## 🎓 Practice Session

Try this sequence to verify everything works:

1. `Cmd + J` (should open Command Palette)
2. Type "reload" and select "Developer: Reload Window"
3. `Cmd + K, A` (should open Agent Stack guide)
4. `Cmd + Shift + A, M` (should run memory check)
5. `Cmd + J`, type "Tasks", select agent review

If all these work, you're fully set up! 🎉

## 📞 Quick Help

**Stuck?** Try this emergency sequence:
1. Click "View" menu
2. Click "Command Palette"
3. Type "Tasks: Run Task"
4. Select your agent

**Still stuck?** Use terminal:
```bash
npm run agent:memory:check
npm run agent:review
npm run agent:security
```

---

**💡 Pro Tip**: Keep this guide pinned as a tab in VS Code for quick reference!†