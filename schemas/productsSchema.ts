import { z } from 'zod';

/**
 * Schema for Product Category User Type
 */
export const categoryUserTypeSchema = z.object({
  usertype: z.string()
});

/**
 * Schema for Product Category
 */
export const categorySchema = z.object({
  usertype: categoryUserTypeSchema,
  category: z.string()
});

/**
 * Schema for Single Product
 */
export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.string(),
  brand: z.string(),
  category: categorySchema
});

/**
 * Schema for Products List Response (API 1)
 */
export const productsListResponseSchema = z.object({
  responseCode: z.literal(200),
  products: z.array(productSchema).min(1)
});

// TypeScript types inferred from Zod schemas
export type CategoryUserType = z.infer<typeof categoryUserTypeSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Product = z.infer<typeof productSchema>;
export type ProductsListResponse = z.infer<typeof productsListResponseSchema>;
