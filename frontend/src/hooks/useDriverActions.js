import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';
import toast from 'react-hot-toast';

export const useDriverActions = () => {
  const queryClient = useQueryClient();

  // جلب الطلبات المتاحة
  const useAvailableRequests = () => useQuery({
    queryKey: ['available-requests'],
    queryFn: async () => {
      const { data } = await api.get('/custom-requests/available');
      return data.data;
    }
  });

  // الموافقة على طلب
  const acceptMutation = useMutation({
    mutationFn: async (requestId) => {
      const { data } = await api.patch(`/custom-requests/${requestId}/accept`);
      return data;
    },
    onSuccess: () => {
      toast.success('تم قبول الطلب بنجاح! تم إنشاء رحلة جديدة لك.');
      queryClient.invalidateQueries(['available-requests']);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'فشل قبول الطلب')
  });

  return { useAvailableRequests, acceptMutation };
};