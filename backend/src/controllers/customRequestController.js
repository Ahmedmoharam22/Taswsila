import CustomRequest from '../models/CustomRequest.js';
import Trip from '../models/Trip.js';

// 1. العميل ينشئ طلب خاص
export const createCustomRequest = async (req, res) => {
  try {
    const newRequest = await CustomRequest.create({
      ...req.body,
      passenger: req.user.id
    });
    res.status(201).json({ success: true, data: newRequest });
  } catch (error) {
    res.status(400).json({ message: "فشل في إنشاء الطلب", error: error.message });
  }
};

// 2. السواق يشوف الطلبات المتاحة في محافظاته
export const getAvailableRequestsForDrivers = async (req, res) => {
  try {
    // 1. نجيب بيانات السواق (عشان نعرف محافظاته ونوع عربيته)
    const driver = await User.findById(req.user.id);
    
    // 2. فلترة الطلبات:
    // - تكون Pending (لسه محدش خدها)
    // - تكون في مدينة السواق (اختياري حسب الـ Business Logic)
    // - تكون مناسبة لنوع عربية السواق
    const query = {
      status: 'pending',
      // carType: driver.carDetails.type // لو عايز تفلتر بنوع العربية بدقة
    };

    const requests = await CustomRequest.find(query)
      .populate('passenger', 'fullName avatar rating')
      .sort('-createdAt');

    res.status(200).json({ success: true, data: requests });
  } catch (error) {
    res.status(500).json({ message: "خطأ في جلب طلبات العملاء" });
  }
};

// 3. السواق يوافق على طلب ويحوله لرحلة (Accept & Convert)
export const acceptRequest = async (req, res) => {
  try {
    const request = await CustomRequest.findById(req.params.id);
    
    if (!request || request.status !== 'pending') {
      return res.status(400).json({ message: "الطلب غير متاح أو تم قبوله بالفعل" });
    }

    // تحديث حالة الطلب
    request.status = 'accepted';
    request.acceptedBy = req.user.id;
    await request.save();

    // تحويل الطلب لـ Trip رسمية في جدول الرحلات
    const newTrip = await Trip.create({
      driver: req.user.id,
      fromCity: request.fromCity,
      toCity: request.toCity,
      departureTime: request.departureTime,
      availableSeats: request.seatsNeeded, // أو سعة عربية السواق كاملة
      totalSeats: request.seatsNeeded,
      price: request.priceOffered || 200, // سعر افتراضي أو تفاوضي
      carType: request.carType,
      isAirConditioned: request.isAirConditioned,
      status: 'active'
    });

    res.json({ success: true, message: "تم قبول الطلب وإنشاء الرحلة", trip: newTrip });
  } catch (error) {
    res.status(500).json({ message: "حدث خطأ أثناء قبول الطلب" });
  }
};

// جلب طلبات العميل الحالي فقط
export const getMyCustomRequests = async (req, res) => {
  try {
    // بنجيب الطلبات اللي صاحبها هو اليوزر اللي عامل Login
    const requests = await CustomRequest.find({ passenger: req.user.id })
      .populate('acceptedBy', 'fullName phone avatar') // لو حد قبل الطلب، بياناته تظهر
      .sort('-createdAt'); // الأحدث يظهر الأول

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "خطأ في جلب طلباتك الخاصة", 
      error: error.message 
    });
  }
};