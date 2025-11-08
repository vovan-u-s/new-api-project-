import { z } from 'zod';

/**
 * Login Schemas for APIs 7, 8, 9, 10
 * These schemas validate login-related requests and responses
 */

// API 7, 8: Login Request Schema
export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;

// API 7: Successful Login Response Schema
export const loginSuccessResponseSchema = z.object({
  responseCode: z.literal(200),
  message: z.string()
});

export type LoginSuccessResponse = z.infer<typeof loginSuccessResponseSchema>;

// API 10: Failed Login Response Schema (User not found)
export const loginFailedResponseSchema = z.object({
  responseCode: z.literal(404),
  message: z.string()
});

export type LoginFailedResponse = z.infer<typeof loginFailedResponseSchema>;

// API 8: Missing Parameter Response Schema
export const loginMissingParameterResponseSchema = z.object({
  responseCode: z.literal(400),
  message: z.literal('Bad request, some parameter is missing in POST request.')
});

export type LoginMissingParameterResponse = z.infer<typeof loginMissingParameterResponseSchema>;

// API 9: Method Not Supported Response Schema (for DELETE)
export const loginMethodNotSupportedResponseSchema = z.object({
  responseCode: z.literal(405),
  message: z.literal('This request method is not supported.')
});

export type LoginMethodNotSupportedResponse = z.infer<typeof loginMethodNotSupportedResponseSchema>;
