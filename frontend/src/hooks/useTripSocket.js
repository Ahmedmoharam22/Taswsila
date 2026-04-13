import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const useTripSocket = (tripId) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!tripId) return;

    const socket = io(SOCKET_URL, {
      transports: ['websocket'], // أسرع وأخف في الأداء
    });

    // الانضمام لغرفة الرحلة
    socket.emit('trip:join', tripId);

    // استقبال تحديث الموقع
    socket.on('location-updated', (newLocation) => {
      // سينيور موف: تحديث الـ React Query Cache يدوياً
      queryClient.setQueryData(['trip', tripId], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          currentLocation: newLocation, // بنحدث اللوكيشن جوه الداتا بتاعة الرحلة
        };
      });
    });

    return () => {
      socket.off('location-updated');
      socket.disconnect();
    };
  }, [tripId, queryClient]);
};