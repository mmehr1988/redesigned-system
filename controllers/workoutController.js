const Workout = require('../models/workoutModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// GET ALL REQUEST
exports.getAllWorkouts = catchAsync(async (req, res, next) => {
  const doc = await Workout.find({}).sort('-day');

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      doc,
    },
  });
});

// REQUEST: GET ONE
exports.getWorkout = catchAsync(async (req, res, next) => {
  const doc = await Workout.findById(req.params.id);

  // A 404 error for when user queries with ID
  if (!doc) {
    return next(new AppError('No workout found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      doc,
    },
  });
});

// REQUEST: POST ONE
exports.createWorkout = catchAsync(async (req, res, next) => {
  const newdoc = await Workout.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      workout: newdoc,
    },
  });
});

// PATCH REQUEST
exports.updateWorkout = catchAsync(async (req, res, next) => {
  const doc = await Workout.findByIdAndUpdate(
    req.params.id,
    { exercises: req.body },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      doc,
    },
  });
});

// DELETE REQUEST
exports.deleteWorkout = catchAsync(async (req, res, next) => {
  // no need for const as it's standard to return null to client when you delete
  const doc = await Workout.findByIdAndDelete(req.params.id);

  // A 404 error for when user queries with ID
  if (!doc) {
    return next(new AppError('No workout found with that ID', 404));
  }

  // Status 204 = no content
  res.status(204).json({
    status: 'success',
    // null is used to indicate the data has been deleted
    data: null,
  });
});
