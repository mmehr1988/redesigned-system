const Workout = require('../models/workoutModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const helpers = require('../utils/helpers');

// [1] RENDER COVER PAGE
exports.getCoverPage = catchAsync(async (req, res, next) => {
  res.render('coverPage');
});

// [2] RENDER HOME PAGE WITH THE STATS OF THE LAST WORKOUT.
exports.getHomePage = catchAsync(async (req, res, next) => {
  const workouts = await Workout.find({}).sort('-day').limit(1);

  // Using Express handlebars
  // If workout - the page is rendered with last workout stats
  // If no workout - the page is rendered with "You currently do no have any workouts"
  if (workouts.length > 0) {
    res.render('homePage', {
      workout: {
        id: workouts[0].id,
        date: workouts[0].day,
        totalDuration: workouts[0].totalDuration,
        totalExercises: workouts[0].totalExercises,
        totalWeights: workouts[0].totalWeights,
        totalSets: workouts[0].totalSets,
        totalReps: workouts[0].totalReps,
      },
    });
  } else {
    res.render('homePage');
  }
});

// [3] CREATE ONE WORKOUT
exports.createOneWorkout = catchAsync(async (req, res, next) => {
  const workout = await Workout.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      workout,
    },
  });
});

// [4] RENDER CREATE WORKOUT EXERCISE PAGE
exports.getCreatePage = catchAsync(async (req, res, next) => {
  res.render('createPage');
});

// [5] ADD EXERCISE BY UPDATING THE NEWLY CREATED WORKOUT
exports.addExercise = catchAsync(async (req, res, next) => {
  const workoutCheck = await Workout.findById(req.params.id);

  if (!workoutCheck) {
    return next(new AppError('No workout found with that ID', 404));
  }

  const newExerciseBody = workoutCheck.exercises;
  newExerciseBody.push(req.body);

  const workout = await Workout.findByIdAndUpdate(
    req.params.id,
    { exercises: newExerciseBody },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      workout,
    },
  });
});

// [6] VIEW HISTORICAL WORKOUTS PAGE
exports.getHistoricalView = catchAsync(async (req, res, next) => {
  const workouts = await Workout.find({}).sort('-day');

  const workout = await workouts.map((item) => ({
    date: item.day,
    totalDuration: item.totalDuration,
    totalExercises: item.totalExercises,
    totalWeights: item.totalWeights,
    totalSets: item.totalSets,
    totalReps: item.totalReps,
    id: item.id,
  }));

  res.status(200).render('workouts', { workout });
});

// [7] VIEW HISTORICAL WORKOUT EXERCISES PAGE
exports.getHistoricalOne = catchAsync(async (req, res, next) => {
  const workout = await Workout.findById(req.params.id);

  if (!workout) {
    return next(new AppError('No workout found with that ID', 404));
  }

  const exercises = await workout.exercises;
  const date = await workout.day;

  const exercise = exercises.map((item) => ({
    type: item.type,
    name: item.name,
    duration: item.duration,
    weight: item.weight,
    reps: item.reps,
    sets: item.sets,
    distance: item.distance,
    _id: item._id,
  }));

  res.status(200).render('workoutUpdate', { exercise, date, id: req.params.id });
});

// [8] DELETE ONE WORKOUT
exports.deleteHistoricalOne = catchAsync(async (req, res, next) => {
  const workout = await Workout.findByIdAndDelete(req.params.id);

  if (!workout) {
    return next(new AppError('No workout found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// [9] DELETE ONE EXERCISE
exports.deleteHistoricalExercise = catchAsync(async (req, res, next) => {
  const exId = req.params.exId;
  const wktId = req.params.wktId;

  const workout = await Workout.findByIdAndUpdate(
    wktId,
    { $pull: { exercises: { _id: exId } } },
    {
      new: true,
    }
  );

  if (!workout) {
    return next(new AppError('No workout found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// [10] TO UPDATE WORKOUT WHEN USER IS IN HISTORICAL PAGE
exports.updateHistWorkout = catchAsync(async (req, res, next) => {
  const workout = await Workout.findByIdAndUpdate(
    req.params.id,
    { exercises: req.body },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      workout,
    },
  });
});

// [11] TO GET CURRENT WORKOUT DATA FOR WHEN USER CLICKS ON COMPLETE IN ADD EXERCISE
exports.getOneWorkout = catchAsync(async (req, res, next) => {
  const workout = await Workout.findById(req.params.id);

  // TO CONVERT UTC DATE FOR VERIFICATION ON THE FRONT END
  const workoutDate = helpers.format_date(workout.day);

  // A 404 error for when user queries with ID
  if (!workout) {
    return next(new AppError('No workout found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      workout,
      workoutDate,
    },
  });
});
