/////////////////////////////////////////////////////////////////
// [1] VARIABLES
/////////////////////////////////////////////////////////////////

// [1.A] BTNS
const navigateNewWorkout = document.getElementById('btn-create-workout');

/////////////////////////////////////////////////////////////////
// [2] FUNCTIONS
/////////////////////////////////////////////////////////////////

// [2.A] NEW WORKOUT CLICK EVENTS
/////////////////////////////////////////////////////////////////

// ------- Home page + "New Workout" button click event
navigateNewWorkout.addEventListener('click', async () => {
  // [1] CREATE WORKOUT AND NAVIGATE TO THE CREATE EXERCISE PAGE
  // - IF USER HAS NO WORKOUTS
  // - IF USER IS CREATING A NEW WORKOUT FOR A NEW DATE
  const create = await API.createWorkout();
  const id = await create.data.workout._id;
  await API.goToCreatePage(id);
});
