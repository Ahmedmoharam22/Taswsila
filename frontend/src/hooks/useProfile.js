import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { updateUser } = useAuth(); // استخدم updateUser عشان يحدّث الـ context والـ localStorage
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await api.put('/auth/profile', formData);
      return data;
    },
    onSuccess: (response) => {
      // تحديث بيانات اليوزر في الكاش فوراً عشان البروفايل يتغير بدون ريفريش
      queryClient.setQueryData(['user-profile'], response.data);
      updateUser(response.data); // 👈 تحديث اليوزر في الـ Context والـ localStorage
      toast.success(response.message);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'حدث خطأ أثناء التحديث');
    }
  });
};