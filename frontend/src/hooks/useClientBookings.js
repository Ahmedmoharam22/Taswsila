import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';

export const useClientBookings = () => {
  return useQuery({
    queryKey: ['client-bookings'],
    queryFn: async () => {
      const { data } = await api.get('/bookings/my-bookings');
      return data; // هيرجع قائمة الرحلات اللي العميل حجز فيها
    },
  });
};