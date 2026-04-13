import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';

export const usePublicTrips = (filters = {}) => {
  return useQuery({
    queryKey: ['public-trips', filters],
    queryFn: async () => {
      const { data } = await api.get('/trips', { params: filters });
      return data; // { trips, pagination, success }
    },
    keepPreviousData: true, // عشان اليوزر ميحسش بليفل Loading وهو بيقلب الصفحات
  });
};