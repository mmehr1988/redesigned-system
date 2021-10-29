const Workout = require('../models/workoutModel');
const catchAsync = require('../utils/catchAsync');

// [1] RENDER COVER PAGE
exports.getCoverPage = catchAsync(async (req, res, next) => {
  res.render('coverPage');
});

// [2] Rendering Home Page: The home page displays the stats for the last workout created.
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
