/////////////////////////////////////////////////////////////////
// [1] VARIABLES
/////////////////////////////////////////////////////////////////
// [1] ADD EXERCISE Variables -----------------------------------
const form_inputs = document.querySelectorAll('input');
const workoutTypeSelect = document.querySelector('#exercise-type');
const cardioForm = document.querySelector('.exercise-cardio-container');
const resistanceForm = document.querySelector('.exercise-resistance-container');

// [2] CARDIO VARIABLES -----------------------------------------
const cardioNameInput = document.querySelector('#cardio-name');
const durationInput = document.querySelector('#cardio-duration');
const distanceInput = document.querySelector('#cardio-distance');

// [3] RESISTANCE VARIABLES -------------------------------------
const nameInput = document.querySelector('#resistance-name');
const weightInput = document.querySelector('#resistance-weight');
const setsInput = document.querySelector('#resistance-sets');
const repsInput = document.querySelector('#resistance-reps');
const resistanceDurationInput = document.querySelector('#resistance-duration');

// [4] BUTTON VARIABLES -----------------------------------------
const completeButton = document.querySelector('#btn-complete');
const addButton = document.querySelector('#btn-add-exercise');

// [5] TOAST VARIABLES ------------------------------------------
const myToast = document.getElementById('toast-add-exercise');
const myToastBody = document.getElementById('toast-add-exercise-body');

/////////////////////////////////////////////////////////////////
// [2] FUNCTIONS
/////////////////////////////////////////////////////////////////

/////////////// Function To Clear Inputs ///////////////
function handleWorkoutTypeChange(event) {
  workoutType = event.target.value;

  if (workoutType === 'cardio') {
    cardioForm.classList.remove('d-none');
    resistanceForm.classList.add('d-none');
  } else if (workoutType === 'resistance') {
    resistanceForm.classList.remove('d-none');
    cardioForm.classList.add('d-none');
  } else {
    cardioForm.classList.add('d-none');
    resistanceForm.classList.add('d-none');
  }

  validateInputs();
}

function validateInputs() {
  let isValid = true;

  if (workoutType === 'resistance') {
    if (nameInput.value.trim() === '') {
      isValid = false;
    }

    if (weightInput.value.trim() === '') {
      isValid = false;
    }

    if (setsInput.value.trim() === '') {
      isValid = false;
    }

    if (repsInput.value.trim() === '') {
      isValid = false;
    }

    if (resistanceDurationInput.value.trim() === '') {
      isValid = false;
    }
  } else if (workoutType === 'cardio') {
    if (cardioNameInput.value.trim() === '') {
      isValid = false;
    }

    if (durationInput.value.trim() === '') {
      isValid = false;
    }

    if (distanceInput.value.trim() === '') {
      isValid = false;
    }
  }

  if (isValid) {
    completeButton.removeAttribute('disabled');
    addButton.removeAttribute('disabled');
  } else {
    completeButton.setAttribute('disabled', true);
    addButton.setAttribute('disabled', true);
  }
}

async function handleButtons(data) {
  if (data) {
    completeButton.removeAttribute('disabled');
    addButton.removeAttribute('disabled');
  } else {
    completeButton.setAttribute('disabled', true);
    addButton.setAttribute('disabled', true);
  }
}

async function handleFormSubmit(event) {
  event.preventDefault();

  let workoutData = {};

  if (workoutType === 'cardio') {
    workoutData.type = 'Cardio';
    workoutData.name = cardioNameInput.value.trim();
    workoutData.distance = Number(distanceInput.value.trim());
    workoutData.duration = Number(durationInput.value.trim());
  } else if (workoutType === 'resistance') {
    workoutData.type = 'Resistance';
    workoutData.name = nameInput.value.trim();
    workoutData.weight = Number(weightInput.value.trim());
    workoutData.sets = Number(setsInput.value.trim());
    workoutData.reps = Number(repsInput.value.trim());
    workoutData.duration = Number(resistanceDurationInput.value.trim());
  }

  const create = await API.addExercise(
    workoutData,
    window.location.pathname.split('/').pop()
  );

  clearInputs();
  validateInputs();
  await handleToast(create.status);
}

function clearInputs() {
  cardioNameInput.value = '';
  nameInput.value = '';
  setsInput.value = '';
  distanceInput.value = '';
  durationInput.value = '';
  repsInput.value = '';
  resistanceDurationInput.value = '';
  weightInput.value = '';
}

if (workoutTypeSelect) {
  workoutTypeSelect.addEventListener('change', handleWorkoutTypeChange);
}

if (completeButton) {
  completeButton.addEventListener('click', async (event) => {
    event.preventDefault();
    await handleFormSubmit(event);

    // SETTIME FUNCTION TO SHOW THE LAST TOAST MESSAGE UPON USER CLICKING ON THE COMPLETE BUTTON
    setTimeout(async () => {
      const lastWorkout = await API.getLastWorkout();
      const lastWorkoutID = lastWorkout.data.workout[0].id;

      const currentWorkout = window.location.pathname.split('/').pop();

      // NAVIGATE TO HOME PAGE - IF WORKOUT IS FOR TODAY
      // NAVIGATE BACK TO UPDATE PAGE - IF USER IS ADDING EXERCISES FOR HISTORICAL WORKOUTS INCASE THEY NEED TO UPDATE
      if (lastWorkoutID === currentWorkout) {
        await API.goToHomePage();
      } else {
        await API.getOneWorkoutid(currentWorkout);
      }
    }, 1000);
  });
}

if (addButton) {
  addButton.addEventListener('click', handleFormSubmit);
}

document
  .querySelectorAll('input')
  .forEach((element) => element.addEventListener('input', validateInputs));

/////////////////////////////////////////////////////////////////////////
// TOAST ALERT ON SUCCESS & FAIL On Success & Fail
/////////////////////////////////////////////////////////////////////////

// TOAST OPTIONS - OPTIONS FOR HOW TOAST ACT IN THE UI
const myToastOptions = {
  animation: true,
  autohide: true,
  delay: 2000,
};

// TOAST SUCCESS = EXERCISE WAS SUCCESSFULLY ADDED
// TOAST FAIL = UNEXPECTED ISSUES.
async function handleToast(status) {
  if (status === 'success') {
    await toastSuccess();
  } else if (status === 'fail') {
    await toastFail();
  }
}

// IF CREATE STATUS = SUCCESS
async function toastSuccess() {
  myToast.classList.add('success');
  myToastBody.innerHTML = 'Workout Added Successfully!';
  const bsAlert = new bootstrap.Toast(myToast, myToastOptions);
  await bsAlert.show();
}

// IF CREATE STATUS = FAIL
async function toastFail() {
  myToast.classList.remove('success');
  myToastBody.innerHTML = 'Something Went Wrong!';
  const myToastAlert = new bootstrap.Toast(myToast, myToastOptions);
  await myToastAlert.show();

  // TO RESET TOAST CLASS TO INCLUDE "SUCCESS". SEE CSS STYLING
  setTimeout(() => {
    myToast.classList.add('success');
  }, 2000);
}
