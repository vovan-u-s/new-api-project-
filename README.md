# Automation Exercise API Testing Project

This project contains automated API tests for the Automation Exercise APIs using Playwright and JSON validation.

## 📋 API Test Coverage

This project tests the following 14 APIs:

1. **GET** `/api/productsList` - Get All Products List
2. **POST** `/api/productsList` - POST To All Products List (405 error test)
3. **GET** `/api/brandsList` - Get All Brands List  
4. **PUT** `/api/brandsList` - PUT To All Brands List (405 error test)
5. **POST** `/api/searchProduct` - Search Product with parameter
6. **POST** `/api/searchProduct` - Search Product without parameter (400 error test)
7. **POST** `/api/verifyLogin` - Verify Login with valid details
8. **POST** `/api/verifyLogin` - Verify Login without email parameter (400 error test)
9. **DELETE** `/api/verifyLogin` - DELETE To Verify Login (405 error test)
10. **POST** `/api/verifyLogin` - Verify Login with invalid details (404 error test)
11. **POST** `/api/createAccount` - Create/Register User Account
12. **DELETE** `/api/deleteAccount` - Delete User Account
13. **PUT** `/api/updateAccount` - Update User Account
14. **GET** `/api/getUserAccountDetailByEmail` - Get user account detail by email

## 🚀 Project Structure

```
automation-exercise-api-tests/
├── tests/
│   └── api/
│       └── automationExercise.spec.js    # Main API test file
├── schemas/                              # JSON schemas for validation
│   ├── productsSchema.js                 # Product & search schemas (API 1, 5)
│   ├── brandsSchema.js                   # Brand schemas (API 3)
│   ├── userSchema.js                     # User account schemas (API 11-14)
│   ├── loginSchema.js                    # Login/auth schemas (API 7, 8, 10)
│   ├── searchSchema.js                   # Search schemas (API 5, 6)
│   ├── errorSchema.js                    # Error response schemas (API 2, 4, 6, 8, 9)
│   ├── index.js                          # Schema exports
│   └── README.md                         # Schema documentation
├── utils/
│   ├── apiHelper.js                      # API utility functions
│   └── schemaValidator.js                # JSON schema validation wrapper
├── data/
│   ├── testData.json                     # Test data and configurations
│   └── expectedResponses.json            # Expected API responses
├── config/
│   └── global-setup.js                   # Global test setup
├── playwright.config.js                  # Playwright configuration
├── package.json                          # Dependencies and scripts
├── .gitignore                            # Git ignore rules
└── README.md                             # This file
```

## 🛠️ Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## 📦 Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers (if needed):
   ```bash
   npm run install:playwright
   ```

## 🔧 Configuration

1. Copy `.env.example` to `.env` and update values if needed:
   ```bash
   cp .env.example .env
   ```

2. The default configuration targets `https://automationexercise.com/api`

## 🧪 Running Tests

### Run All Tests
```bash
npm test
```

### Run API Tests Only
```bash
npm run test:api
```

### Run Tests with UI Mode
```bash
npm run test:ui
```

### Run Tests in Debug Mode
```bash
npm run test:debug
```

### Run Tests in Headed Mode
```bash
npm run test:headed
```

## 📊 Test Reports

After running tests, you can view reports:

```bash
npm run report
```

Reports are generated in:
- `playwright-report/` - HTML report
- `test-results.json` - JSON report
- `results.xml` - JUnit XML report

## 🏷️ Test Tags

Tests are organized with tags for easy filtering:

- `@api` - All API tests
- `@smoke` - Smoke tests (basic functionality)
- `@negative` - Negative test cases
- `@auth` - Authentication related tests
- `@user` - User management tests
- `@search` - Search functionality tests

### Run tests by tag:
```bash
npx playwright test --grep @smoke
npx playwright test --grep @negative
npx playwright test --grep @auth
```

## 🔍 Test Features

### Dedicated Schema Folder
- **Organized schemas** - Each API type has its own schema file
- **Comprehensive validation** - Separate schemas for requests, success responses, and error responses
- **Easy maintenance** - Centralized schema management in `/schemas` folder
- **Detailed documentation** - Complete schema documentation in `/schemas/README.md`

### JSON Schema Validation
- Validates response structure using Joi schemas
- Ensures data types and required fields are correct
- Flexible validation for different response types
- Schema files organized by API functionality:
  - Products & Search (API 1, 5)
  - Brands (API 3)
  - User Management (API 11-14)
  - Authentication (API 7, 8, 10)
  - Errors (API 2, 4, 6, 8, 9)

### API Helper Utilities
- Reusable functions for GET, POST, PUT, DELETE requests
- Response validation helpers
- Status code validation
- JSON response parsing and validation

### Test Data Management
- Centralized test data in JSON files
- Configurable user credentials and search terms
- Expected response templates

### Error Handling
- Comprehensive negative test scenarios
- Validation of error response codes and messages
- Testing unsupported HTTP methods

## 📝 Adding New Tests

1. **Add test data** in `data/testData.json`
2. **Add expected responses** in `data/expectedResponses.json`
3. **Create test** in `tests/api/` directory
4. **Use APIHelper** for consistent request handling
5. **Validate responses** with SchemaValidator

Example test structure:
```javascript
test('API Test Name @tag', async () => {
  const response = await apiHelper.get('/endpoint');
  await apiHelper.validateStatusCode(response, 200);
  const responseBody = await apiHelper.validateJsonResponse(response);
  SchemaValidator.validateSchema(responseBody);
});
```

## 🐛 Debugging

1. **Enable debug mode** in `.env`: `DEBUG_MODE=true`
2. **Log requests** in `.env`: `LOG_REQUESTS=true`
3. **Use VS Code debugger** with breakpoints
4. **Run single test** with `--grep "test name"`

## 🔧 Customization

### Modify Base URL
Update `playwright.config.js`:
```javascript
use: {
  baseURL: 'your-api-url-here'
}
```

### Add Custom Headers
Update `playwright.config.js`:
```javascript
use: {
  extraHTTPHeaders: {
    'Authorization': 'Bearer token',
    'Custom-Header': 'value'
  }
}
```

### Timeout Configuration
Update timeouts in `playwright.config.js`:
```javascript
timeout: 30000,
expect: {
  timeout: 10000
}
```

## 📈 Best Practices

1. **Use descriptive test names** that explain what is being tested
2. **Tag tests appropriately** for easy filtering and organization
3. **Validate both positive and negative scenarios**
4. **Use schema validation** for response structure verification
5. **Keep test data separate** from test logic
6. **Handle dynamic data** (timestamps, unique IDs) properly
7. **Log important information** for debugging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests following the existing patterns
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.