const Workout = require('../models/workoutModel');
const catchAsync = require('../utils/catchAsync');

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
  const newdoc = await Workout.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      workout: newdoc,
    },
  });
});

// [4] RENDER CREATE WORKOUT EXERCISE PAGE
exports.getCreatePage = catchAsync(async (req, res, next) => {
  res.render('createPage');
});
