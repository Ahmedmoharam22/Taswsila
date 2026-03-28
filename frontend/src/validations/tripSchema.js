import { z } from 'zod';

export const tripSchema = z.object({
  fromCity: z.string().min(2, 'حدد مدينة التحرك'),
  toCity: z.string().min(2, 'حدد مدينة الوصول'),
  departureTime: z.string().refine((val) => new Date(val) > new Date(), {
    message: 'يجب أن يكون موعد الرحلة في المستقبل',
  }),
  price: z.string().transform((v) => Number(v)).pipe(z.number().min(1, 'السعر يجب أن يكون أكبر من 0')),
  totalSeats: z.string().transform((v) => Number(v)).pipe(z.number().min(1, 'حدد عدد الكراسي')),
});