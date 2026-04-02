import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import api from '../api/axios'; 

export const useCustomRequest = (onSuccessCallback) => {
  return useMutation({
    mutationFn: (data) => api.post('/custom-requests', data),
    onSuccess: (data) => {
      toast.success('تم إرسال طلبك الخاص بنجاح! السائقين هيشوفوه دلوقتي.');
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (err) => {
      const message = err.response?.data?.message || 'فشل إرسال الطلب، حاول مرة أخرى';
      toast.error(message);
    },
  });
};