import dotenv from 'dotenv';
import http from 'http'; // لازم تعمل import للـ http
import { Server } from 'socket.io'; // لازم تعمل import للـ Server
import app from './src/app.js';
import connectDB from './src/config/db.js';
import registerTripHandlers from './src/socket/tripHandler.js'; // هنكريت الملف ده حالاً

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// 1. إنشاء الـ HTTP Server باستخدام app بتاع Express
const server = http.createServer(app);

// 2. إعداد الـ Socket.io بخصائص الـ Production
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// 3. إدارة الاتصالات (Socket Connections)
io.on('connection', (socket) => {
  console.log(`[Socket] New Connection: ${socket.id}`);

  // استدعاء الهاندلر المنفصل عشان الكود ميبقاش Spaghetti
  registerTripHandlers(io, socket);

  socket.on('disconnect', () => {
    console.log(`[Socket] User Disconnected: ${socket.id}`);
  });
});

// 4. تشغيل الـ Server (لاحظ إننا بنستخدم server.listen مش app.listen)
server.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});