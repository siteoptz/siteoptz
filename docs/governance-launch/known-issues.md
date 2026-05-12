# Known Issues - Governance Launch

## Test Suite Failure

**Issue**: Integration test suite is broken due to a chalk.red dependency issue. Pre-existing as of governance launch branch.

**Error**: `TypeError: chalk.red is not a function` in `/scripts/test-integration.js:397:25`

**Impact**: Cannot run automated tests during PR review. This blocks the standard `npm test` command from completing successfully.

**Workaround**: Manual verification on Vercel preview deployments for functionality testing.

**Next Steps**: Investigate and fix in a separate PR. Likely requires updating the chalk dependency or fixing the import/usage pattern in the test scripts.

**Priority**: Medium - does not affect production deployment but hampers development workflow.