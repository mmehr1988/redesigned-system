const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema(
  {
    day: {
      type: Date,
      // For some reason MONGODB IS ADDING 4 hours to the original time.
      // If user creates a new workout at 9pm, it will register as the next day, which is wrong.
      // For now, the workaround is to dedict 4hrs from the incorrect time
      // default: () => new Date() - 4 * 3600 * 1000,
      default: Date.now(),
      unique: true,
    },
    exercises: [
      {
        type: {
          type: String,
        },
        slug: {
          type: String,
        },
        name: {
          type: String,
        },
        duration: {
          type: Number,
        },
        distance: {
          type: Number,
        },
        weight: {
          type: Number,
        },
        reps: {
          type: Number,
        },
        sets: {
          type: Number,
        },
      },
    ],
  },
  {
    // this is so tha the virtual property is output as a field in the request
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

////////////////////////////////////// Virtual Properties //////////////////////////////////////
// A virtual property is a property that is not stored in MongoDB. IMPORTANT you cannot query based on this property
workoutSchema.virtual('totalExercises').get(function () {
  return this.exercises.length;
});

workoutSchema.virtual('totalDuration').get(function () {
  const total = this.exercises
    .map((item) => item.duration)
    .reduce((prev, curr) => prev + curr, 0);

  return total;
});

workoutSchema.virtual('totalWeights').get(function () {
  const total = this.exercises
    .map((item) => item.weight)
    .filter((item) => item != undefined)
    .reduce((prev, curr) => prev + curr, 0);

  return total;
});

workoutSchema.virtual('totalSets').get(function () {
  const total = this.exercises
    .map((item) => item.sets)
    .filter((item) => item != undefined)
    .reduce((prev, curr) => prev + curr, 0);

  return total;
});

workoutSchema.virtual('totalReps').get(function () {
  const total = this.exercises
    .map((item) => item.reps)
    .filter((item) => item != undefined)
    .reduce((prev, curr) => prev + curr, 0);

  return total;
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
