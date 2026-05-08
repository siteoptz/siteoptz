## 🛡️ Security Scan Summary

**Status:** ❌ **BLOCKED**
**Security Status:** CRITICAL
**Enforcement Phase:** 1

### 🔍 Security Issues

| Severity | Count | Status |
|----------|-------|--------|
| 🔴 Blocking | 1308 | Build-blocking |
| ⚠️ Warning | 306 | Advisory |

### 🔍 Scanner Results

- 🔑 **secrets**: 1302 issue(s)
- 📦 **dependencies**: 15 issue(s)
- 🔍 **patterns**: 295 issue(s)
- 📁 **files**: 2 issue(s)

### 🚨 Blocking Security Issues

- **CRITICAL**: API Keys
  - 📁 `.env.ghl.example`:5
  - 🔍 Scanner: secrets
- **CRITICAL**: API Keys
  - 📁 `.env.ghl.example`:10
  - 🔍 Scanner: secrets
- **CRITICAL**: API Keys
  - 📁 `.env.ghl.example`:20
  - 🔍 Scanner: secrets
- **CRITICAL**: API Keys
  - 📁 `AI-TOOLS-SCRAPING-README.md`:69
  - 🔍 Scanner: secrets
- **CRITICAL**: API Keys
  - 📁 `AI_KIDS_CODING_PLATFORM_RECOMMENDATIONS.md`:604
  - 🔍 Scanner: secrets
- **CRITICAL**: API Keys
  - 📁 `CYFE_API_INTEGRATION_STEPS.md`:452
  - 🔍 Scanner: secrets
- **CRITICAL**: API Keys
  - 📁 `DEPLOYMENT.md`:46
  - 🔍 Scanner: secrets
- **CRITICAL**: API Keys
  - 📁 `EMAIL_SETUP_GUIDE.md`:9
  - 🔍 Scanner: secrets
- **CRITICAL**: API Keys
  - 📁 `ENVIRONMENT_SETUP.md`:23
  - 🔍 Scanner: secrets
- **CRITICAL**: API Keys
  - 📁 `GOHIGHLEVEL_INTEGRATION.md`:74
  - 🔍 Scanner: secrets

*... and 1298 more blocking issues*

### 💡 Security Recommendations

- 🔴 Address 249 critical security issue(s) immediately
- 🟠 Review and resolve 1108 high-risk security issue(s)
- 🟠 Move hardcoded secrets to environment variables
- 🟡 Update vulnerable dependencies

### 📋 Suppressions

4 active security suppressions applied.

---
*Security scan completed at 2026-05-08T00:31:44.659Z*
*Agent Stack Security Scanner v1.0.0*
