const view_btn = document.querySelectorAll('.hist-view-button');
const delete_btn = document.querySelectorAll('.hist-delete-button');
const delete_exercise_btn = document.querySelectorAll('.delete-exercise');

if (view_btn) {
  view_btn.forEach((element) =>
    element.addEventListener('click', async function (event) {
      const id = event.target.dataset.id;
      await API.getOneWorkoutid(id);
    })
  );
}

if (delete_btn) {
  delete_btn.forEach((element) =>
    element.addEventListener('click', async function (event) {
      const id = event.target.dataset.id;
      await API.deleteOneWorkout(id);
    })
  );
}

if (delete_exercise_btn) {
  delete_exercise_btn.forEach((element) =>
    element.addEventListener('click', async function (event) {
      const exId = event.target.dataset.id;
      const wktId = window.location.pathname.split('/').pop();
      await API.deleteOneExercise(exId, wktId);
    })
  );
}
