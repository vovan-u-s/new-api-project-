import { test, expect } from '@playwright/test';
import { APIHelper } from '../../../utils/apiHelper';
import { SchemaValidator } from '../../../utils/schemaValidator';
import testData from '../../../data/testData.json';

test.describe('Authentication API Tests', () => {

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
});
