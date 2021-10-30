const Workout = require('../models/workoutModel');
const catchAsync = require('../utils/catchAsync');
const helpers = require('../utils/helpers');

// [1] RENDER DASHBOARD PAGE
exports.getDashboardPage = catchAsync(async (req, res, next) => {
  const workouts = await Workout.find({}).sort('-day');
  const workoutDates = await helpers.filter_data(workouts, 'date', 'day');
  res.render('dashboardPage', { workoutDates });
});

// [2] GET DASHBOARD DATA
exports.getDashboardData = catchAsync(async (req, res, next) => {
  const workouts = await Workout.find({}).sort('-day');

  res.status(200).json({
    status: 'success',
    data: {
      workouts,
    },
  });
});
