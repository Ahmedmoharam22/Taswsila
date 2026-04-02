import Trip from '../models/Trip.js';
import Booking from '../models/Booking.js'; 
// @desc    إضافة رحلة جديدة (خاص بالسائق)
// @route   POST /api/trips
export const createTrip = async (req, res) => {
  try {
    const { fromCity, toCity, departureTime, price, totalSeats } = req.body;

    const trip = new Trip({
      driver: req.user.id,
      fromCity,
      toCity,
      departureTime,
      price,
      totalSeats,
      availableSeats: totalSeats // في البداية كل الكراسي متاحة
    });

    await trip.save();
    res.status(201).json({ success: true, trip });
  } catch (err) {
    res.status(500).json({ message: 'فشل إنشاء الرحلة', error: err.message });
  }
};

// @desc    جلب كل الرحلات مع فلترة ذكية (للعملاء والزوار)
// @route   GET /api/trips
export const getAllTrips = async (req, res) => {
  try {
    const { from, to, date, minPrice, maxPrice } = req.query;
    
    // الفلتر الأساسي: الرحلات النشطة واللي فيها كراسي
    let query = { status: 'active', availableSeats: { $gt: 0 } };

    // فلتر مدينة التحرك
    if (from) query.fromCity = new RegExp(from, 'i');
    
    // فلتر مدينة الوصول
    if (to) query.toCity = new RegExp(to, 'i');

    // فلتر التاريخ (بيجيب رحلات اليوم ده)
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);
      query.departureTime = { $gte: start, $lt: end };
    }

    // فلتر السعر
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const trips = await Trip.find(query)
      .populate('driver', 'fullName phone avatar carDetails')
      .sort('departureTime'); // ترتيب بالأقرب وقتياً

    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: 'خطأ في جلب البيانات' });
  }
};

// @desc    داشبورد السائق (رحلاته والركاب اللي معاه)
// @route   GET /api/trips/driver/dashboard
export const getDriverDashboard = async (req, res) => {
  try {
    // 1. جلب رحلات السواق
    const trips = await Trip.find({ driver: req.user.id }).sort('-createdAt');
    
    // 2. دمج بيانات الحجوزات والركاب لكل رحلة
    const dashboardData = await Promise.all(trips.map(async (trip) => {
      const bookings = await Booking.find({ trip: trip._id })
        .populate('passenger', 'fullName phone avatar');
      return { ...trip._doc, bookings };
    }));

    res.json(dashboardData);
  } catch (error) {
    res.status(500).json({ message: 'خطأ في جلب بيانات الداشبورد' });
  }
};

// @desc    تحديث حالة الرحلة (إتمام أو إلغاء)
// @route   PATCH /api/trips/:id/status
export const updateTripStatus = async (req, res) => {
  try {
    const { status } = req.body; // 'active', 'completed', 'cancelled'
    
    const trip = await Trip.findOneAndUpdate(
      { _id: req.params.id, driver: req.user.id },
      { status },
      { new: true }
    );

    if (!trip) {
      return res.status(404).json({ message: 'الرحلة غير موجودة أو غير مصرح لك' });
    }

    res.json({ success: true, message: 'تم تحديث حالة الرحلة', trip });
  } catch (error) {
    res.status(500).json({ message: 'خطأ في تحديث الحالة' });
  }
};


export const searchCustomTrips = async (req, res) => {
  try {
    const { from, to, carType, ac, seatsNeeded } = req.query;

    let query = { status: 'active' };

    // فلترة ذكية: لو باعت مدينة واحدة أو الاتنين
    if (from) query.fromCity = { $regex: from, $options: 'i' };
    if (to) query.toCity = { $regex: to, $options: 'i' };

    // فلترة المواصفات
    if (carType) query.carType = carType;
    if (ac !== undefined) query.isAirConditioned = ac === 'true';
    
    // لازم يكون فيه كراسي تكفي الطلب
    if (seatsNeeded) query.availableSeats = { $gte: parseInt(seatsNeeded) };

    const trips = await Trip.find(query)
      .populate('driver', 'fullName avatar phone rating')
      .sort('departureTime');

    res.json({ success: true, count: trips.length, data: trips });
  } catch (error) {
    res.status(500).json({ message: 'خطأ في البحث المتقدم', error: error.message });
  }
};