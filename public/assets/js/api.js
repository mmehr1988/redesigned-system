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
};
