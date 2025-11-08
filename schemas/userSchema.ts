import { z } from 'zod';

/**
 * User Schemas for APIs 11, 12, 13, 14
 * These schemas validate user account CRUD operations
 */

// User Account Schema
export const userAccountSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  title: z.enum(['Mr', 'Mrs', 'Miss', 'Ms']),
  birth_date: z.string(),
  birth_month: z.string(),
  birth_year: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  company: z.string().optional(),
  address1: z.string(),
  address2: z.string().optional(),
  country: z.string(),
  zipcode: z.string(),
  state: z.string(),
  city: z.string(),
  mobile_number: z.string()
});

export type UserAccount = z.infer<typeof userAccountSchema>;

// API 11: Create User Request Schema
export const createUserRequestSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  title: z.enum(['Mr', 'Mrs', 'Miss', 'Ms']),
  birth_date: z.string(),
  birth_month: z.string(),
  birth_year: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  company: z.string().optional(),
  address1: z.string(),
  address2: z.string().optional(),
  country: z.string(),
  zipcode: z.string(),
  state: z.string(),
  city: z.string(),
  mobile_number: z.string()
});

export type CreateUserRequest = z.infer<typeof createUserRequestSchema>;

// API 11: Create User Success Response Schema
export const createUserSuccessResponseSchema = z.object({
  responseCode: z.literal(201),
  message: z.string()
});

export type CreateUserSuccessResponse = z.infer<typeof createUserSuccessResponseSchema>;

// API 11: User Already Exists Response Schema
export const userExistsResponseSchema = z.object({
  responseCode: z.literal(400),
  message: z.string()
});

export type UserExistsResponse = z.infer<typeof userExistsResponseSchema>;

// API 12: Delete User Request Schema
export const deleteUserRequestSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export type DeleteUserRequest = z.infer<typeof deleteUserRequestSchema>;

// API 12: Delete User Success Response Schema
export const deleteUserSuccessResponseSchema = z.object({
  responseCode: z.literal(200),
  message: z.string()
});

export type DeleteUserSuccessResponse = z.infer<typeof deleteUserSuccessResponseSchema>;

// API 13: Update User Request Schema
export const updateUserRequestSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  password: z.string().optional(),
  title: z.enum(['Mr', 'Mrs', 'Miss', 'Ms']).optional(),
  birth_date: z.string().optional(),
  birth_month: z.string().optional(),
  birth_year: z.string().optional(),
  company: z.string().optional(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  country: z.string().optional(),
  zipcode: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  mobile_number: z.string().optional()
});

export type UpdateUserRequest = z.infer<typeof updateUserRequestSchema>;

// API 13: Update User Success Response Schema
export const updateUserSuccessResponseSchema = z.object({
  responseCode: z.literal(200),
  message: z.string()
});

export type UpdateUserSuccessResponse = z.infer<typeof updateUserSuccessResponseSchema>;

// API 14: Get User Account Response Schema
export const getUserAccountResponseSchema = z.object({
  responseCode: z.literal(200),
  user: userAccountSchema
});

export type GetUserAccountResponse = z.infer<typeof getUserAccountResponseSchema>;

// User Not Found Response Schema (used by APIs 12, 13, 14)
export const userNotFoundResponseSchema = z.object({
  responseCode: z.literal(404),
  message: z.string()
});

export type UserNotFoundResponse = z.infer<typeof userNotFoundResponseSchema>;
