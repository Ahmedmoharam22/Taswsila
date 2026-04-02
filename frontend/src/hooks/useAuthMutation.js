import { useMutation } from '@tanstack/react-query';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useLoginMutation = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials) => {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success('تم تسجيل الدخول بنجاح');
      login(data, data.token); // بنحدث الـ Context والـ LocalStorage
      // توجيه المستخدم حسب دوره (سائق ولا عميل)
      navigate(data.role === 'driver' ? '/driver-dashboard' : '/');
    },
    onError: (error) => {
      // إظهار الرسالة اللي جاية من الـ Error Middleware اللي عملناه في الباك
      // alert(error.response?.data?.message || 'فشل تسجيل الدخول');
      toast.error(error.response?.data?.message || 'فشل تسجيل الدخول');
    }
  });
};

export const useRegisterMutation = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (userData) => {
      const response = await api.post('/auth/register', userData);
      return response.data;
    },
    onSuccess: (data) => {
      login(data, data.token);
      navigate(data.role === 'driver' ? '/driver-dashboard' : '/');
    },
    onError: (error) => {
      alert(error.response?.data?.message || 'فشل إنشاء الحساب');
    }
  });
};