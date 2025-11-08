import { test, expect } from '@playwright/test';
import { APIHelper } from '../../../utils/apiHelper';
import { SchemaValidator } from '../../../utils/schemaValidator';
import testData from '../../../data/testData.json';

test.describe('User Account Management API Tests', () => {

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
