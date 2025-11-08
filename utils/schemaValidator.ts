import { schemas } from '../schemas';
import { z } from 'zod';

/**
 * JSON Schema validation utilities using Zod
 * Uses schemas from the schemas folder
 */
export class SchemaValidator {
  /**
   * Validate JSON against Zod schema
   */
  static validate<T>(data: any, schema: z.ZodSchema<T>): T {
    try {
      return schema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.issues.map((err) => `${err.path.join('.')}: ${err.message}`).join(', ');
        throw new Error(`Schema validation failed: ${errorMessages}`);
      }
      throw error;
    }
  }

  // ============ API 1: Products List ============
  /**
   * Validate products list response (API 1)
   */
  static validateProductsList(data: any) {
    return this.validate(data, schemas.productsListResponseSchema);
  }

  /**
   * Validate single product
   */
  static validateProduct(data: any) {
    return this.validate(data, schemas.productSchema);
  }

  // ============ API 2: POST to Products List (Error) ============
  /**
   * Validate method not supported error (API 2, 4, 9)
   */
  static validateMethodNotSupported(data: any) {
    return this.validate(data, schemas.methodNotSupportedResponseSchema);
  }

  // ============ API 3: Brands List ============
  /**
   * Validate brands list response (API 3)
   */
  static validateBrandsList(data: any) {
    return this.validate(data, schemas.brandsListResponseSchema);
  }

  /**
   * Validate single brand
   */
  static validateBrand(data: any) {
    return this.validate(data, schemas.brandSchema);
  }

  // ============ API 5: Search Product ============
  /**
   * Validate search product response (API 5)
   */
  static validateSearchProduct(data: any) {
    return this.validate(data, schemas.searchProductResponseSchema);
  }

  /**
   * Validate search product request
   */
  static validateSearchRequest(data: any) {
    return this.validate(data, schemas.searchProductRequestSchema);
  }

  // ============ API 6: Search Product Missing Parameter ============
  /**
   * Validate search missing parameter error (API 6)
   */
  static validateSearchMissingParameter(data: any) {
    return this.validate(data, schemas.searchMissingParameterResponseSchema);
  }

  // ============ API 7: Login with Valid Details ============
  /**
   * Validate login success response (API 7)
   */
  static validateLoginSuccess(data: any) {
    return this.validate(data, schemas.loginSuccessResponseSchema);
  }

  /**
   * Validate login request
   */
  static validateLoginRequest(data: any) {
    return this.validate(data, schemas.loginRequestSchema);
  }

  // ============ API 8: Login Missing Email ============
  /**
   * Validate login missing parameter error (API 8)
   */
  static validateLoginMissingParameter(data: any) {
    return this.validate(data, schemas.loginMissingParameterResponseSchema);
  }

  // ============ API 10: Login with Invalid Details ============
  /**
   * Validate login failed response (API 10)
   */
  static validateLoginFailed(data: any) {
    return this.validate(data, schemas.loginFailedResponseSchema);
  }

  // ============ API 11: Create User Account ============
  /**
   * Validate create user success response (API 11)
   */
  static validateCreateUserSuccess(data: any) {
    return this.validate(data, schemas.createUserSuccessResponseSchema);
  }

  /**
   * Validate user already exists error
   */
  static validateUserExists(data: any) {
    return this.validate(data, schemas.userExistsResponseSchema);
  }

  /**
   * Validate create user request
   */
  static validateCreateUserRequest(data: any) {
    return this.validate(data, schemas.createUserRequestSchema);
  }

  // ============ API 12: Delete User Account ============
  /**
   * Validate delete user success response (API 12)
   */
  static validateDeleteUserSuccess(data: any) {
    return this.validate(data, schemas.deleteUserSuccessResponseSchema);
  }

  /**
   * Validate delete user request
   */
  static validateDeleteUserRequest(data: any) {
    return this.validate(data, schemas.deleteUserRequestSchema);
  }

  // ============ API 13: Update User Account ============
  /**
   * Validate update user success response (API 13)
   */
  static validateUpdateUserSuccess(data: any) {
    return this.validate(data, schemas.updateUserSuccessResponseSchema);
  }

  /**
   * Validate update user request
   */
  static validateUpdateUserRequest(data: any) {
    return this.validate(data, schemas.updateUserRequestSchema);
  }

  // ============ API 14: Get User Account Detail ============
  /**
   * Validate get user account response (API 14)
   */
  static validateGetUserAccount(data: any) {
    return this.validate(data, schemas.getUserAccountResponseSchema);
  }

  // ============ General Validators ============
  /**
   * Validate user not found error
   */
  static validateUserNotFound(data: any) {
    return this.validate(data, schemas.userNotFoundResponseSchema);
  }

  /**
   * Validate user account data
   */
  static validateUserAccount(data: any) {
    return this.validate(data, schemas.userAccountSchema);
  }

  /**
   * Validate bad request error
   */
  static validateBadRequest(data: any) {
    return this.validate(data, schemas.badRequestResponseSchema);
  }

  /**
   * Validate generic error response
   */
  static validateErrorResponse(data: any) {
    return this.validate(data, schemas.genericErrorResponseSchema);
  }

  /**
   * Validate not found error
   */
  static validateNotFound(data: any) {
    return this.validate(data, schemas.notFoundResponseSchema);
  }
}
