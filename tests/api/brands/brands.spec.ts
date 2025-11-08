import { test, expect } from '@playwright/test';
import { APIHelper } from '../../../utils/apiHelper';
import { SchemaValidator } from '../../../utils/schemaValidator';

test.describe('Brands API Tests', () => {

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
});
