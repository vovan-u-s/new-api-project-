import { expect, APIRequestContext, APIResponse } from '@playwright/test';

/**
 * API Helper class for common API operations
 */
export class APIHelper {
  private request: APIRequestContext;
  private baseURL: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseURL = 'https://automationexercise.com/api';
  }

  /**
   * Make GET request
   */
  async get(endpoint: string, options: any = {}): Promise<APIResponse> {
    const response = await this.request.get(`${this.baseURL}${endpoint}`, options);
    return response;
  }

  /**
   * Make POST request
   */
  async post(endpoint: string, data: any = {}, options: any = {}): Promise<APIResponse> {
    // If content-type is form-urlencoded, convert data to URLSearchParams
    let requestData = data;
    if (options.headers?.['Content-Type'] === 'application/x-www-form-urlencoded') {
      const params = new URLSearchParams();
      Object.keys(data).forEach(key => {
        params.append(key, data[key]);
      });
      requestData = params.toString();
    }
    
    const response = await this.request.post(`${this.baseURL}${endpoint}`, {
      data: requestData,
      ...options
    });
    return response;
  }

  /**
   * Make PUT request
   */
  async put(endpoint: string, data: any = {}, options: any = {}): Promise<APIResponse> {
    // If content-type is form-urlencoded, convert data to URLSearchParams
    let requestData = data;
    if (options.headers?.['Content-Type'] === 'application/x-www-form-urlencoded') {
      const params = new URLSearchParams();
      Object.keys(data).forEach(key => {
        params.append(key, data[key]);
      });
      requestData = params.toString();
    }
    
    const response = await this.request.put(`${this.baseURL}${endpoint}`, {
      data: requestData,
      ...options
    });
    return response;
  }

  /**
   * Make DELETE request
   */
  async delete(endpoint: string, options: any = {}): Promise<APIResponse> {
    const response = await this.request.delete(`${this.baseURL}${endpoint}`, options);
    return response;
  }

  /**
   * Validate response status code
   */
  async validateStatusCode(response: APIResponse, expectedCode: number): Promise<void> {
    expect(response.status()).toBe(expectedCode);
  }

  /**
   * Validate JSON response structure
   */
  async validateJsonResponse(response: APIResponse, expectedKeys: string[] = []): Promise<any> {
    const responseBody = await response.json();
    
    // Check if response is valid JSON
    expect(responseBody).toBeDefined();
    
    // Check if expected keys exist
    expectedKeys.forEach(key => {
      expect(responseBody).toHaveProperty(key);
    });
    
    return responseBody;
  }

  /**
   * Validate response contains expected message
   * @param responseBody - The already parsed response body object
   * @param expectedMessage - The message to check for
   */
  validateResponseMessage(responseBody: any, expectedMessage: string): void {
    expect(responseBody.message).toContain(expectedMessage);
  }

  /**
   * Validate array response
   */
  async validateArrayResponse(response: APIResponse, minLength: number = 0): Promise<any> {
    const responseBody = await response.json();
    expect(Array.isArray(responseBody.products || responseBody.brands || responseBody)).toBe(true);
    
    const arrayData = responseBody.products || responseBody.brands || responseBody;
    expect(arrayData.length).toBeGreaterThanOrEqual(minLength);
    
    return responseBody;
  }

  /**
   * Log response for debugging
   */
  async logResponse(response: APIResponse): Promise<void> {
    console.log(`Status: ${response.status()}`);
    console.log(`Headers:`, response.headers());
    try {
      const body = await response.json();
      console.log(`Body:`, JSON.stringify(body, null, 2));
    } catch {
      const textBody = await response.text();
      console.log(`Body (text):`, textBody);
    }
  }
}
