import { z } from 'zod';

/**
 * Schema for Single Brand
 */
export const brandSchema = z.object({
  id: z.number(),
  brand: z.string()
});

/**
 * Schema for Brands List Response (API 3)
 */
export const brandsListResponseSchema = z.object({
  responseCode: z.literal(200),
  brands: z.array(brandSchema).min(1)
});

// TypeScript types inferred from Zod schemas
export type Brand = z.infer<typeof brandSchema>;
export type BrandsListResponse = z.infer<typeof brandsListResponseSchema>;
