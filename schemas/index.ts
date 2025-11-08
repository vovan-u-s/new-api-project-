/**
 * Central Schema Index
 * Exports all schemas from the schemas folder
 */

// Import all schemas
import * as productsSchemas from './productsSchema';
import * as brandsSchemas from './brandsSchema';
import * as searchSchemas from './searchSchema';
import * as errorSchemas from './errorSchema';
import * as loginSchemas from './loginSchema';

// Export all schemas
export const schemas = {
  // Product Schemas (API 1)
  ...productsSchemas,
  
  // Brand Schemas (API 3)
  ...brandsSchemas,
  
  // Search Schemas (API 5, 6)
  ...searchSchemas,
  
  // Error Schemas (API 2, 4, 6)
  ...errorSchemas,
  
  // Login Schemas (API 7, 8, 9)
  ...loginSchemas
};

// Re-export individual modules for direct imports
export * from './productsSchema';
export * from './brandsSchema';
export * from './searchSchema';
export * from './errorSchema';
export * from './loginSchema';

// Default export
export default schemas;
