# API Test Structure

This directory contains organized API tests for the Automation Exercise APIs, categorized by functionality.

## 📁 Test Organization

### 1. Products (`/products`)
**File:** `products.spec.ts`

Tests for product-related APIs:
- ✅ API 1: Get All Products List
- ✅ API 2: POST To All Products List (405 error)
- ✅ API 5: POST To Search Product
- ✅ API 6: POST To Search Product without parameter (400 error)

**Total:** 4 tests

---

### 2. Brands (`/brands`)
**File:** `brands.spec.ts`

Tests for brand-related APIs:
- ✅ API 3: Get All Brands List
- ✅ API 4: PUT To All Brands List (405 error)

**Total:** 2 tests

---

### 3. Authentication (`/authentication`)
**File:** `authentication.spec.ts`

Tests for login/authentication APIs:
- ✅ API 7: POST To Verify Login with valid details
- ✅ API 8: POST To Verify Login without email (400 error)
- ✅ API 9: DELETE To Verify Login (405 error)
- ✅ API 10: POST To Verify Login with invalid details (404 error)

**Total:** 4 tests

---

### 4. User Account Management (`/user-account-management`)
**File:** `user-account.spec.ts`

Tests for user account CRUD operations:
- ✅ API 11: POST To Create/Register User Account
- ✅ API 12: DELETE To Delete User Account
- ✅ API 13: PUT To Update User Account
- ✅ API 14: GET user account detail by email

**Total:** 4 tests

---

## 🎯 Running Tests

### Run all tests:
```bash
npm test
```

### Run specific category:
```bash
# Products tests only
npx playwright test tests/api/products

# Brands tests only
npx playwright test tests/api/brands

# Authentication tests only
npx playwright test tests/api/authentication

# User Account tests only
npx playwright test tests/api/user-account-management
```

### Run by tags:
```bash
# All API tests
npm run test:api

# Smoke tests only
npx playwright test --grep @smoke

# Negative tests only
npx playwright test --grep @negative

# User tests only
npx playwright test --grep @user

# Auth tests only
npx playwright test --grep @auth
```

## 📊 Test Summary

| Category | Tests | Coverage |
|----------|-------|----------|
| Products | 4 | APIs 1, 2, 5, 6 |
| Brands | 2 | APIs 3, 4 |
| Authentication | 4 | APIs 7, 8, 9, 10 |
| User Account | 4 | APIs 11, 12, 13, 14 |
| **Total** | **14** | **Complete** |

## 🔍 Test Tags

- `@api` - All API tests
- `@smoke` - Critical path tests
- `@negative` - Error/validation tests
- `@user` - User management tests
- `@auth` - Authentication tests
- `@search` - Search functionality tests
