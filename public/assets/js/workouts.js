const view_btn = document.querySelectorAll('.hist-view-button');
const delete_btn = document.querySelectorAll('.hist-delete-button');

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
