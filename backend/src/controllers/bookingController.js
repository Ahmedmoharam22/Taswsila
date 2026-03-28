import Booking from '../models/Booking.js';
import Trip from '../models/Trip.js';

export const createBooking = async (req, res) => {
  const { tripId, seatsBooked } = req.body;
  const passengerId = req.user.id; // جاي من الـ protect middleware

  try {
    // 1. التحديث الذري (Atomic Update): اخصم الكراسي فقط لو كانت كافية
    const trip = await Trip.findOneAndUpdate(
      { 
        _id: tripId, 
        availableSeats: { $gte: seatsBooked },
        status: 'active' 
      },
      { $inc: { availableSeats: -seatsBooked } },
      { new: true }
    );

    if (!trip) {
      return res.status(400).json({ message: 'عذراً، الرحلة اكتملت أو لم تعد متاحة' });
    }

    // 2. إنشاء الحجز
    const booking = await Booking.create({
      trip: tripId,
      passenger: passengerId,
      seatsBooked,
      totalPrice: trip.price * seatsBooked
    });

    res.status(201).json({
      success: true,
      message: 'تم الحجز بنجاح! السائق في انتظارك',
      booking
    });
  } catch (error) {
    res.status(500).json({ message: 'فشل عملية الحجز', error: error.message });
  }
};

// فيتشر الداشبورد للعميل: "رحلاتي"
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ passenger: req.user.id })
      .populate({
        path: 'trip',
        populate: { path: 'driver', select: 'fullName phone avatar' } // Join مع السواق كمان
      })
      .sort('-createdAt');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'خطأ في جلب حجوزاتك' });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, passenger: req.user.id });

    if (!booking) return res.status(404).json({ message: 'الحجز غير موجود' });
    if (booking.status === 'cancelled') return res.status(400).json({ message: 'الحجز ملغي بالفعل' });

    // 1. رجع الكراسي للرحلة
    await Trip.findByIdAndUpdate(booking.trip, { 
      $inc: { availableSeats: booking.seatsBooked } 
    });

    // 2. غير حالة الحجز
    booking.status = 'cancelled';
    await booking.save();

    res.json({ message: 'تم إلغاء حجزك بنجاح وأعيدت الكراسي للمنصة' });
  } catch (error) {
    res.status(500).json({ message: 'خطأ في إلغاء الحجز' });
  }
};