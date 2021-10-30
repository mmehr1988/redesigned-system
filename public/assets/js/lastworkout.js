/////////////////////////////////////////////////////////////////
// [1] VARIABLES
/////////////////////////////////////////////////////////////////

// [1.A] BTNS
const navigateNewWorkout = document.getElementById('btn-create-workout');
const navigateUpdateWorkout = document.getElementById('btn-goto-updateworkout');
const navigateAddExercise = document.getElementById('btn-goto-addexercise');
const navigateViewWorkout = document.getElementById('btn-goto-viewworkout');

// [1.B] TOAST
const myToast = document.getElementById('toast-last-workout');
const myToastBody = document.getElementById('toast-last-workout-body');

// [1.C] CHECKS
const lastWorkoutDate = document.getElementById('last-workout-date');
const today = new Date().toLocaleDateString('en-US');

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
  if (lastWorkoutDate === null || lastWorkoutDate.innerHTML !== today) {
    const create = await API.createWorkout();
    const id = await create.data.workout.id;
    await API.goToCreatePage(id);
  } else {
    // [2] ELSE, SHOW "TOAST" FOR DUPLICATE WORKOUT SUBMISSIONS AND HAVE THEM NAVIGATE TO EITHER
    // - VIEW WORKOUT DETAILS
    // - ADD EXERCISE
    // - UPDATE WORKOUT BY ADJUSTING EXERCISE DETAILS
    await toastFail();
  }
});

// [2.B] TOAST ALERT + CLICK EVENT OPTIONS
/////////////////////////////////////////////////////////////////

// ------- [2.B.1] TO CREATE TOAST
async function toastFail() {
  const myToastOptions = {
    animation: true,
  };

  myToastBody.innerHTML = 'Cannot add multiple workouts for the same day!';
  const myToastAlert = new bootstrap.Toast(myToast, myToastOptions);
  await myToastAlert.show();
}

// ------- [2.B.2] NAVIGATE TO: VIEW WORKOUT PAGE
navigateViewWorkout.addEventListener('click', async (event) => {
  const id = event.target.dataset.id;
  await API.getOneWorkoutid(id);
});

// ------- [2.B.3] NAVIGATE TO: ADD EXERCISE PAGE
navigateAddExercise.addEventListener('click', async (event) => {
  const id = event.target.dataset.id;
  await API.goToCreatePage(id);
});

// ------- [2.B.4] NAVIGATE TO: UPDATE WORKOUT PAGE - this is the same link as "View Workout Page"
navigateUpdateWorkout.addEventListener('click', async (event) => {
  const id = event.target.dataset.id;
  await API.getOneWorkoutid(id);
});
