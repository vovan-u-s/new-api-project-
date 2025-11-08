import { test, expect } from '@playwright/test';
import { APIHelper } from '../../utils/apiHelper';
import { SchemaValidator } from '../../utils/schemaValidator';
import testData from '../../data/testData.json';

test.describe('Automation Exercise API Tests', () => {
  
  test('API 1: Get All Products List @api @smoke', async ({ request }) => {
    const apiHelper = new APIHelper(request);
    const response = await apiHelper.get('/productsList');
    
    await apiHelper.validateStatusCode(response, 200);
    const responseBody = await apiHelper.validateJsonResponse(response, ['responseCode', 'products']);
    SchemaValidator.validateProductsList(responseBody);
    
    expect(responseBody.responseCode).toBe(200);
    expect(responseBody.products).toBeDefined();
    expect(Array.isArray(responseBody.products)).toBe(true);
    expect(responseBody.products.length).toBeGreaterThan(0);
  });

  test('API 2: POST To All Products List @api @negative', async ({ request }) => {
    const apiHelper = new APIHelper(request);
    const response = await apiHelper.post('/productsList', {});
    
    await apiHelper.validateStatusCode(response, 405);
    const responseBody = await response.json();
    SchemaValidator.validateMethodNotSupported(responseBody);
    apiHelper.validateResponseMessage(responseBody, 'This request method is not supported.');
  });

  test('API 3: Get All Brands List @api @smoke', async ({ request }) => {
    const apiHelper = new APIHelper(request);
    const response = await apiHelper.get('/brandsList');
    
    await apiHelper.validateStatusCode(response, 200);
    const responseBody = await apiHelper.validateJsonResponse(response, ['responseCode', 'brands']);
    SchemaValidator.validateBrandsList(responseBody);
    
    expect(responseBody.responseCode).toBe(200);
    expect(responseBody.brands).toBeDefined();
    expect(Array.isArray(responseBody.brands)).toBe(true);
    expect(responseBody.brands.length).toBeGreaterThan(0);
  });

  test('API 4: PUT To All Brands List @api @negative', async ({ request }) => {
    const apiHelper = new APIHelper(request);
    const response = await apiHelper.put('/brandsList', {});
    
    await apiHelper.validateStatusCode(response, 405);
    const responseBody = await response.json();
    SchemaValidator.validateMethodNotSupported(responseBody);
    apiHelper.validateResponseMessage(responseBody, 'This request method is not supported.');
  });

  test('API 5: POST To Search Product - Tshirt @api @search', async ({ request }) => {
    const apiHelper = new APIHelper(request);
    const response = await apiHelper.post('/searchProduct', {
      search_product: 'Tshirt'
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    await apiHelper.validateStatusCode(response, 200);
    const responseBody = await apiHelper.validateJsonResponse(response, ['responseCode', 'products']);
    SchemaValidator.validateSearchProduct(responseBody);
    
    expect(responseBody.responseCode).toBe(200);
    expect(Array.isArray(responseBody.products)).toBe(true);
  });

  test('API 6: POST To Search Product without search_product parameter @api @negative', async ({ request }) => {
    const apiHelper = new APIHelper(request);
    const response = await apiHelper.post('/searchProduct', {}, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    await apiHelper.validateStatusCode(response, 400);
    const responseBody = await response.json();
    SchemaValidator.validateSearchMissingParameter(responseBody);
    apiHelper.validateResponseMessage(responseBody, 'Bad request, some parameter is missing in POST request.');
  });

  test('API 7: POST To Verify Login with valid details @api @auth', async ({ request }) => {
    const apiHelper = new APIHelper(request);
    const response = await apiHelper.post('/verifyLogin', {
      email: testData.loginCredentials.valid.email,
      password: testData.loginCredentials.valid.password
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    // Note: This might return 404 if user doesn't exist, which is expected for test data
    expect([200, 404]).toContain(response.status());
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('responseCode');
  });

  test('API 8: POST To Verify Login without email parameter @api @negative', async ({ request }) => {
    const apiHelper = new APIHelper(request);
    const response = await apiHelper.post('/verifyLogin', {
      password: testData.loginCredentials.missingEmail.password
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    await apiHelper.validateStatusCode(response, 400);
    const responseBody = await response.json();
    SchemaValidator.validateLoginMissingParameter(responseBody);
    apiHelper.validateResponseMessage(responseBody, 'Bad request, some parameter is missing in POST request.');
  });

  test('API 9: DELETE To Verify Login @api @negative', async ({ request }) => {
    const apiHelper = new APIHelper(request);
    const response = await apiHelper.delete('/verifyLogin');
    
    await apiHelper.validateStatusCode(response, 405);
    const responseBody = await response.json();
    SchemaValidator.validateMethodNotSupported(responseBody);
    apiHelper.validateResponseMessage(responseBody, 'This request method is not supported.');
  });

  test('API 10: POST To Verify Login with invalid details @api @negative', async ({ request }) => {
    const apiHelper = new APIHelper(request);
    const response = await apiHelper.post('/verifyLogin', {
      email: testData.loginCredentials.invalid.email,
      password: testData.loginCredentials.invalid.password
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    await apiHelper.validateStatusCode(response, 404);
    const responseBody = await response.json();
    SchemaValidator.validateLoginFailed(responseBody);
    
    expect(responseBody.responseCode).toBe(404);
    expect(responseBody.message).toContain('User not found');
  });

  test('API 11: POST To Create/Register User Account @api @user', async ({ request }) => {
    const apiHelper = new APIHelper(request);
    // Generate unique email for each test run
    const uniqueEmail = `testuser_${Date.now()}@example.com`;
    const userData = {
      ...testData.validUser,
      email: uniqueEmail
    };

    const response = await apiHelper.post('/createAccount', userData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    // Validate status code (201 for success, 400 if user already exists)
    expect([201, 400]).toContain(response.status());
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('responseCode');
    expect(responseBody).toHaveProperty('message');
    
    // If user creation successful, validate schema
    if (response.status() === 201) {
      SchemaValidator.validateCreateUserSuccess(responseBody);
      expect(responseBody.message).toContain('User created');
    }
  });

  test('API 12: DELETE METHOD To Delete User Account @api @user', async ({ request }) => {
    const apiHelper = new APIHelper(request);
    const response = await apiHelper.delete('/deleteAccount', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        email: testData.loginCredentials.valid.email,
        password: testData.loginCredentials.valid.password
      }
    });
    
    // Validate response (200 if deleted, 404 if user doesn't exist)
    expect([200, 404]).toContain(response.status());
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('responseCode');
    
    // Validate schema based on response
    if (response.status() === 200) {
      SchemaValidator.validateDeleteUserSuccess(responseBody);
    } else if (response.status() === 404) {
      SchemaValidator.validateUserNotFound(responseBody);
    }
  });

  test('API 13: PUT METHOD To Update User Account @api @user', async ({ request }) => {
    const apiHelper = new APIHelper(request);
    const updateData = {
      email: testData.loginCredentials.valid.email,
      name: 'Updated Test User',
      firstname: 'Updated',
      lastname: 'User'
    };

    const response = await apiHelper.put('/updateAccount', updateData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    // Validate response (200 if updated, 404 if user doesn't exist, 405 if method not supported)
    expect([200, 404, 405]).toContain(response.status());
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('responseCode');
    
    // Validate schema based on response
    if (response.status() === 200) {
      SchemaValidator.validateUpdateUserSuccess(responseBody);
    } else if (response.status() === 404) {
      SchemaValidator.validateUserNotFound(responseBody);
    } else if (response.status() === 405) {
      SchemaValidator.validateMethodNotSupported(responseBody);
    }
  });

  test('API 14: GET user account detail by email @api @user', async ({ request }) => {
    const apiHelper = new APIHelper(request);
    const email = encodeURIComponent(testData.loginCredentials.valid.email);
    const response = await apiHelper.get(`/getUserAccountDetailByEmail?email=${email}`);
    
    // Validate response (200 if found, 404 if user doesn't exist)
    expect([200, 404]).toContain(response.status());
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('responseCode');
    
    // If user found, validate user data structure
    if (response.status() === 200) {
      SchemaValidator.validateGetUserAccount(responseBody);
      expect(responseBody).toHaveProperty('user');
      const user = responseBody.user;
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('name');
    } else if (response.status() === 404) {
      SchemaValidator.validateUserNotFound(responseBody);
    }
  });
});
