import { z } from 'zod';

export const customBookingSchema = z.object({
  fromCity: z.string().min(2, "اسم المدينة لا يقل عن حرفين"),
  toCity: z.string().min(2, "اسم المدينة لا يقل عن حرفين"),
  departureTime: z.string().min(1, "يجب تحديد موعد التحرك"),
  carType: z.enum(['Sedan', 'SUV', 'Van']),
  seatsNeeded: z.number().min(1).max(10),
  isAirConditioned: z.boolean().default(true),
});