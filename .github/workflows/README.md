# GitHub Actions CI/CD Workflows

This directory contains GitHub Actions workflows for automated API testing across different environments.

## 📁 Workflow Files

### 1. `production.yml` - Production Environment

**Triggers:**
- ✅ Push to `main` branch
- ✅ Pull requests to `main` branch
- ✅ Scheduled: Daily at 6 AM UTC
- ✅ Manual trigger via workflow_dispatch

**Features:**
- Runs on Ubuntu latest
- Parallel execution with sharding (2 shards)
- Full browser installation (Chromium, Firefox, WebKit)
- Merges reports from all shards
- 30-day artifact retention
- Test result notifications

**Environment Variables:**
```yaml
NODE_ENV: production
API_BASE_URL: https://automationexercise.com/api
```

**Usage:**
```bash
# Automatic on push to main
git push origin main

# Manual trigger via GitHub UI
Actions → Production API Tests → Run workflow
```

---

### 2. `qa.yml` - QA Environment

**Triggers:**
- ✅ Push to `qa` or `develop` branches
- ✅ Pull requests to `qa` branch
- ✅ Scheduled: Twice daily at 9 AM and 5 PM UTC
- ✅ Manual trigger with test category selection

**Features:**
- Runs on Ubuntu latest
- Multiple browser support (Chromium, Firefox)
- TypeScript type checking before tests
- Category-based test execution (products, brands, authentication, user-account)
- Matrix strategy for parallel category testing
- Multiple report formats (HTML, JSON, JUnit)
- Test result publishing with dorny/test-reporter
- 14-day artifact retention

**Manual Trigger Options:**
- `all` - Run all tests
- `products` - Products tests only
- `brands` - Brands tests only
- `authentication` - Authentication tests only
- `user-account-management` - User account tests only

**Environment Variables:**
```yaml
NODE_ENV: qa
API_BASE_URL: https://automationexercise.com/api
```

**Usage:**
```bash
# Automatic on push to qa
git push origin qa

# Manual trigger via GitHub UI
Actions → QA API Tests → Run workflow → Select category
```

---

### 3. `development.yml` - Development Environment

**Triggers:**
- ✅ Push to any branch (except `main` and `qa`)
- ✅ Pull requests to any branch
- ✅ Scheduled: Every 4 hours during work hours (Mon-Fri, 8 AM, 12 PM, 4 PM, 8 PM UTC)
- ✅ Manual trigger with advanced options

**Features:**
- Runs on Ubuntu latest
- Lint and type checking before tests
- Configurable browser selection (Chromium, Firefox, WebKit, All)
- Configurable test type (@smoke, @negative, @api, all)
- Debug mode option
- Quick test matrix for critical categories
- PR comment with test results
- 7-day artifact retention
- Continue on error (non-blocking)

**Manual Trigger Options:**
- **Browser:** chromium, firefox, webkit, all
- **Test Type:** all, smoke, negative, api
- **Debug Mode:** true/false

**Environment Variables:**
```yaml
NODE_ENV: development
API_BASE_URL: https://automationexercise.com/api
DEBUG: pw:api (if debug enabled)
```

**Usage:**
```bash
# Automatic on push to feature branch
git push origin feature/new-api

# Manual trigger via GitHub UI
Actions → Development API Tests → Run workflow → Configure options
```

---

## 🚀 Quick Start

### Initial Setup

1. **Push workflows to repository:**
```bash
git add .github/workflows/
git commit -m "Add CI/CD workflows for Production, QA, and Development"
git push origin main
```

2. **Configure GitHub Repository Settings:**
   - Go to Settings → Actions → General
   - Enable "Allow all actions and reusable workflows"
   - Set workflow permissions to "Read and write permissions"

3. **Add Repository Secrets (if needed):**
   - Settings → Secrets and variables → Actions
   - Add any required secrets (e.g., API keys, tokens)

### Running Workflows

#### Production Tests
```bash
# Trigger automatically
git push origin main

# Or manually via GitHub UI
```

#### QA Tests
```bash
# Trigger automatically
git push origin qa

# Or manually with category selection
```

#### Development Tests
```bash
# Trigger automatically
git push origin feature/your-branch

# Or manually with options
```

---

## 📊 Test Reports

### Artifact Locations

**Production:**
- `playwright-report-production-merged` (30 days)
- Individual shard reports available

**QA:**
- `playwright-report-qa` (14 days)
- `test-results-qa-json` (14 days)
- `junit-results-qa` (14 days)
- Category-specific reports

**Development:**
- `playwright-report-dev-{run-number}` (7 days)
- `test-results-dev-{run-number}` (7 days)
- Failed test artifacts (3 days)

### Viewing Reports

1. Go to Actions tab in GitHub
2. Click on the workflow run
3. Scroll to "Artifacts" section
4. Download the report
5. Extract and open `index.html` in browser

---

## 🔧 Configuration

### Modify Schedule

Edit the `cron` expression in workflow files:

```yaml
schedule:
  - cron: '0 6 * * *'  # Daily at 6 AM UTC
```

**Cron Examples:**
- `0 6 * * *` - Daily at 6 AM UTC
- `0 9,17 * * *` - Twice daily at 9 AM and 5 PM UTC
- `0 8,12,16,20 * * 1-5` - Every 4 hours, Monday-Friday
- `0 0 * * 0` - Weekly on Sunday at midnight

### Change Node.js Version

Update in workflow files:
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'  # Change version here
```

### Adjust Timeout

Modify timeout settings:
```yaml
jobs:
  api-tests:
    timeout-minutes: 15  # Change timeout here
```

---

## 📈 Workflow Matrix

| Environment | Schedule | Browsers | Sharding | Retention | Continue on Error |
|-------------|----------|----------|----------|-----------|-------------------|
| Production | Daily (6 AM) | All | Yes (2) | 30 days | No |
| QA | Twice daily (9 AM, 5 PM) | Chromium, Firefox | By category | 14 days | No |
| Development | Every 4h (work hours) | Configurable | Quick tests | 7 days | Yes |

---

## 🎯 Best Practices

### Production
- ✅ Always runs on stable `main` branch
- ✅ Fail-fast disabled for complete test coverage
- ✅ Long artifact retention for compliance
- ✅ Sharding for faster execution

### QA
- ✅ Multiple report formats for integration
- ✅ Category-based testing for flexibility
- ✅ Type checking before test execution
- ✅ Test result publishing for visibility

### Development
- ✅ Continue on error for non-blocking development
- ✅ Quick tests for fast feedback
- ✅ PR comments for visibility
- ✅ Configurable options for debugging

---

## 🐛 Troubleshooting

### Workflow not triggering
1. Check branch name matches trigger conditions
2. Verify workflow file syntax (use YAML validator)
3. Check repository Actions settings

### Tests failing in CI but passing locally
1. Check environment variables
2. Verify browser installation
3. Review timeout settings
4. Check for timing issues (add waits if needed)

### Artifacts not uploading
1. Verify artifact paths exist
2. Check workflow permissions
3. Ensure retention days are valid

---

## 📚 Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Playwright CI Guide](https://playwright.dev/docs/ci)
- [Cron Expression Generator](https://crontab.guru/)
- [GitHub Actions Marketplace](https://github.com/marketplace?type=actions)

---

## 🔄 Maintenance

**Regular Tasks:**
- Review and update Node.js version quarterly
- Update Playwright version monthly
- Review and adjust schedules based on team needs
- Clean up old workflow runs and artifacts
- Monitor workflow execution times

**Monitoring:**
- Check daily/weekly execution success rates
- Review artifact storage usage
- Monitor workflow execution times
- Track flaky tests and fix them
