import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';
import { toast } from 'react-hot-toast';

// جلب رحلات السواق (الداشبورد)
export const useDriverDashboard = () => {
  return useQuery({
    queryKey: ['driver-trips'],
    queryFn: async () => {
      const { data } = await api.get('/trips/driver/dashboard');
      return data;
    },
  });
};

// إنشاء رحلة جديدة
export const useCreateTrip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTrip) => {
      const { data } = await api.post('/trips', newTrip);
      return data;
    },
    onSuccess: () => {
      // تحديث قائمة الرحلات أوتوماتيكياً أول ما الرحلة تضاف
      queryClient.invalidateQueries(['driver-trips']);
      toast.success('تمت إضافة الرحلة بنجاح! طريقتك السلامة 🏎️');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'فشل في إضافة الرحلة');
    }
  });
};