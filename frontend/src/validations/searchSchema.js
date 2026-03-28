import { z } from 'zod';

export const searchSchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
});