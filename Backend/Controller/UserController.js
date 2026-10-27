const asyncHandler = require("../Middleware/asyncHandler");
const User = require("../models/UserSchema");
const Recipe = require("../models/RecipeSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
// desc    Create a new User
//  route   POST /api/user/register
// @access
module.exports.register = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already registered" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const savedUser = new User({
    email,
    password: hashedPassword,
  });
  await savedUser.save();
  const token = jwt.sign(
    { email: savedUser.email, id: savedUser._id },
    process.env.SECRET_KEY,
    {
      expiresIn: "3w",
    },
  );
  res.status(201).json({ message: "User registered successfully", token });
});
// desc    login  User
//  route   POST /api/user/login
// @access
module.exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User invaled email or password" });
  }
  const ispassword = await bcrypt.compare(password, user.password);
  if (!ispassword) {
    return res.status(400).json({ message: "User invaled email or password" });
  }
  const token = jwt.sign(
    { email: user.email, id: user._id },
    process.env.SECRET_KEY,
    {
      expiresIn: "3w",
    },
  );
  res.status(200).json({ message: "User Login successfully", token });
});
// desc    Add OR Delete  favourites
//  route   POST /api/user/favourites/:id
// @access
module.exports.addfavourites = asyncHandler(async (req, res) => {
  const recipeId = req.params.id;
  const userId = req.user.id;
  console.log("this is userId ", userId);

  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    res.status(404);
    throw new Error("Recipe not found");
  }
  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  const isFavourite = user.favourites.some((id) => id.toString() === recipeId);
  if (isFavourite) {
    user.favourites.pull(recipeId);
    await user.save();
    res.status(200).json({
      status: "success",
      message: "Removed from favourites successfully",
      favourites: user.favourites,
    });
  } else {
    user.favourites.push(recipeId);
    await user.save();
    res.status(200).json({
      status: "success",
      message: "Added to favourites successfully",
      favourites: user.favourites,
    });
  }
});
// desc    Get All favourites
//  route   POST /api/user/favourites
// @access
module.exports.getMyFavourites = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId).populate("favourites");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json({
    status: "success",
    results: user.favourites.length,
    model: user.favourites,
  });
});

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // إيميلك الذي سيقوم بالإرسال
      pass: process.env.EMAIL_PASS, // كلمة مرور التطبيق (App Password)
    },
  });

  const mailOptions = {
    from: "Your App Name <support@yourapp.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

// 1. طلب إعادة تعيين كلمة المرور (إرسال الرابط)
module.exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "Not Found This Email" });
  }

  // إنشاء توكن عشوائي
  const resetToken = crypto.randomBytes(32).toString("hex");

  // تشفير التوكن وحفظه في قاعدة البيانات مع وقت صلاحية (مثلاً 10 دقائق)
  user.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 دقائق
  await user.save({ validateBeforeSave: false });

  // رابط إعادة التعيين الذي سيذهب للرابط في الفرونت إند
  const resetURL = `http://localhost:3000/reset-password/${resetToken}`;

  const message = `لقد طلبت إعادة تعيين كلمة المرور. يرجى الضغط على الرابط التالي لتغيير كلمة المرور:\n\n${resetURL}\n\nإذا لم تطلب هذا، يرجى تجاهل الرسالة.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "إعادة تعيين كلمة المرور (صالح لمدة 10 دقائق)",
      message,
    });

    res.status(200).json({
      message: "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني",
    });
  } catch (error) {
    console.log("MAIL ERROR:", error);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return res.status(500).json({
      message: "حدث خطأ أثناء إرسال البريد الإلكتروني، حاول مرة أخرى",
    });
  }
});
// 2. إعادة تعيين كلمة المرور الفعليّة
module.exports.resetPassword = asyncHandler(async (req, res) => {
  // تشفير الـ token القادم من الرابط لمقارنته بما هو مخزن في قاعدة البيانات
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }, // التأكد أن الوقت لم ينتهِ (أقل من 10 دقائق)
  });

  if (!user) {
    return res
      .status(400)
      .json({ message: "الرابط غير صالح أو انتهت صلاحيته" });
  }

  // تشفير كلمة المرور الجديدة
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);

  // حذف الـ token وحقل الوقت بعد الاستخدام
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  res
    .status(200)
    .json({ message: "تم تغيير كلمة المرور بنجاح، يمكنك تسجيل الدخول الآن" });
});
