/////////////////////////////////////////////////////////////////
// [1] VARIABLES
/////////////////////////////////////////////////////////////////
// ALL WORKOUTS - These variables are shown in the overview page
const view_btn = document.querySelectorAll('.hist-view-button');
const delete_btn = document.querySelectorAll('.hist-delete-button');

// ONE WORKOUT - Variables for when user enters one workout to view exercises
const delete_exercise_btn = document.querySelectorAll('.delete-exercise');
const add_btn = document.querySelectorAll('.hist-add-button');
const update_btn = document.querySelector('.hist-update-button');

/////////////////////////////////////////////////////////////////
// [2] EVENT LISTENERS
/////////////////////////////////////////////////////////////////

// [1] TO VIEW ONE WORKOUT
if (view_btn) {
  view_btn.forEach((element) =>
    element.addEventListener('click', async function (event) {
      const id = event.target.dataset.id;
      await API.getOneWorkoutid(id);
    })
  );
}

// [2] TO DELETE ONE WORKOUT
if (delete_btn) {
  delete_btn.forEach((element) =>
    element.addEventListener('click', async function (event) {
      const id = event.target.dataset.id;
      await API.deleteOneWorkout(id);
    })
  );
}

// [3] TO DELETE ONE EXERCISE ONCE USER ENTERS WORKOUT
if (delete_exercise_btn) {
  delete_exercise_btn.forEach((element) =>
    element.addEventListener('click', async function (event) {
      const exId = event.target.dataset.id;
      const wktId = window.location.pathname.split('/').pop();
      await API.deleteOneExercise(exId, wktId);
    })
  );
}

// [4] TO REDIRECT USER TO THE ADD EXERCISE PAGE
if (add_btn) {
  add_btn.forEach((element) =>
    element.addEventListener('click', async function (event) {
      const id = event.target.dataset.id;
      await API.goToCreatePage(id);
    })
  );
}

// [5] TO UPDATE THE WORKOUT FOR ANY CHANGE TO AN EXISTING EXERCISE
if (update_btn) {
  update_btn.addEventListener('click', async function (event) {
    event.preventDefault();
    const workout_forms = document.querySelectorAll('.hist-exercise-forms');
    const id = event.target.dataset.id;

    // An array of exercise objects for the forloop
    let workout = [];

    // First loop for the number of exercises in the workout
    for (let i = 0; i < workout_forms.length; i++) {
      let exercises = new Object();
      // Second loop for number data fields for each exercises
      for (let j = 1; j < workout_forms[i].length; j++) {
        const exercise_name = workout_forms[i][j].attributes[3].value;
        const exercise_value = workout_forms[i][j].value;

        // Had to build an if statement to recognize if the input field was a string or a number as the value returned was always a string and would break the workout model since type is specified to be a number
        if (exercise_name === 'type' || exercise_name === 'name') {
          exercises[exercise_name] = exercise_value;
        } else {
          exercises[exercise_name] = Number(exercise_value);
        }
      }
      // Once loop is done for each form, push the new Object into the workout array
      workout.push(exercises);
    }

    const updateWorkout = await API.updateWorkout(workout, id);

    document.location.href = '/workouts';
  });
}
