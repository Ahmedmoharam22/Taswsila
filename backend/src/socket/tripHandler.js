// هاندلر متخصص لإدارة أحداث الرحلات
import Trip from '../models/Trip.js';
export default (io, socket) => {
  
  const joinTrip = (tripId) => {
    socket.join(tripId);
    console.log(`[Socket] User ${socket.id} joined room: ${tripId}`);
  };

  const updateLocation = async (payload) => {
    const { tripId, lat, lng, speed, heading } = payload;

    // 1. Broadcast للتحديث فوراً (Low Latency)
    // بنستخدم socket.to عشان نبعت لكل اللي في الغرفة ما عدا اللي بعت (السواق)
    socket.to(tripId).emit('location-updated', { lat, lng, speed, heading });

    // 2. تحديث الـ Database في الخلفية (Background Task)
    try {
      await Trip.findByIdAndUpdate(tripId, {
        "currentLocation.coordinates": [lng, lat],
        "currentLocation.lastUpdated": new Date(),
        status: 'active'
      });
    } catch (err) {
      console.error("[Socket Error] Database update failed:", err);
    }
  };

  // تسجيل الأحداث
  socket.on("trip:join", joinTrip);
  socket.on("trip:update-location", updateLocation);
};