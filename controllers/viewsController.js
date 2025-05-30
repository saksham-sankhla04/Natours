const Tour = require('../models/tourModel');
// const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get Tour data from collection
  const tours = await Tour.find();

  // 2) Build template

  // 3) Render that template using tour data from 1)

  res.status(200).render('overview', {
    title: 'All tours',
    tours
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour (including reviews and guides)

  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  if (!tour) return next(new AppError('There is no tour with that name', 404));

  // 2) Build template

  // 3) Render that template using tour data from 1)

  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour
  });
});

exports.getSignUpForm = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "script-src 'self' https://cdnjs.cloudflare.com/ajax/libs/axios/1.9.0/axios.min.js 'unsafe-inline' 'unsafe-eval';"
    )
    .render('signUp', {
      title: 'Create Your Account'
    });
};

exports.getLoginForm = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "script-src 'self' https://cdnjs.cloudflare.com/ajax/libs/axios/1.9.0/axios.min.js 'unsafe-inline' 'unsafe-eval';"
    )
    .render('login', {
      title: 'Log into your account'
    });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your Account'
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1) Find all bookkings
  // const bookings = await Booking.find({ user: req.user.id }).populate('tour');
  const bookings = await Booking.find({ user: req.user.id });

  // 2) Find tours with the returned IDs

  const tourIds = bookings.map(el => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIds } });
  res.status(200).render('overview', {
    title: 'My Tours',
    tours
  });
});

// exports.updateUserData = catchAsync(async (req, res, next) => {
//   const updatedUser = await User.findByIdAndUpdate(
//     req.user.id,
//     {
//       name: req.body.name,
//       email: req.body.email
//     },
//     {
//       new: true,
//       runValidators: true
//     }
//   );
//   res.status(200).render('account', {
//     title: 'Your Account',
//     user: updatedUser
//   });
// });
