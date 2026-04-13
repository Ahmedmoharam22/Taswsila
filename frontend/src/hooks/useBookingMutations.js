import api from '../api/axios';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';



export const useTripBookings = (tripId) => {
  return useQuery({
    queryKey: ['trip-bookings', tripId],
    queryFn: async () => {
      const { data } = await api.get(`/bookings/trip/${tripId}`);
      return data; // هترجع لينا مصفوفة فيها بيانات الركاب
    },
    enabled: !!tripId, // ميتنفذش إلا لو فيه ID للرحلة
  });
};


export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingData) => {
      const { data } = await api.post('/bookings', bookingData);
      return data;
    },
    onSuccess: () => {
      // تحديث بيانات الرحلات عشان عدد الكراسي المتاحة ينقص فوراً
      queryClient.invalidateQueries(['public-trips']);
      queryClient.invalidateQueries(['client-bookings']);
      toast.success('تم الحجز بنجاح! رحلة سعيدة');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'عذراً، حدث خطأ في الحجز');
    }
  });
};