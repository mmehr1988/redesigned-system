const API = {
  // [1] WHEN NEW WORKOUT BUTTON IS CLICKED, FIRST CREATE THE WORKOUT
  async createWorkout(el = {}) {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(el),
    };
    const response = await fetch('/create-one-workout', options);
    const data = await response.json();

    return data;
  },
  // [2] THEN RENDER THE PAGE WITH THE ID IN THE URL
  async goToCreatePage(id) {
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    const response = await fetch('/create', options);

    if (response.ok) {
      document.location.replace(`/create/${id}`);
    } else {
      alert('Something went wrong');
    }
  },
  // [3] ADD EXERCISES TO THE NEWLY CREATED EMPTY WORKOUT
  async addExercise(data = {}, id) {
    const options = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    const response = await fetch(`/addexercise/${id}`, options);
    const created = await response.json();

    return created;
  },

  // [4] ONCE YOU CLICK ON THE COMPLTE
  async goToHomePage() {
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch('/home', options);

    if (response.ok) {
      document.location.replace('/home');
    } else {
      alert('Something went wrong');
    }
  },

  // [5] GET CHART DATA
  async getChartData() {
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch('/dashboard/workoutdata', options);
    const data = await response.json();

    return data;
  },
  // [6] WORKOUTS VIEW BUTTON
  async getOneWorkoutid(id) {
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    const response = await fetch(`/workouts/${id}`, options);

    if (response.ok) {
      document.location.replace(`/workouts/${id}`);
    } else {
      alert('Something went wrong');
    }
  },

  // [7] WORKOUTS DELETE BUTTON
  async deleteOneWorkout(id) {
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(`/workouts/${id}`, options);

    if (response.ok) {
      document.location.replace('/workouts');
    } else {
      alert('Something went wrong');
    }
  },
};
