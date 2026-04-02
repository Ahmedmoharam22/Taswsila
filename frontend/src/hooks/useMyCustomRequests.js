import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';

export const useMyCustomRequests = () => {
  return useQuery({
    queryKey: ['my-custom-requests'],
    queryFn: async () => {
      const { data } = await api.get('/custom-requests/my-requests'); // تأكد من وجود الـ endpoint ده في الباك
      return data.data;
    }
  });
};