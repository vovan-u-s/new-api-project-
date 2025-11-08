import { z } from 'zod';
import { productSchema } from './productsSchema';

/**
 * Schema for Search Product Request (API 5, 6)
 */
export const searchProductRequestSchema = z.object({
  search_product: z.string()
});

/**
 * Schema for Search Product Response (API 5)
 */
export const searchProductResponseSchema = z.object({
  responseCode: z.literal(200),
  products: z.array(productSchema)
});

/**
 * Schema for Search Product Missing Parameter Response (API 6)
 */
export const searchMissingParameterResponseSchema = z.object({
  responseCode: z.literal(400),
  message: z.literal('Bad request, some parameter is missing in POST request.')
});

// TypeScript types inferred from Zod schemas
export type SearchProductRequest = z.infer<typeof searchProductRequestSchema>;
export type SearchProductResponse = z.infer<typeof searchProductResponseSchema>;
export type SearchMissingParameterResponse = z.infer<typeof searchMissingParameterResponseSchema>;
