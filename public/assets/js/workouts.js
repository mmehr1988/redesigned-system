const view_btn = document.querySelectorAll('.hist-view-button');
const delete_btn = document.querySelectorAll('.hist-delete-button');
const delete_exercise_btn = document.querySelectorAll('.delete-exercise');
const add_btn = document.querySelectorAll('.hist-add-button');

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
