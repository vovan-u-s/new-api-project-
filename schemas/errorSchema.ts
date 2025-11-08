import { z } from 'zod';

/**
 * Schema for Method Not Supported Error Response (API 2, 4, 9)
 * Used when HTTP method is not allowed for the endpoint
 */
export const methodNotSupportedResponseSchema = z.object({
  responseCode: z.literal(405),
  message: z.literal('This request method is not supported.')
});

/**
 * Schema for Bad Request Error Response (API 6, 8)
 * Used when required parameters are missing
 */
export const badRequestResponseSchema = z.object({
  responseCode: z.literal(400),
  message: z.literal('Bad request, some parameter is missing in POST request.')
});

/**
 * Schema for Not Found Error Response
 * Used when resource is not found
 */
export const notFoundResponseSchema = z.object({
  responseCode: z.literal(404),
  message: z.string()
});

/**
 * Generic Error Response Schema
 * Can be used for any error response
 */
export const genericErrorResponseSchema = z.object({
  responseCode: z.number().int().min(400).max(599),
  message: z.string()
});

/**
 * Schema for validation errors
 */
export const validationErrorResponseSchema = z.object({
  responseCode: z.union([z.literal(400), z.literal(422)]),
  message: z.string(),
  errors: z.array(z.object({
    field: z.string().optional(),
    message: z.string().optional()
  })).optional()
});

// TypeScript types inferred from Zod schemas
export type MethodNotSupportedResponse = z.infer<typeof methodNotSupportedResponseSchema>;
export type BadRequestResponse = z.infer<typeof badRequestResponseSchema>;
export type NotFoundResponse = z.infer<typeof notFoundResponseSchema>;
export type GenericErrorResponse = z.infer<typeof genericErrorResponseSchema>;
export type ValidationError = z.infer<typeof validationErrorResponseSchema>['errors'] extends (infer U)[] ? U : never;
export type ValidationErrorResponse = z.infer<typeof validationErrorResponseSchema>;
