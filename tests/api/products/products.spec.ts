import { test, expect } from '@playwright/test';
import { APIHelper } from '../../../utils/apiHelper';
import { SchemaValidator } from '../../../utils/schemaValidator';

test.describe('Products API Tests', () => {
  
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
});
